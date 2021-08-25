using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TDP.Web.Models.TasksModel
{
    public class TasksModifyModel
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        [Required]
        public string LayoutId { get; set; }
        [Required]
        public DateTime? StartTime { get; set; }
        public DateTime? Email { get; set; }
        public string EndTime { get; set; }
        public string Description { get; set; }
        public string ImagesLink { get; set; }
    }
}
