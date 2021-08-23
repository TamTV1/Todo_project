using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TDP.Web.Models.Pagination;
using TDP.Web.Services.EmpolyeeServs;

namespace TDP.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
    }
}
