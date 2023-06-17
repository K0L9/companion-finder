using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Hubs;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Infrastructure.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

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
                var requestInQueue = await queueService.FindSameArgumentsAsync(requestDTO);
                if (requestInQueue == null)
                {
                    queueService.AddRequest(requestDTO);
                    return Ok();
                }

                string createdRoomId = await chatRoomService.CreateChatRoom(new AddRoomDTO() { ConversationThemeId = requestDTO.ThemeId });
                await roomHub.Clients.Clients(requestInQueue.ConnectionId, requestDTO.ConnectionId).FoundedRoom(createdRoomId);
                queueService.RemoveRequest(requestInQueue);

                return CreatedAtAction(nameof(AddRequest), new { id = createdRoomId }, createdRoomId);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("remove-request")]
        public async Task<IActionResult> RemoveRequest([FromBody] FindRoomRequest requestDTO)
        {
            try
            {
                queueService.RemoveRequest(requestDTO);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}