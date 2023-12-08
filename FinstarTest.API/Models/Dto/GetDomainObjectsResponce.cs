namespace FinstarTest.API.Models.Dto;

/// <summary>
/// Ответ на запрос получения коллекции объектов
/// </summary>
/// <param name="Objects">Коллекция объектов</param>
/// <param name="Total">Количество объектов в БД</param>
/// <param name="PageCount">Количество страниц таблицы</param>
public sealed record GetDomainObjectsResponce(
    IEnumerable<DomainObject> Objects, 
    int Total,
    int PageCount);