using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace world_netcore.Controllers
{
    [ApiController]
    [Route("api")]
    public class HelloWorldController : ControllerBase
    {       
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IConfiguration configuration;

        public HelloWorldController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            this.httpClientFactory = httpClientFactory;
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("basic")]
        public IActionResult GetBasic()
        {
            return Ok("Hello World from NetCore");
        }

        [HttpGet]        
        [Route("full")]
        public async Task<IActionResult> GetFull()
        {
            string endPoint = $"http://{this.configuration["AppSettings:remoteApi"]}/basic";

            var httpRequest = new HttpRequestMessage(HttpMethod.Get, endPoint);

            HttpClient client = this.httpClientFactory.CreateClient();
            HttpResponseMessage httpResponse = await client.SendAsync(httpRequest);

            if (httpResponse.IsSuccessStatusCode){
                string result = await httpResponse.Content.ReadAsStringAsync();
                return Ok($"{result} and NetCore!!");
            }

            return BadRequest("Something went wrong");
        }
    }
}
