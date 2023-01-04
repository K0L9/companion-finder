using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanionFinder.Domain.Entities.Core
{
    public class Chat : BaseEntity<int>
    {

        //Nav props
        public virtual ConversationTheme Theme { get; set; }
        public virtual ICollection<AnonymousUser> Users { get; set; }

    }
}
