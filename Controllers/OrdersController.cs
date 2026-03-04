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
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _db;

    public OrdersController(AppDbContext db) => _db = db;

    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost]
    public async Task<ActionResult<OrderDto>> Create(CreateOrderDto dto)
    {
        

        var order = new Order
        {
            UserId = UserId,
            OrderDate = DateTime.UtcNow,
            FullName = dto.FullName,
            Email = dto.Email,
            Address = dto.Address,
            PhoneNumber = dto.PhoneNumber
        };
        decimal total = 0;

        foreach (var item in dto.Items)
        {
            var product = await _db.Products.FindAsync(item.ProductId);
            if (product == null) return BadRequest(new { message = $"Product {item.ProductId} not found" });

            order.OrderItems.Add(new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                Price = product.Price
            });
            total += product.Price * item.Quantity;
        }

        order.TotalPrice = total;
        _db.Orders.Add(order);

       
        var basketItems = await _db.BasketItems.Where(b => b.UserId == UserId).ToListAsync();
        _db.BasketItems.RemoveRange(basketItems);

        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = order.Id }, MapOrder(order));
    }

   
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetById(int id)
    {
        var order = await _db.Orders
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
            .Include(o => o.User)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == UserId);

        if (order == null) return NotFound();

        return Ok(MapOrder(order));
    }

    
    [HttpGet("my")]
    public async Task<ActionResult<List<OrderDto>>> MyOrders()
    {
        var orders = await _db.Orders
            .Where(o => o.UserId == UserId)
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
            .Include(o => o.User)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders.Select(MapOrder));
    }

  
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<OrderDto>>> AdminOrders()
    {
        var orders = await _db.Orders
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
            .Include(o => o.User)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders.Select(MapOrder));
    }

    [HttpGet("admin/flower-orders")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetFlowerOrders()
    {
        
        var ordersData = await _db.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .Include(o => o.User)
            .OrderByDescending(o => o.Id)
            .ToListAsync();

        var orders = ordersData.Select(o => new {
            o.Id,
            customerName = o.User != null ? o.User.FullName : "",
            email = o.User != null ? o.User.Email : "",
            address = o.User != null ? o.User.Address : "",
            phoneNumber = o.User != null ? o.User.PhoneNumber : "",
            productsOrdered = o.OrderItems.Select(oi => new {
                productName = oi.Product != null ? oi.Product.Name : "",
                oi.Quantity,
                oi.Price
            }).ToList(),
            totalAmount = o.OrderItems.Sum(oi => oi.Quantity * oi.Price)
        }).ToList();

        return Ok(orders);
    }

    private static OrderDto MapOrder(Order o) => new()
    {
        Id = o.Id,
        UserId = o.UserId,
        FullName = o.FullName,           
        Email = o.Email,
        Address = o.Address,
        PhoneNumber = o.PhoneNumber,
        TotalPrice = o.TotalPrice,
        OrderDate = o.OrderDate,
        Items = o.OrderItems.Select(oi => new OrderItemDto
        {
            ProductId = oi.ProductId,
            ProductName = oi.Product?.Name ?? "",
            Quantity = oi.Quantity,
            Price = oi.Price
        }).ToList()
    };
}