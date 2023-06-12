namespace CompanionFinder.Application.DTO
{
    public class MessageDTO
    {
        public string MessageId { get; set; }
        public string CreatedBy { get; set; }
        public string Message { get; set; }
        public string RoomId { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
