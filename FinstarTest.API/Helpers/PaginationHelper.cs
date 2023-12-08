namespace FinstarTest.API.Helpers;

internal static class PaginationHelper
{
    /// <summary>
    /// Вычисляет количество страниц таблицы
    /// </summary>
    /// <param name="limit">Лимит объектов на странице</param>
    /// <param name="totalCount">Количество объектов</param>
    /// <returns>Возвращает количество страниц</returns>
    public static int CalculatePageCount(int limit, int totalCount)
    {
        if (limit < 1) limit = 1;
        return totalCount / limit + (totalCount % limit > 0 ? 1 : 0);
    }
}