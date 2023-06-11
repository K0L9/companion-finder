using AutoMapper;
using CompanionFinder.Application.Commands;
using CompanionFinder.Application.DTO.Theme;
using CompanionFinder.Application.Queries;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities.Core;
using CompanionFinder.Infrastructure.Services.Mapper;
using Microsoft.EntityFrameworkCore;

namespace CompanionFinder.Infrastructure.Services
{
    public class ThemeService : IThemeService
    {
        private readonly IThemeQuery query;
        private readonly IThemeCommand command;
        private IMapper mapper;

        public ThemeService(IThemeQuery query, IMapper mapper, IThemeCommand command)
        {
            this.query = query;
            this.mapper = mapper;
            this.command = command;
        }

        public async Task AddThemeAsync(ThemeAddDTO theme)
        {
            await command.AddAsync(mapper.Map<ConversationTheme>(theme));
            await command.SaveChangesAsync();   
        }

        public async Task DeleteThemeAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<List<ThemeDTO>> GetAllThemesAsync()
        {
            var themeList = query.GetAll();
            var result = await themeList.Select(x => mapper.Map<ThemeDTO>(x)).ToListAsync();
            return result;
        }
    }
}
