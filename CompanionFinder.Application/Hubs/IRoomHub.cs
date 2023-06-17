using CompanionFinder.Application.DTO;

namespace CompanionFinder.Application.Hubs
{
    public interface IRoomHub
    {
        Task FoundedRoom(string roomId);
        Task ServerMessage(MessageDTO message);
        Task OpponentChangeWritingStatus(bool writeStatus);
    }
}
