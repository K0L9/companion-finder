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

            //await Clients.Group(connectionDTO.RoomId).ServerMessage(new MessageDTO() { CreatedBy = "Server", Message = "Connected", RoomId = connectionDTO.RoomId });
            //var opponent = _connections.FirstOrDefault(x => x.RoomId == connectionDTO.RoomId && connectionDTO.UserId != x.UserId);
            //if (opponent != null)
            //    await Clients.Client(opponent.ConnectionId).ServerMessage(new MessageDTO() { CreatedBy = "Server", Message = "Opponent connected", RoomId = connectionDTO.RoomId });
        }

        public async Task ClientMessage(MessageDTO message)
        {
            message.MessageId = Guid.NewGuid().ToString();
            var user = _connections.Where(x => x.RoomId == message.RoomId);
            var tmp = user.Select(x => x.ConnectionId).ToList().AsReadOnly();
            await Clients.Clients(tmp).ServerMessage(message);
        }

    }
}
