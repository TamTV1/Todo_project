using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Models.Core;
using TDP.Web.Models.EmployeeModel;
using TDP.Web.Models.Pagination;
using TDP.Web.Services.EmpolyeeServs;

namespace TDP.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly IEmpolyeeServs _empolyeeServs;
        public EmployeeController(IEmpolyeeServs empolyeeServs)
        {
            _empolyeeServs = empolyeeServs;
        }

        [HttpGet]
        [Route("filterList")]
        public async Task<IActionResult> GetByFilter(int pageIndex, int pageSize, string searchKey)
        {
            var paginationModel = new PaginationRequestModel(pageIndex, pageSize, searchKey);
            var data = await _empolyeeServs.GetItems(paginationModel);
            return Ok(data);
        }

        [HttpGet]
        [Route("detail")]
        public async Task<IActionResult> GetById(string id)
        {
            var res = new ResponseModel<Employee>();
            if (string.IsNullOrWhiteSpace(id))
            {
                res.Code = HttpStatusCode.BadRequest;
                res.Message = "Invalid Fields";
                res.Data = null;
                return Ok(res);
            }
            res = await _empolyeeServs.GetItemById(id);
            return Ok(res);
        }

        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> Save([FromBody]EmployeeModifyModel request)
        {
            var res = new ResponseModel<Employee>();
            if (!ModelState.IsValid)
            {
                res.Code = HttpStatusCode.BadRequest;
                res.Message = "Invalid Fields";
                res.Data = null;
                return Ok(res);
            }

            if (string.IsNullOrWhiteSpace(request.Id))
                res = await _empolyeeServs.CreateNewItem(request);
            else
                res = await _empolyeeServs.UpdateItem(request);

            return Ok(res);
        }
    }
}
