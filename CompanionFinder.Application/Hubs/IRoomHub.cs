namespace CompanionFinder.Application.Hubs
{
    public interface IRoomHub
    {
        Task FindedRoom(int roomId);
        Task ConnectedSuccessfully();

    }
}
