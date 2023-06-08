using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CompanionFinder.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("get-user-id")]
        public async Task<IActionResult> GetUserId()
        {
            string userId = Guid.NewGuid().ToString();
            return Ok(userId);
        }
        
    }
}
