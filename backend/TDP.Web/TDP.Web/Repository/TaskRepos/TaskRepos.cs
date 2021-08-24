using Microsoft.AspNetCore.Http;
using TDP.Web.Base;
using TDP.Web.Repository.Base;

namespace TDP.Web.Repository.TaskRepos
{
    public class TaskRepos : BaseRepository<Web.DatabaseModel.Entites.Task>, ITaskRepos
    {
        public TaskRepos(DbFactory dbFactory, IHttpContextAccessor httpContext) : base(dbFactory, httpContext)
        {
        }
    }
}
