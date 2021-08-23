using System.Threading.Tasks;

namespace TDP.Web.Repository.Base
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
    }
}
