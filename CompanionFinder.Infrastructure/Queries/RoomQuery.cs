using CompanionFinder.Application.Queries;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Queries
{
    public class RoomQuery : BaseQuery<ChatRoom, int>, IRoomQuery
    {
        public RoomQuery(ApplicationDbContext context) : base(context)
        {

        }
    }
}
