using System.ComponentModel.DataAnnotations;

namespace CompanionFinder.Domain.Entities.Core
{
    public class Message : BaseEntity<int>
    {
        public string MessageText { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedByUserId { get; set; }
        public string ChatRoomId { get; set; }

        //Navigation props
        [Required]
        public AnonymousUser CreatedByUser { get; set; }
        [Required]
        public ChatRoom ChatRoom { get; set; }
    }
}
