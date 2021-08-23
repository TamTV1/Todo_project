using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TDP.Web.Base;
using TDP.Web.DatabaseModel.Entites;
using TDP.Web.Repository.Base;
using TDP.Web.Repository.DatabaseModel.Entites;
using TDP.Web.Services.EmpolyeeServs;

namespace TDP.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region config db
            services.AddDbContext<ToDoDbContext>(options => options
                .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<Func<ToDoDbContext>>((provider) => () => provider.GetService<ToDoDbContext>());
            services.AddScoped<DbFactory>();
            #endregion

            #region auto mapper
            var mapper = AutoMapperConfig.Initialize();
            services.AddSingleton(mapper);
            #endregion

            #region Seria Logger
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();

            LoggerFactory loggerFactory = new LoggerFactory();
            loggerFactory.AddSerilog();

            services.AddSingleton<ILoggerFactory>(loggerFactory);
            #endregion

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TDP.Web", Version = "v1" });
            });

            #region declare Repos 
            services.AddHttpContextAccessor();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IEmployeeRepos, EmployeeRepos>();
            #endregion

            #region declare service 
            services.AddScoped<IEmpolyeeServs, EmpolyeeServs>();
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TDP.Web v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
