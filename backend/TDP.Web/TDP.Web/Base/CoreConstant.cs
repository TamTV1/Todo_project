using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TDP.Web.Base
{
    public static class CoreConstant
    {
        public static List<DropdownItem> TaskLayoutList()
        {
            return new List<DropdownItem>
            {
                new DropdownItem
                {
                    Value = "bd0d2ce4-fd77-4a0a-9fee-f88b1c2f4ab6",
                    Text = "Images"
                },
                new DropdownItem
                {
                    Value = "95ce100a-e0ea-48d9-8e50-643cbc119471",
                    Text = "Links"
                }
            };
        }
    }

    public class DropdownItem
    {
        public string Value { get; set; }
        public string Text { get; set; }
    }
}
