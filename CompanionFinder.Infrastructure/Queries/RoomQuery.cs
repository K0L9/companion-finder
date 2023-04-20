using CompanionFinder.Application.Queries;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Queries
{
    public class RoomQuery : BaseQuery<ChatRoom, string>, IRoomQuery
    {
        public RoomQuery(ApplicationDbContext context) : base(context)
        {

        }
    }
}
