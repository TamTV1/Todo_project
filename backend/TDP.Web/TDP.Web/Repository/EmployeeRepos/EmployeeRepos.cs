using Microsoft.AspNetCore.Http;
using TDP.Web.Base;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Repository.Base;

namespace TDP.Web.Repository.DatabaseModel.Entites
{
    public class EmployeeRepos : BaseRepository<Employee>, IEmployeeRepos
    {
        public EmployeeRepos(DbFactory dbFactory, IHttpContextAccessor httpContext) : base(dbFactory, httpContext)
        {
        }
    }
}
