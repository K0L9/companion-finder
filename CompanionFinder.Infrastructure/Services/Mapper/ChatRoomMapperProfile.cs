using AutoMapper;
using CompanionFinder.Application.DTO;
using CompanionFinder.Domain.Entities;

namespace CompanionFinder.Infrastructure.Services.Mapper
{
    public class ChatRoomMapperProfile : Profile
    {
        public ChatRoomMapperProfile()
        {
            CreateMap<FindRoomRequest, AddRoomRequestDTO>()
                .ForMember(dest => dest.UserIp, opt => opt.MapFrom(src => src.User.UserIp))
                .ForMember(dest => dest.ThemeTitle, opt => opt.MapFrom(src => src.Theme.Title));

        }
    }
}
