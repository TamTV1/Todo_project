using AutoMapper;
using LinqKit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Threading.Tasks;
using TDP.Web.Models.Core;
using TDP.Web.Repository.Base;
using TDP.Web.Repository.TaskRepos;

namespace TDP.Web.Services.TaskServ
{
    public class TaskServ : ITaskServ
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITaskRepos _taskRepos;
        private readonly IMapper _mapper;
        private readonly ILogger<TaskServ> _logger;
        public TaskServ(
            IUnitOfWork unitOfWork,
            ITaskRepos taskRepos,
            IMapper mapper,
            ILogger<TaskServ> logger
            )
        {
            _unitOfWork = unitOfWork;
            _taskRepos = taskRepos;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ResponseModel<Web.DatabaseModel.Entites.Task>> GetItemById(string id)
        {
            var res = new ResponseModel<Web.DatabaseModel.Entites.Task>(HttpStatusCode.OK, "", null);

            try
            {
                var item = await _taskRepos.GetItem(
                    x => x.Id.Equals(id),
                    null);

                //var itemData = _mapper.Map<Employee>(item);
                res.Data = item;
            }
            catch (Exception ex)
            {
                res = new ResponseModel<Web.DatabaseModel.Entites.Task>(HttpStatusCode.InternalServerError, ex.Message, null);
                _logger.LogError(ex, $"{nameof(EmpolyeeServ)} - {nameof(TaskServ.GetItemById)}: {ex.Message}");
            }

            return res;
        }

        public async Task<ResponseModel<List<Web.DatabaseModel.Entites.Task>>> GetItems(string employeeId)
        {
            var res = new ResponseModel<List<Web.DatabaseModel.Entites.Task>>(HttpStatusCode.OK, "", null);

            try
            {
                #region Get Data
                var items = await _taskRepos.GetListAsync(x => x.UserId.Equals(employeeId), x => x.OrderBy(y => y.Name), null);

                res.Data = items.ToList();
                #endregion
            }
            catch (Exception ex)
            {
                res = new ResponseModel<List<Web.DatabaseModel.Entites.Task>>(HttpStatusCode.InternalServerError, ex.Message, null);
                _logger.LogError(ex, $"{nameof(EmpolyeeServ)} - {nameof(TaskServ.GetItems)}: {ex.Message}");
            }
            return res;
        }
    }
}
