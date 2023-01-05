using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanionFinder.WebUI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ChatRoomController : Controller
    {
        private readonly IChatRoomService chatRoomService;

        public ChatRoomController(IChatRoomService chatRoomService)
        {
            this.chatRoomService = chatRoomService;
        }

        // POST: ChatRoomController/Delete/5
        //[ValidateAntiForgeryToken]
        [HttpPost("add-to-queue")]
        public async Task<IActionResult> AddRequestToQueue([FromBody] AddRoomRequestDTO requestDTO)
        {
            try
            {
                var result = await chatRoomService.FindSameArgumentsInQueue(requestDTO);

                if (result == null)
                    await chatRoomService.AddFindRoomRequestToQueue(requestDTO);

                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
