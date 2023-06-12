using CompanionFinder.Application.Commands;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Commands
{
    public class ThemeCommand : BaseCommand<ConversationTheme, int>, IThemeCommand
    {
        public ThemeCommand(ApplicationDbContext context) : base(context)
        {
        }
    }
}
