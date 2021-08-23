﻿using System.Collections.Generic;

namespace TDP.Web.Models.Pagination
{
    public class PaginationResponseModel<T>
    {
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }

        public PaginationResponseModel()
        {
        }
        public PaginationResponseModel(int totalItems, IEnumerable<T> items)
        {
            TotalItems = totalItems;
            Items = items;
        }
    }
}
