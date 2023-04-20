using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Domain.Entities.Core;

namespace CompanionFinder.Infrastructure.Services.Mapper
{
    public class ChatRoomMapperProfile : Profile
    {
        public ChatRoomMapperProfile()
        {
            CreateMap<AddRoomDTO, ChatRoom>()
                .ForMember(dest => dest.ConversationThemeId, opt => opt.MapFrom(src => src.ConversationThemeId))
                .ForMember(dest => dest.Id, opt => opt.Ignore());

        }
    }
}
