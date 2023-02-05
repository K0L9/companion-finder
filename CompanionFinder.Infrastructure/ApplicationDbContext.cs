using CompanionFinder.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;

namespace CompanionFinder.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<AnonymousUser> Users { get; set; }
        public virtual DbSet<ChatRoom> ChatRooms { get; set; }
        public virtual DbSet<ConversationTheme> Themes { get; set; }
        public virtual DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AnonymousUser>()
                   .HasOne(x => x.CurrentChat)
                   .WithMany(x => x.Users)
                   .HasForeignKey(x => x.CurrentChatId)
                   .IsRequired(false);

            builder.Entity<ChatRoom>()
                 .HasOne(x => x.Theme)
                 .WithMany(x => x.Chats);

            builder.Entity<Message>()
                .HasOne(x => x.CreatedByUser)
                .WithMany(x => x.Messages)
                .HasForeignKey(x => x.CreatedByUserId);

            builder.Entity<Message>()
                .HasOne(x => x.ChatRoom)
                .WithMany(x => x.Messages);

            //builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
