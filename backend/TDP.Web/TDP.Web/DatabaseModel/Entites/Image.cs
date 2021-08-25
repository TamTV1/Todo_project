using System;
using System.Collections.Generic;

#nullable disable

namespace TDP.Web.DatabaseModel.Entites
{
    public partial class Image
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        public virtual Task Task { get; set; }
    }
}
