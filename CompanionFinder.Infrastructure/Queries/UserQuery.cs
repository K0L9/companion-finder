using CompanionFinder.Application.Queries;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Queries
{
    public class UserQuery : BaseQuery<AnonymousUser, int>, IUserQuery
    {
        public UserQuery(ApplicationDbContext context) : base(context)
        {

        }
    }
}
