using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TDP.Web.Models.Pagination
{
    public class PaginationRequestModel
    {
        public int PageIndex { get; set; }
        public int PageNumber { get; set; }
        public string SearchKey { get; set; }

        public PaginationRequestModel()
        {
        }

        public PaginationRequestModel(int pageIndex, int pageNumber, string searchKey)
        {
            PageIndex = pageIndex;
            PageNumber = pageNumber;
            SearchKey = searchKey?.Trim();
        }
    }
}
