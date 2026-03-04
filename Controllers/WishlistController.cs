using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SabinaFlowerAPI.Data;
using SabinaFlowerAPI.DTOs;
using SabinaFlowerAPI.Models;

namespace SabinaFlowerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WishlistController : ControllerBase
{
    private readonly AppDbContext _db;

    public WishlistController(AppDbContext db) => _db = db;

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<List<WishlistItemDto>>> Get()
    {
        var items = await _db.WishlistItems
            .Where(w => w.UserId == UserId)
            .Include(w => w.Product)
            .Select(w => new WishlistItemDto
            {
                ProductId = w.ProductId,
                Product = w.Product == null ? null : new ProductDto
                {
                    Id = w.Product.Id,
                    Name = w.Product.Name,
                    Price = w.Product.Price,
                    ImageUrl = w.Product.ImageUrl
                }
            }).ToListAsync();

        return Ok(items);
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] int productId)
    {
        if (await _db.WishlistItems.AnyAsync(w => w.UserId == UserId && w.ProductId == productId))
            return BadRequest(new { message = "Already in wishlist" });

        _db.WishlistItems.Add(new WishlistItem { UserId = UserId, ProductId = productId });
        await _db.SaveChangesAsync();
        return Ok(new { message = "Added to wishlist" });
    }

    [HttpDelete("remove/{productId}")]
    public async Task<IActionResult> Remove(int productId)
    {
        var item = await _db.WishlistItems
            .FirstOrDefaultAsync(w => w.UserId == UserId && w.ProductId == productId);
        if (item == null) return NotFound();

        _db.WishlistItems.Remove(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Removed from wishlist" });
    }
}

