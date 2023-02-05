using CompanionFinder.Application.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace CompanionFinder.Infrastructure.Hubs
{
    public class RoomHub : Hub<IRoomHub>
    {
        async Task FindedRoom(int roomId)
        {
            //await Clients.All.FindedRoom(roomId);
        }

        public string GetConnectionId() => Context.ConnectionId;

        async Task ConnectedSuccessfully()
        {
            //await Clients.All.ConnectedSuccesfully();
        }

    }
}
