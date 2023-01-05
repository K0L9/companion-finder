using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Infrastructure.Services
{
    public class ChatRoomService : IChatRoomService
    {
        public Queue<FindRoomRequest> MainFindRoomQueue { get; set; }
        private readonly IMapper mapper;

        public ChatRoomService(IMapper mapper)
        {
            MainFindRoomQueue = new Queue<FindRoomRequest>();
            this.mapper = mapper;
        }

        public async Task AddFindRoomRequestToQueue(AddRoomRequestDTO taskRoomRequest)
        {
            MainFindRoomQueue.Enqueue(mapper.Map<FindRoomRequest>(taskRoomRequest));
        }

        public Task<FindRoomRequest?> FindSameArgumentsInQueue(AddRoomRequestDTO taskRoomRequest)
        {
            return Task.Run(() =>
            {
                var result = MainFindRoomQueue.FirstOrDefault(x => x.Theme.Title == taskRoomRequest.ThemeTitle && x.User.UserIp != taskRoomRequest.UserIp);

                if (result == null)
                    return null;

                return result;
            });
        }
    }
}
