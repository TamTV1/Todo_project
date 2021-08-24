using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TDP.Web.Models.EmployeeModel
{
    public class EmployeeModifyModel
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Position { get; set; }
        public bool? IsActive { get; set; }
    }
}
