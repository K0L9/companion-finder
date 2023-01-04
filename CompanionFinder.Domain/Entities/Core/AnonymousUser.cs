using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanionFinder.Domain.Entities.Core
{
    public class AnonymousUser : BaseEntity<int>
    {
        [Required]
        public string UserIp { get; set; }

        //Nav props
        public virtual Chat CurrentChat { get; set; }
    }
}
