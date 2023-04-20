using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace CompanionFinder.Infrastructure.Hubs
{
    public class RoomHub : Hub<IRoomHub>
    {
        private readonly IDictionary<string, ConnectToRoomRequestDTO> _connections;

        public RoomHub(IDictionary<string, ConnectToRoomRequestDTO> connections)
        {
            _connections = connections;
        }

        async Task FindedRoom(int roomId)
        {
        }

        public string GetConnectionId() => Context.ConnectionId;

        public async Task JoinRoom(ConnectToRoomRequestDTO connectionDTO)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connectionDTO.RoomId);

            _connections[Context.ConnectionId] = connectionDTO;

            await Clients.Group(connectionDTO.RoomId).ReceiveMessage(new MessageDTO() { CreatedBy = "Bot", Message = "Connected" });
        }

        public async Task ReceiveMessage(MessageDTO message)
        {

        }

    }
}
