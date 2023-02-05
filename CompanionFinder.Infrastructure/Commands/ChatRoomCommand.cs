using CompanionFinder.Application.Commands;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Commands
{
    public class ChatRoomCommand : BaseCommand<ChatRoom, int>, IChatRoomCommand
    {
        public ChatRoomCommand(ApplicationDbContext context) : base(context)
        {

        }
    }
}
