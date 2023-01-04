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
        public virtual DbSet<Chat> Chats { get; set; }
        public virtual DbSet<ConversationTheme> Themes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AnonymousUser>()
                   .HasOne(x => x.CurrentChat)
                   .WithMany(x => x.Users);

            builder.Entity<Chat>()
                 .HasOne(x => x.Theme)
                 .WithMany(x => x.Chats);

            //builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
