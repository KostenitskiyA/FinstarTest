using FinstarTest.API.Interfaces;
using FinstarTest.API.Models;
using FinstarTest.API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetConnectionString("DefaultDatabase");
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(connection, options => options.EnableRetryOnFailure()));

builder.Services.AddTransient<IObjectService, ObjectService>();

builder.Services.AddCors(options => options.AddPolicy("CorsForLocalHost", builder =>
{
    builder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
}));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsForLocalHost");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();