using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TDP.Web.Models.Pagination;

namespace TDP.Web.Repository.Base
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> GetItem(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null);
        Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>> filter = null
            , Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null);
        Task<PaginationResponseModel<T>> GetListPaginationCustomSortAsync(
            int pageIndex
            , int pageSize
            , Expression<Func<T, bool>> filter = null
            , IEnumerable<Func<IOrderedQueryable<T>, IOrderedQueryable<T>>> orderBy = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null
        );

        Task SaveChangesAsync();
        Task<bool> AnyAsync(
            Expression<Func<T, bool>> filter,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null);

        Task InsertAsBaseEntityAsync(T entity);
        void UpdateAsBaseEntity(T entity);
    }
}
