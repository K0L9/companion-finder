using AutoMapper;
using CompanionFinder.Application.Commands;
using CompanionFinder.Application.DTO;
using CompanionFinder.Application.Queries;
using CompanionFinder.Application.Services;
using CompanionFinder.Domain.Entities;
using CompanionFinder.Infrastructure;
using CompanionFinder.Infrastructure.Commands;
using CompanionFinder.Infrastructure.Hubs;
using CompanionFinder.Infrastructure.Queries;
using CompanionFinder.Infrastructure.Services;
using CompanionFinder.Infrastructure.Services.Mapper;
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

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "Client";
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(
                    builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(ChatRoomMapperProfile).Assembly));

builder.Services.AddTransient<IChatRoomService, ChatRoomService>();
builder.Services.AddTransient<IChatRoomCommand, ChatRoomCommand>();
builder.Services.AddTransient<IThemeCommand, ThemeCommand>();

builder.Services.AddTransient<IUserQuery, UserQuery>();
builder.Services.AddTransient<IRoomQuery, RoomQuery>();
builder.Services.AddTransient<IThemeQuery, ThemeQuery>();

//builder.Services.AddSingleton<IDictionary<string, ConnectToRoomRequestDTO>>(opts => new Dictionary<string, ConnectToRoomRequestDTO>());
builder.Services.AddSingleton<IList<ConnectToRoomRequestDTO>>(opts => new List<ConnectToRoomRequestDTO>());
builder.Services.AddSingleton<IList<FindRoomRequest>>(opts => new List<FindRoomRequest>());
builder.Services.AddTransient<IQueueService, QueueService>();
builder.Services.AddTransient<IThemeService, ThemeService>();

var app = builder.Build();

//app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");
app.UseAuthorization();

app.UseSpaStaticFiles(new StaticFileOptions { RequestPath = "/Client/build" });

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