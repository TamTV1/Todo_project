using System.Net;

namespace TDP.Web.Models.Core
{
    public class ResponseModel<T>
    {
        public HttpStatusCode Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public ResponseModel()
        {

        }
        public ResponseModel(HttpStatusCode code, string mes, T data)
        {
            Code = code;
            Message = mes;
            Data = data;
        }
    }
}
