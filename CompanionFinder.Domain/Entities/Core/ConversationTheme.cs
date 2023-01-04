using System.ComponentModel.DataAnnotations;

namespace CompanionFinder.Domain.Entities.Core
{
    public class ConversationTheme : BaseEntity<int>
    {
        [Required]
        public string Title { get; set; }

        //Nav props
        public virtual ICollection<Chat> Chats { get; set; }
    }
}
