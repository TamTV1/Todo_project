using AutoMapper;
using LinqKit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Models.Core;
using TDP.Web.Models.EmployeeModel;
using TDP.Web.Models.Pagination;
using TDP.Web.Repository.Base;
using TDP.Web.Repository.DatabaseModel.Entites;

namespace TDP.Web.Services.EmpolyeeServs
{
    public class EmpolyeeServs : IEmpolyeeServs
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmployeeRepos _employeeRepos;
        private readonly IMapper _mapper;
        private readonly ILogger<EmpolyeeServs> _logger;
        public EmpolyeeServs(
            IUnitOfWork unitOfWork,
            IEmployeeRepos employeeRepos,
            IMapper mapper,
            ILogger<EmpolyeeServs> logger
            )
        {
            _unitOfWork = unitOfWork;
            _employeeRepos = employeeRepos;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ResponseModel<Employee>> GetItemById(string id)
        {
            var res = new ResponseModel<Employee>(HttpStatusCode.OK, "", null);

            try
            {
                var item = await _employeeRepos.GetItem(
                    x => x.Id.Equals(id),
                    null);

                //var itemData = _mapper.Map<Employee>(item);
                res.Data = item;
            }
            catch (Exception ex)
            {
                res = new ResponseModel<Employee>(HttpStatusCode.InternalServerError, ex.Message, null);
                _logger.LogError(ex, $"{nameof(EmpolyeeServs)} - {nameof(EmpolyeeServs.GetItemById)}: {ex.Message}");
            }

            return res;
        }

        public async Task<ResponseModel<PaginationResponseModel<Employee>>> GetItems(PaginationRequestModel request)
        {
            var res = new ResponseModel<PaginationResponseModel<Employee>>(HttpStatusCode.OK, "", new PaginationResponseModel<Employee>());

            try
            {
                #region Build Filter Query
                Expression<Func<Employee, bool>> filter = PredicateBuilder.New<Employee>(true);
                // add filter when has searchKey
                if (!string.IsNullOrWhiteSpace(request.SearchKey))
                {
                    var key = request.SearchKey.ToLower();
                    Expression<Func<Employee, bool>> filterSearch = PredicateBuilder.New<Employee>();
                    //var ignoresProperies = new List<string> { nameof(Employee.Id), nameof(Employee.IsActive) };
                    var ignoresProperies = new List<string> {  };
                    foreach (PropertyInfo propertyInfo in new Employee().GetType().GetProperties())
                    {
                        if (ignoresProperies.Contains(propertyInfo.Name)) continue;
                        switch (propertyInfo.Name)
                        {
                            case nameof(Employee.IsActive):
                                filterSearch = filterSearch.Or(x => (!!x.IsActive.Value && "enable".Contains(key)) || (!x.IsActive.Value && "disable".Contains(key)));
                                break;
                            default:
                                filterSearch = PredicateExpresion<Employee>.BuildExpressionForFilter(filterSearch, propertyInfo, key);
                                break;
                        }
                        
                    }
                    filter = filter.And(filterSearch);
                }
                #endregion
                #region Build Sort Query
                IList<Func<IOrderedQueryable<Employee>, IOrderedQueryable<Employee>>> sortFuncList = new List<Func<IOrderedQueryable<Employee>, IOrderedQueryable<Employee>>>();
                // order by createDay latest
                sortFuncList.Add(x => x.ThenBy(x => x.Name));
                #endregion
                #region Get Data
                PaginationResponseModel<Employee> items = await _employeeRepos.GetListPaginationCustomSortAsync(request.PageIndex, request.PageNumber,
                    filter, sortFuncList, null);

                res.Data = items;
                #endregion
            }
            catch (Exception ex)
            {
                res = new ResponseModel<PaginationResponseModel<Employee>>(HttpStatusCode.InternalServerError, ex.Message, new PaginationResponseModel<Employee>());
                _logger.LogError(ex, $"{nameof(EmpolyeeServs)} - {nameof(EmpolyeeServs.GetItems)}: {ex.Message}");
            }
            return res;
        }

        public async Task<ResponseModel<Employee>> CreateNewItem(EmployeeModifyModel request)
        {
            var res = new ResponseModel<Employee>(HttpStatusCode.OK, "", null);
            try
            {
                request.Name = request.Name.Trim();
                request.Email = request.Email.Trim();
                request.Phone = request.Phone?.Trim();
                request.Position = request.Position?.Trim();

                var savedModel = _mapper.Map<Employee>(request);

                await _employeeRepos.InsertAsBaseEntityAsync(savedModel);

                await _unitOfWork.CommitAsync();
                res.Data = savedModel;
            }
            catch (Exception ex)
            {
                res = new ResponseModel<Employee>(HttpStatusCode.InternalServerError, ex.Message, null);
                _logger.LogError(ex, $"{nameof(EmpolyeeServs)} - {nameof(EmpolyeeServs.CreateNewItem)}: {ex.Message}");
            }
            return res;
        }

        public async Task<ResponseModel<Employee>> UpdateItem(EmployeeModifyModel request)
        {
            var res = new ResponseModel<Employee>(HttpStatusCode.OK, "", null);
            try
            {
                Employee item = await _employeeRepos.GetItem(
                    x => !string.IsNullOrWhiteSpace(request.Id) && x.Id.Equals(request.Id), null);
                if (item == null)
                {
                    res.Code = HttpStatusCode.BadRequest;
                    res.Message = "Employee not exist";
                    res.Data = null;
                    return res;
                }

                item.Name = request.Name.Trim();
                item.Name = request.Email.Trim();
                item.Name = request.Phone.Trim();
                item.Name = request.Position.Trim();
                item.IsActive = request.IsActive;

                _employeeRepos.UpdateAsBaseEntity(item);

                await _unitOfWork.CommitAsync();
                res.Data = item;
            }
            catch (Exception ex)
            {
                res = new ResponseModel<Employee>(HttpStatusCode.InternalServerError, ex.Message, null);
                _logger.LogError(ex, $"{nameof(EmpolyeeServs)} - {nameof(EmpolyeeServs.UpdateItem)}: {ex.Message}");
            }
            return res;
        }
    }
}
