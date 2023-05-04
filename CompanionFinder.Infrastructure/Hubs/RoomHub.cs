using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics.Tracing;

namespace CompanionFinder.Infrastructure.Hubs
{
    public class RoomHub : Hub<IRoomHub>
    {
        private readonly IList<ConnectToRoomRequestDTO> _connections;

        public RoomHub(IList<ConnectToRoomRequestDTO> connections)
        {
            _connections = connections;
        }


        public string GetConnectionId() => Context.ConnectionId;

        public async Task JoinRoom(ConnectToRoomRequestDTO connectionDTO)
        {
            connectionDTO.ConnectionId = GetConnectionId();

            await Groups.AddToGroupAsync(Context.ConnectionId, connectionDTO.RoomId);

            _connections.Add(connectionDTO);

            await Clients.Group(connectionDTO.RoomId).ServerMessage(new MessageDTO() { CreatedBy = "Bot", Message = "Connected" });
        }

        public async Task ClientMessage(MessageDTO message)
        {
            var user = _connections.FirstOrDefault(x => x.RoomId == message.RoomId && x.ConnectionId != GetConnectionId());
            await Clients.Client(user.ConnectionId).ServerMessage(message);
        }

    }
}
