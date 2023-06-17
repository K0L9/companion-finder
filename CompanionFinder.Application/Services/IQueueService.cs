using CompanionFinder.Application.DTO;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Application.Services
{
    public interface IQueueService
    {
        public void AddRequest(FindRoomRequest requestDTO);
        public void RemoveRequest(FindRoomRequest request);
        public Task<FindRoomRequest?> FindSameArgumentsAsync(FindRoomRequest requestDTO);
    }
}
