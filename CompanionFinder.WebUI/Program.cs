using CompanionFinder.Application.Commands;
using CompanionFinder.Application.Queries;
using CompanionFinder.Application.Services;
using CompanionFinder.Infrastructure;
using CompanionFinder.Infrastructure.Commands;
using CompanionFinder.Infrastructure.Hubs;
using CompanionFinder.Infrastructure.Queries;
using CompanionFinder.Infrastructure.Services;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder => builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .SetIsOriginAllowed((hosts) => true));
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(
                    builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddTransient<IChatRoomService, ChatRoomService>();
builder.Services.AddTransient<IChatRoomCommand, ChatRoomCommand>();
builder.Services.AddSingleton<IQueueService, QueueService>();

builder.Services.AddTransient<IUserQuery, UserQuery>();
builder.Services.AddTransient<IRoomQuery, RoomQuery>();

var app = builder.Build();

//app.UseSpaStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");
app.UseAuthorization();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<RoomHub>("/rooms");
});

app.UseHttpsRedirection();

app.MapControllers();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "Client";

    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

app.Run();