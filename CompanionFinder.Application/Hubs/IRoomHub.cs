using CompanionFinder.Application.DTO;

namespace CompanionFinder.Application.Hubs
{
    public interface IRoomHub
    {
        Task FoundedRoom(string roomId);
        Task ConnectedSuccessfully();
        Task JoinRoom(ConnectToRoomRequestDTO connectionDTO);
        Task ReceiveMessage(MessageDTO message);
        Task ServerMessage(MessageDTO message);


    }
}
