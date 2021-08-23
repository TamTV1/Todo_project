using System.Threading.Tasks;
using TDP.Web.Base;

namespace TDP.Web.Repository.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        private DbFactory _dbFactory;
        public UnitOfWork(DbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }
        public Task CommitAsync()
        {
            return _dbFactory.DbContext.SaveChangesAsync();
        }
    }
}
