using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanionFinder.Domain.Entities.Core
{
    public class AnonymousUser : BaseEntity<int>
    {
        [Required]
        public string UserIp { get; set; }
        public int? CurrentChatId { get; set; }

        [NotMapped]
        public string CurrentConnectionId { get; set; }

        //Nav props
        public virtual ChatRoom CurrentChat { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}
