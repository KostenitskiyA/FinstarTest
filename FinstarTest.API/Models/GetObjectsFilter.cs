namespace FinstarTest.API.Models;

/// <summary>
/// Фильтр запроса на получение объектов
/// </summary>
public class GetObjectsFilter
{
    /// <summary>
    /// Фильтр по коду
    /// </summary>
    public int? Code { get; set; }
    
    /// <summary>
    /// Фильтр по значениею
    /// </summary>
    public string Value { get; set; }
}