using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Infrastructure.Services
{
    public class QueueService : IQueueService
    {
        private List<FindRoomRequest> _requestsQueue;

        public QueueService(IMapper mapper)
        {
            _requestsQueue = new List<FindRoomRequest>();
        }

        public void AddRequest(FindRoomRequest requestDTO)
        {
            _requestsQueue.Add(requestDTO);
        }
        public void RemoveRequest(FindRoomRequest request)
        {
            _requestsQueue.Remove(request);
        }

        public async Task<FindRoomRequest> FindSameArgumentsAsync(FindRoomRequest requestDTO)
        {
            return await Task.Run(() =>
            {
                var result = _requestsQueue.FirstOrDefault(x => x.ThemeId == requestDTO.ThemeId
                    && x.UserId != requestDTO.UserId);

                if (result == null)
                    return null;

                return result;
            });
        }
    }
}
