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
    [Route("api/")]
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
        [HttpPost("handle-request")]
        public async Task<IActionResult> HandleRequest([FromBody] FindRoomRequest requestDTO)
        {
            try
            {
                var result = await queueService.RequestHandleAsync(requestDTO);
                if (result == null)
                    return Ok();

                string createdRoomId = await chatRoomService.CreateChatRoom(new AddRoomDTO() { ConversationThemeId = requestDTO.ThemeId });
                await roomHub.Clients.Clients(result.ConnectionId, requestDTO.ConnectionId).FindedRoom(createdRoomId);

                return CreatedAtAction(nameof(HandleRequest), new { id = createdRoomId }, createdRoomId);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("connect-to-room")]
        public async Task<IActionResult> ConnectToRoom([FromBody] ConnectToRoomRequestDTO connectDTO)
        {
            //chatRoomService.ConnectToRoom(connectDTO);
            //await roomHub.Clients.Client(connectDTO.ConnectionId).ConnectedSuccessfully();
            return Ok();
        }

        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            await roomHub.Clients.All.FindedRoom("1233");
            return Ok();
        }
    }
}