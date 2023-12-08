using FinstarTest.API.Helpers;
using FinstarTest.API.Interfaces;
using FinstarTest.API.Models;
using FinstarTest.API.Models.Dto;
using Microsoft.AspNetCore.Mvc;

namespace FinstarTest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ObjectsController : ControllerBase
{
    private readonly ILogger<ObjectsController> _logger;
    private readonly IObjectService _objectService;

    public ObjectsController(ILogger<ObjectsController> logger, IObjectService objectService)
    {
        _logger = logger;
        _objectService = objectService;
    }

    /// <summary>
    /// Получение объектов
    /// </summary>
    /// <param name="pageNumber">Номер страницы</param>
    /// <returns>Коллекция объектов</returns>
    [HttpPost]
    [Route("get-objects/{pageNumber}")]
    public async Task<IActionResult> GetObjects([FromRoute] int pageNumber, [FromBody] GetObjectsFilter filter)
    {
        try
        {
            var result = await _objectService.GetDomainObjectsAsync(filter, pageNumber);

            return Ok(new GetDomainObjectsResponce(
                result.objects, 
                result.total, 
                PaginationHelper.CalculatePageCount(10, result.total)));
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }

    /// <summary>
    /// Создание объектов
    /// </summary>
    /// <param name="objects">Коллекция добаляемых объектов</param>
    /// <returns>Результат выполнения</returns>
    [HttpPost]
    [Route("create-objects")]
    public async Task<IActionResult> CreateObjects([FromBody] IDictionary<int, string> objects)
    {
        try
        {
            var objectsDto = objects
                .Select(q => 
                    new CreateDomainObjectsRequest() { Code = q.Key, Value = q.Value })
                .OrderBy(o => o.Code)
                .ToList();
            
            await _objectService.CreateDomainObjectsAsync(objectsDto);

            return Ok();
        }
        catch (Exception exception)
        {
            return BadRequest(exception.Message);
        }
    }
}