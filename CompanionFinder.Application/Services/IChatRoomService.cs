using CompanionFinder.Application.DTO;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Application.Services
{
    public interface IChatRoomService
    {
        public Task AddFindRoomRequestToQueue(AddRoomRequestDTO taskRoomRequest);
        public Task<FindRoomRequest> FindSameArgumentsInQueue(AddRoomRequestDTO taskRoomRequest);
    }
}
