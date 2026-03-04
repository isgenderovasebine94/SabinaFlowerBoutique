using Microsoft.EntityFrameworkCore;
using SabinaFlowerAPI.Models;

namespace SabinaFlowerAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<User> Users => Set<User>();
    public DbSet<BasketItem> BasketItems => Set<BasketItem>();
    public DbSet<WishlistItem> WishlistItems => Set<WishlistItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
       
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Bouquets", ImageUrl = "/images/Buketlər.jpg", Slug = "bouquets" },
            new Category { Id = 2, Name = "Compositions", ImageUrl = "/images/Kompozisiyalar.jpg", Slug = "compositions" },
            new Category { Id = 3, Name = "Bridal Bouquets", ImageUrl = "/images/category-bridal.jpg", Slug = "bridal" }
        );

        
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Pink Roses Bouquet", Description = "Delicate bouquet made with fresh pink roses", Price = 70, ImageUrl = "/images/Çəhrayı romantik güllər.jpg", CategoryId = 1 },
            new Product { Id = 2, Name = "Peony Arrangement", Description = "Elegant arrangement of white and blush peonies", Price = 85, ImageUrl = "/images/Ağ və çəhrayı pionlar.jpg", CategoryId = 2 },
            new Product { Id = 3, Name = "Classic Bridal Bouquet", Description = "Classic bridal bouquet with white roses and eucalyptus", Price = 100, ImageUrl = "/images/Gəlin buketi.jpg", CategoryId = 3 },
            new Product { Id = 4, Name = "Colorful Daisy Bouquet", Description = "Crafted in a lively palette, this daisy bouquet radiates positivity and refined charm.", Price = 60, ImageUrl = "/images/rengberengpapatyalar.jpg", CategoryId = 1 },
            new Product { Id = 5, Name = "Lavender Flowers", Description = "Delicate lavender composition in pastel colors", Price = 55, ImageUrl = "/images/Lavanda və zərif vaza kompozisiyası.jpg", CategoryId = 2 },
            new Product { Id = 6, Name = "Sunflower Bouquet", Description = "Bright sunflower and daisy bouquet", Price = 60, ImageUrl = "/images/Günəbaxan.jpg", CategoryId = 1 },
            new Product { Id = 7, Name = "Orchid Arrangement", Description = "Luxury orchid arrangement in glass vase", Price = 95, ImageUrl = "/images/orkideler.jpg", CategoryId = 2 },
            new Product { Id = 8, Name = "Elegant Daisy Bouquet", Description = "A refined bouquet of pure white daisies embodying timeless elegance", Price = 60, ImageUrl = "/images/papatyalarbuketi.jpg", CategoryId = 1 },
            new Product { Id = 9, Name = "Bridal Peony Bouquet", Description = "Exquisite bridal bouquet with white peonies", Price = 120, ImageUrl = "/images/gelinpionbuketi.jpg", CategoryId = 3 },
            new Product { Id = 10, Name = "Mixed Flower Bouquet", Description = "Special bouquet made with colorful mixed flowers", Price = 65, ImageUrl = "/images/Lalələr.jpg", CategoryId = 1 }
        );

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                FullName = "Sebine Isgenderova",
                Email = "isgandarova@sabinaflower.az",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("ISabina777!"),
                Role = "Admin"
            }
        );
    }
}

