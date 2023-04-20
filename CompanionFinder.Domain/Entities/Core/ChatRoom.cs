namespace CompanionFinder.Domain.Entities.Core
{
    public class ChatRoom : BaseEntity<string>
    {
        public int ConversationThemeId { get; set; }

        //Nav props
        public virtual ConversationTheme Theme { get; set; }
        public virtual ICollection<AnonymousUser> Users { get; set; }
        public virtual ICollection<Message> Messages { get; set; }

    }
}
