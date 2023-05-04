using CompanionFinder.Application.DTO;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Application.Services
{
    public interface IQueueService
    {
        public Task<FindRoomRequest> RequestHandleAsync(FindRoomRequest requestDTO);
    }
}
