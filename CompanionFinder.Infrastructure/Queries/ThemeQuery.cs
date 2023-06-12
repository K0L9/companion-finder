using CompanionFinder.Application.Queries;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Queries
{
    public class ThemeQuery : BaseQuery<ConversationTheme, int>, IThemeQuery
    {
        public ThemeQuery(ApplicationDbContext context) : base(context)
        {
        }
    }
}
