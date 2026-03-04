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
public class BasketController : ControllerBase
{
    private readonly AppDbContext _db;

    public BasketController(AppDbContext db) => _db = db;

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<List<BasketItemDto>>> Get()
    {
        var items = await _db.BasketItems
            .Where(b => b.UserId == UserId)
            .Include(b => b.Product)
            .Select(b => new BasketItemDto
            {
                ProductId = b.ProductId,
                Quantity = b.Quantity,
                Product = b.Product == null ? null : new ProductDto
                {
                    Id = b.Product.Id,
                    Name = b.Product.Name,
                    Price = b.Product.Price,
                    ImageUrl = b.Product.ImageUrl
                }
            }).ToListAsync();

        return Ok(items);
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add(AddToBasketDto dto)
    {
        var existing = await _db.BasketItems
            .FirstOrDefaultAsync(b => b.UserId == UserId && b.ProductId == dto.ProductId);

        if (existing != null)
        {
            existing.Quantity += dto.Quantity;
        }
        else
        {
            _db.BasketItems.Add(new BasketItem
            {
                UserId = UserId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            });
        }

        await _db.SaveChangesAsync();
        return Ok(new { message = "Added to basket" });
    }

    [HttpDelete("remove/{productId}")]
    public async Task<IActionResult> Remove(int productId)
    {
        var item = await _db.BasketItems
            .FirstOrDefaultAsync(b => b.UserId == UserId && b.ProductId == productId);
        if (item == null) return NotFound();

        _db.BasketItems.Remove(item);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Removed from basket" });
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> Clear()
    {
        var items = await _db.BasketItems.Where(b => b.UserId == UserId).ToListAsync();
        _db.BasketItems.RemoveRange(items);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Basket cleared" });
    }
}
