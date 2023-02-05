using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CompanionFinder.Infrastructure.Migrations
{
    public partial class CurrentChatNullable3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_ChatRooms_CurrentChatId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentChatId",
                table: "Users",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ChatRooms_CurrentChatId",
                table: "Users",
                column: "CurrentChatId",
                principalTable: "ChatRooms",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_ChatRooms_CurrentChatId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "CurrentChatId",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_ChatRooms_CurrentChatId",
                table: "Users",
                column: "CurrentChatId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
