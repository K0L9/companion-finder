using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Domain.Entities
{
    public class FindRoomRequest
    {
        public AnonymousUser User { get; set; }
        public ConversationTheme Theme { get; set; }
    }
}
