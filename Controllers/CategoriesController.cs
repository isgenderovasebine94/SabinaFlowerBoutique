using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SabinaFlowerAPI.Data;
using SabinaFlowerAPI.DTOs;

namespace SabinaFlowerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CategoriesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<CategoryDto>>> GetAll()
    {
        var cats = await _db.Categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            ImageUrl = c.ImageUrl,
            Slug = c.Slug
        }).ToListAsync();

        return Ok(cats);
    }
}