namespace CompanionFinder.Domain.Entities
{
    public class FindRoomRequest
    {
        public string? UserId { get; set; }
        public int ThemeId { get; set; }
        public string? ConnectionId { get; set; }
    }
}
