using System;
using System.Collections.Generic;

#nullable disable

namespace TDP.Web.DatabaseModel.Entites
{
    public partial class Task
    {
        public Task()
        {
            Images = new HashSet<Image>();
        }

        public string Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Description { get; set; }

        public virtual Employee User { get; set; }
        public virtual ICollection<Image> Images { get; set; }
    }
}
