using AutoMapper;
using CompanionFinder.Application.Commands;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Queries;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Services
{
    public class ChatRoomService : IChatRoomService
    {
        private List<FindRoomRequest> _mainFindRoomQueue;
        private readonly IChatRoomCommand chatRoomCommand;
        private readonly IQueueService queueService;
        private readonly IMapper mapper;
        private readonly IRoomQuery roomQuery;
        private readonly IUserQuery userQuery;

        public ChatRoomService(IChatRoomCommand chatRoomCommand, IQueueService queueService, IMapper mapper, IRoomQuery roomQuery, IUserQuery userQuery)
        {
            _mainFindRoomQueue = new List<FindRoomRequest>();
            this.chatRoomCommand = chatRoomCommand;
            this.queueService = queueService;
            this.mapper = mapper;
            this.roomQuery = roomQuery;
            this.userQuery = userQuery;
        }

        public async Task<string> CreateChatRoom(AddRoomDTO addRoomDTO)
        {
            var tmp = mapper.Map<ChatRoom>(addRoomDTO);
            tmp.Id = Guid.NewGuid().ToString();
            var result = await chatRoomCommand.AddAsync(tmp);

            await chatRoomCommand.SaveChangesAsync();

            return result.Id;
        }

        public async void ConnectToRoom(ConnectToRoomRequestDTO requestDTO)
        {
            AnonymousUser user = await userQuery.GetByIdAsync(requestDTO.UserId);
            //ChatRoom room = await roomQuery.GetByIdAsync(requestDTO.RoomId);

            //room.Users.Add(user);
            //user.CurrentChat = room;
            //user.CurrentConnectionId = requestDTO.ConnectionId;
        }
    }
}
