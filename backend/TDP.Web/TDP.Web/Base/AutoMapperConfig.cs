using AutoMapper;

namespace TDP.Web.Base
{
    public class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            var config = new MapperConfiguration(cfg =>
            {
            });
            return config.CreateMapper();
        }
    }
}
