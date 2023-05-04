using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Infrastructure.Hubs;

namespace CompanionFinder.Infrastructure.Services
{
    public class QueueService : IQueueService
    {
        private List<FindRoomRequest> _requestsQueue;

        public QueueService(IMapper mapper)
        {
            _requestsQueue = new List<FindRoomRequest>();
        }

        public async Task<FindRoomRequest> RequestHandleAsync(FindRoomRequest requestDTO)
        {
            var result = await FindSameArgumentsAsync(requestDTO);

            if (result == null)
                AddRequest(requestDTO);
            else
                RemoveRequest(result);

            return result;
        }

        private void AddRequest(FindRoomRequest requestDTO)
        {
            _requestsQueue.Add(requestDTO);
        }
        private void RemoveRequest(FindRoomRequest request)
        {
            _requestsQueue.Remove(request);
        }

        private Task<FindRoomRequest?> FindSameArgumentsAsync(FindRoomRequest requestDTO)
        {
            return Task.Run(() =>
            {
                var result = _requestsQueue.FirstOrDefault(x => x.ThemeId == requestDTO.ThemeId
                    && x.UserId != requestDTO.UserId);

                return result;
            });
        }
    }
}
