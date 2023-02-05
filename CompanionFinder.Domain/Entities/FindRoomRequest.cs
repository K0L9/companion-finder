namespace CompanionFinder.Domain.Entities
{
    public class FindRoomRequest
    {
        public int UserId { get; set; }
        public int ThemeId { get; set; }
        public string? ConnectionId { get; set; }
    }
}
