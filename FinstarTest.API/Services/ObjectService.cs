using FinstarTest.API.Interfaces;
using FinstarTest.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FinstarTest.API.Services;

/// <inheritdoc />
public class ObjectService : IObjectService
{
    private readonly ApplicationContext _context;

    public ObjectService(ApplicationContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<(IEnumerable<DomainObject> objects, int total)> GetDomainObjectsAsync(GetObjectsFilter filter, int pageNumber)
    {
        var objects = _context.DomainObjects.AsNoTracking();

        if (filter.Code != null)
            objects = objects.Where(o => o.Code == filter.Code);
        
        if (!String.IsNullOrEmpty(filter.Value))
            objects = objects.Where(o => o.Value.ToUpper().Contains(filter.Value.ToUpper()));
        
        var total = objects.Count();

        var result = await objects
            .Skip(10 * (pageNumber - 1 >= 0 ? pageNumber - 1 : 0))
            .Take(10)
            .ToListAsync();

        return (result, total);
    }

    /// <inheritdoc />
    public async Task CreateDomainObjectsAsync(IEnumerable<CreateDomainObjectsRequest> objects)
    {
        var obj = objects.Select(o => new DomainObject()
            { Code = o.Code, Value = o.Value }).ToList();

        await _context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE \"DomainObjects\" RESTART IDENTITY");

        await _context.DomainObjects.AddRangeAsync(obj);

        await _context.SaveChangesAsync();
    }
}