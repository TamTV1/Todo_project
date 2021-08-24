using System.Collections.Generic;
using System.Threading.Tasks;
using TDP.Web.Models.Core;

namespace TDP.Web.Services.TaskServ
{
    public interface ITaskServ
    {
        Task<ResponseModel<Web.DatabaseModel.Entites.Task>> GetItemById(string id);
        Task<ResponseModel<List<Web.DatabaseModel.Entites.Task>>> GetItems(string employeeId);
    }
}
