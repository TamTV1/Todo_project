using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TDP.Web.Base;
using TDP.Web.Models.Core;
using TDP.Web.Services.TaskServ;

namespace TDP.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskServ _taskServ;
        public TaskController(ITaskServ taskServ)
        {
            _taskServ = taskServ;
        }
        [HttpGet]
        [Route("taskLayoutList")]
        public IActionResult GetTaskLayoutList()
        {
            var data = new ResponseModel<List<DropdownItem>>(System.Net.HttpStatusCode.OK, "", CoreConstant.TaskLayoutList());
            return Ok(data);
        }

        [HttpGet]
        [Route("listByUser")]
        public async Task<IActionResult> GetTaskByUser(string employeeId)
        {
            var data = await _taskServ.GetItems(employeeId);
            return Ok(data);
        }

        [HttpGet]
        [Route("detail")]
        public async Task<IActionResult> GetTaskDetail(string taskId)
        {
            var data = await _taskServ.GetItemById(taskId);
            return Ok(data);
        }
    }
}
