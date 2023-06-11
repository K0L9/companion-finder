using CompanionFinder.Application.DTO.Theme;

namespace CompanionFinder.Application.Services
{
    public interface IThemeService
    {
        Task<List<ThemeDTO>> GetAllThemesAsync();
        Task AddThemeAsync(ThemeAddDTO theme);
        Task DeleteThemeAsync(int id);
    }
}
