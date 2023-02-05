using CompanionFinder.Application.DTO;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Application.Services
{
    public interface IChatRoomService
    {
        public Task<int> CreateChatRoom(AddRoomDTO addRoomDTO);
        public void ConnectToRoom(ConnectToRoomRequestDTO requestDTO);

    }
}
