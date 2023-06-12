using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Infrastructure.Hubs;

namespace CompanionFinder.Infrastructure.Services
{
    public class QueueService : IQueueService
    {
        private IList<FindRoomRequest> requestsQueue;

        public QueueService(IMapper mapper, IList<FindRoomRequest> requestsQueue)
        {
            //this.requestsQueue = new List<FindRoomRequest>();
            this.requestsQueue = requestsQueue;
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
            requestsQueue.Add(requestDTO);
        }
        private void RemoveRequest(FindRoomRequest request)
        {
            requestsQueue.Remove(request);
        }

        private Task<FindRoomRequest?> FindSameArgumentsAsync(FindRoomRequest requestDTO)
        {
            return Task.Run(() =>
            {
                var result = requestsQueue.FirstOrDefault(x => x.ThemeId == requestDTO.ThemeId
                    && x.UserId != requestDTO.UserId);

                return result;
            });
        }

        public void DeleteRequest(FindRoomRequest requestDTO)
        {
            requestsQueue.Remove(requestDTO);
        }
    }
}
