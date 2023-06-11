using CompanionFinder.Application.DTO.Theme;
using CompanionFinder.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace CompanionFinder.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThemeController : ControllerBase
    {
        private readonly IThemeService service;

        public ThemeController(IThemeService service)
        {
            this.service = service;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult>  GetAllThemes()
        {
            var result = await service.GetAllThemesAsync();
            return Ok(result);
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddTheme([FromBody] ThemeAddDTO dto)
        {
            await service.AddThemeAsync(dto);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTheme(int id)
        {
            await service.DeleteThemeAsync(id);

            return Ok();
        }

    }
}
