using System.Threading.Tasks;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Models.Core;
using TDP.Web.Models.EmployeeModel;
using TDP.Web.Models.Pagination;

namespace TDP.Web.Services.EmpolyeeServs
{
    public interface IEmpolyeeServs
    {
        Task<ResponseModel<Employee>> GetItemById(string id);
        Task<ResponseModel<PaginationResponseModel<Employee>>> GetItems(PaginationRequestModel request);
        Task<ResponseModel<Employee>> CreateNewItem(EmployeeModifyModel request);
        Task<ResponseModel<Employee>> UpdateItem(EmployeeModifyModel request);
    }
}
