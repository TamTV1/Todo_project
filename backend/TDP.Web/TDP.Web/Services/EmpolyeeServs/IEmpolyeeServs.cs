using System.Threading.Tasks;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Models.Core;
using TDP.Web.Models.Pagination;

namespace TDP.Web.Services.EmpolyeeServs
{
    public interface IEmpolyeeServs
    {
        Task<ResponseModel<PaginationResponseModel<Employee>>> GetItems(PaginationRequestModel request);
    }
}
