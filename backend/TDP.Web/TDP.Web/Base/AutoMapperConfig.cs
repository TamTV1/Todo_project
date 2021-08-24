using AutoMapper;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Models.EmployeeModel;

namespace TDP.Web.Base
{
    public class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Employee, EmployeeModifyModel>()
                    .ReverseMap();
            });
            return config.CreateMapper();
        }
    }
}
