using FinstarTest.API.Models;

namespace FinstarTest.API.Interfaces;

/// <summary>
/// Сервис взаимодествия с объектами
/// </summary>
public interface IObjectService
{
    /// <summary>
    /// Получение объектов
    /// </summary>
    /// <returns>Коллекция объектов</returns>
    public Task<(IEnumerable<DomainObject> objects, int total)> GetDomainObjectsAsync(GetObjectsFilter filter, int pageNumber);
    
    /// <summary>
    /// Добавление объектов
    /// </summary>
    /// <param name="objects">Добавляемые объекты</param>
    /// <returns>Результат выполнения</returns>
    public Task CreateDomainObjectsAsync(IEnumerable<CreateDomainObjectsRequest> objects);
}