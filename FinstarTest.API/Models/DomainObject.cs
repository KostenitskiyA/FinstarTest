namespace FinstarTest.API.Models;

/// <summary>
/// Сущность объекта
/// </summary>
public class DomainObject
{
    /// <summary>
    /// Порядковый номер (идентификатор)
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Код
    /// </summary>
    public int Code { get; set; }
    
    /// <summary>
    /// Значение
    /// </summary>
    public string Value { get; set; }
}