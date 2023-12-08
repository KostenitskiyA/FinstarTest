using Microsoft.EntityFrameworkCore;

namespace FinstarTest.API.Models;

public class ApplicationContext : DbContext
{
    public DbSet<DomainObject> DomainObjects { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options)
    {
        base.Database.EnsureCreated();
    }
}