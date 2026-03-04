using System.ComponentModel.DataAnnotations;

namespace SabinaFlowerAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Role { get; set; } = "User";

        public ICollection<BasketItem> BasketItems { get; set; } = new List<BasketItem>();
        public ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();

        [MaxLength(300)]
        public string? Address { get; set; } 
        [MaxLength(20)]
        public string? PhoneNumber { get; set; } 
    }
}
