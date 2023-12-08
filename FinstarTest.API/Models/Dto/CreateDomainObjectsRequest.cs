namespace FinstarTest.API.Models;

/// <summary>
/// Создаваемый объект
/// </summary>
public class CreateDomainObjectsRequest
{
    /// <summary>
    /// Код
    /// </summary>
    public int Code { get; set; }
    
    /// <summary>
    /// Значение
    /// </summary>
    public string Value { get; set; }
}