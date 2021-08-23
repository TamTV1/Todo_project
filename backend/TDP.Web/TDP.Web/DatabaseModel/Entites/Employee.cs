using System;
using System.Collections.Generic;

#nullable disable

namespace TDP.Web.DatabaseModel.Entites
{
    public partial class Employee
    {
        public Employee()
        {
            Tasks = new HashSet<Task>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Position { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
