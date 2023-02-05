using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CompanionFinder.Infrastructure.Migrations
{
    public partial class CurrentChatNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Themes_ThemeId",
                table: "ChatRooms");

            migrationBuilder.RenameColumn(
                name: "ThemeId",
                table: "ChatRooms",
                newName: "ConversationThemeId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatRooms_ThemeId",
                table: "ChatRooms",
                newName: "IX_ChatRooms_ConversationThemeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Themes_ConversationThemeId",
                table: "ChatRooms",
                column: "ConversationThemeId",
                principalTable: "Themes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Themes_ConversationThemeId",
                table: "ChatRooms");

            migrationBuilder.RenameColumn(
                name: "ConversationThemeId",
                table: "ChatRooms",
                newName: "ThemeId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatRooms_ConversationThemeId",
                table: "ChatRooms",
                newName: "IX_ChatRooms_ThemeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Themes_ThemeId",
                table: "ChatRooms",
                column: "ThemeId",
                principalTable: "Themes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
