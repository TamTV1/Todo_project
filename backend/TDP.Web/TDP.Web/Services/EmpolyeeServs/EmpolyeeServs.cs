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
                    var ignoresProperies = new List<string> { nameof(Employee.Id), nameof(Employee.IsActive) };
                    foreach (PropertyInfo propertyInfo in new Employee().GetType().GetProperties())
                    {
                        if (ignoresProperies.Contains(propertyInfo.Name)) continue;
                        filterSearch = PredicateExpresion<Employee>.BuildExpressionForFilter(filterSearch, propertyInfo, key);
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
    }
}
