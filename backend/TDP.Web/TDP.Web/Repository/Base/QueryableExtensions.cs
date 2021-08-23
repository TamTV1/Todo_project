using System.Linq;

namespace TDP.Web.Repository.Base
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> Pagination<T>(
            this IQueryable<T> source,
            int pageIndex, int pageSize)
        {
            return source
                .Skip((pageIndex) * pageSize)
                .Take(pageSize);
        }
    }
}
