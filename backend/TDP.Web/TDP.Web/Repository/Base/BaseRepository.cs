using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TDP.Web.Base;
using TDP.Web.Models.Pagination;

namespace TDP.Web.Repository.Base
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly DbFactory _dbFactory;
        private DbSet<T> _dbSet;
        private readonly IHttpContextAccessor _httpContext;

        public BaseRepository(DbFactory dbFactory, IHttpContextAccessor httpContext)
        {
            _dbFactory = dbFactory ?? throw new ArgumentNullException(nameof(dbFactory));
            _dbSet = _dbFactory.DbContext.Set<T>();
            _httpContext = httpContext;
        }

        public async Task<PaginationResponseModel<T>> GetListPaginationCustomSortAsync(
            int pageIndex
            , int pageSize
            , Expression<Func<T, bool>> filter = null
            , IEnumerable<Func<IOrderedQueryable<T>, IOrderedQueryable<T>>> orderFuncList = null
            , Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null)
        {
            IEnumerable<T> result;
            var query = _dbSet.AsNoTracking();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties != null)
            {
                query = includeProperties(query);
            }

            var totalItems = query.Count();

            if (orderFuncList != null && orderFuncList.Any())
            {
                IOrderedQueryable<T> orderQueryable = query.OrderBy(o => true);
                foreach (var orderFunc in orderFuncList)
                {
                    orderQueryable = orderFunc(orderQueryable);
                }
                result = await orderQueryable.Pagination(pageIndex, pageSize).ToListAsync();
            }
            else
            {
                result = await query.Pagination(pageIndex, pageSize).ToListAsync();
            }
            return new PaginationResponseModel<T>(totalItems, result);
        }

        public async Task SaveChangesAsync()
        {
            await _dbFactory.DbContext.SaveChangesAsync();
        }

        public async Task<bool> AnyAsync(
            Expression<Func<T, bool>> filter,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> includeProperties = null)
        {
            var query = _dbSet.AsNoTracking();

            if (includeProperties != null)
            {
                query = includeProperties(query);
            }

            if (filter != null)
            {
                return await query.AnyAsync(filter);
            }

            return await query.AnyAsync();
        }
    }
}
