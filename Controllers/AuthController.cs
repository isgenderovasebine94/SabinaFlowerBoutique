using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SabinaFlowerAPI.Data;
using SabinaFlowerAPI.DTOs;
using SabinaFlowerAPI.Models;
using SabinaFlowerAPI.Services;

namespace SabinaFlowerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IAuthService _auth;

    public AuthController(AppDbContext db, IAuthService auth)
    {
        _db = db;
        _auth = auth;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest(new { message = "Email already exists" });

        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "User",
            Address = dto.Address,
            PhoneNumber = dto.PhoneNumber
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok(new AuthResponseDto
        {
            Token = _auth.GenerateToken(user),
            User = new UserDto { Id = user.Id, 
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Address = user.Address,
            PhoneNumber = user.PhoneNumber

            }
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        return Ok(new AuthResponseDto
        {
            Token = _auth.GenerateToken(user),
            User = new UserDto { Id = user.Id, 
            FullName = user.FullName, 
            Email = user.Email, 
            Role = user.Role,
            Address = user.Address,
            PhoneNumber = user.PhoneNumber
        }
        });
    }
}

