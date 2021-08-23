using Microsoft.EntityFrameworkCore;
using System;
using TDP.Web.DatabaseModel.Entites;

namespace TDP.Web.Base
{
    public class DbFactory : IDisposable
    {
        private bool _disposed;
        private Func<ToDoDbContext> _instanceFunc;
        private DbContext _dbContext;
        public DbContext DbContext => _dbContext ?? (_dbContext = _instanceFunc.Invoke());
        public DbFactory(Func<ToDoDbContext> dbContextFactory)
        {
            _instanceFunc = dbContextFactory;
        }

        public void Dispose()
        {
            if (!_disposed && _dbContext != null)
            {
                _disposed = true;
                _dbContext.Dispose();
            }
        }
    }
}
