using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.DTO.Theme;
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

            CreateMap<ThemeDTO, ConversationTheme>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title)).ReverseMap();

            CreateMap<ThemeAddDTO, ConversationTheme>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title)).ReverseMap();
        }
    }
}
