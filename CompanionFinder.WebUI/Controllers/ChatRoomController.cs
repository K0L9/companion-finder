using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Hubs;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Infrastructure.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace CompanionFinder.WebUI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ChatRoomController : Controller
    {
        private readonly IChatRoomService chatRoomService;
        private readonly IQueueService queueService;

        private IHubContext<RoomHub, IRoomHub> roomHub;

        public ChatRoomController(IChatRoomService chatRoomService, IHubContext<RoomHub, IRoomHub> roomHub, IQueueService queueService)
        {
            this.chatRoomService = chatRoomService;
            this.roomHub = roomHub;
            this.queueService = queueService;
        }

        // POST: ChatRoomController/Delete/5
        //[ValidateAntiForgeryToken]
        [HttpPost("add-to-queue")]
        public async Task<IActionResult> AddRequestToQueue([FromBody] FindRoomRequest requestDTO)
        {
            try
            {
                var result = await queueService.FindSameArgumentsAsync(requestDTO);

                if (result == null)
                    queueService.AddRequest(requestDTO);
                else
                {
                    string createdRoomId = await chatRoomService.CreateChatRoom(new AddRoomDTO() { ConversationThemeId = requestDTO.ThemeId });
                    queueService.RemoveRequest(result);
                    await roomHub.Clients.Clients(result.ConnectionId, requestDTO.ConnectionId).FindedRoom(createdRoomId);
                }

                return Ok();

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
