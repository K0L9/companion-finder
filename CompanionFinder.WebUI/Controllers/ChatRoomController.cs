using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Hubs;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Infrastructure.Hubs;
using CompanionFinder.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CompanionFinder.WebUI.Controllers
{
    [Route("api/chat-room")]
    [ApiController]
    public class ChatRoomController : Controller
    {
        private readonly IChatRoomService chatRoomService;
        private readonly IQueueService queueService;

        private IHubContext<RoomHub, IRoomHub> roomHub;

        public ChatRoomController(IHubContext<RoomHub, IRoomHub> roomHub, IQueueService queueService, IChatRoomService chatRoomService)
        {
            this.roomHub = roomHub;
            this.queueService = queueService;
            this.chatRoomService = chatRoomService;
        }

        // POST: ChatRoomController/Delete/5
        //[ValidateAntiForgeryToken]
        [HttpPost("add-request")]
        public async Task<IActionResult> AddRequest([FromBody] FindRoomRequest requestDTO)
        {
            try
            {
                var result = await queueService.RequestHandleAsync(requestDTO);
                if (result == null)
                    return Ok();

                string createdRoomId = await chatRoomService.CreateChatRoom(new AddRoomDTO() { ConversationThemeId = requestDTO.ThemeId });
                await roomHub.Clients.Clients(result.ConnectionId, requestDTO.ConnectionId).FoundedRoom(createdRoomId);

                return CreatedAtAction(nameof(AddRequest), new { id = createdRoomId }, createdRoomId);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("remove-request")]
        public async Task<IActionResult> RemoveRequest([FromBody] FindRoomRequest requestDTO)
        {
            try
            {
                queueService.DeleteRequest(requestDTO);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            await roomHub.Clients.All.FoundedRoom("1233");
            return Ok();
        }
    }
}