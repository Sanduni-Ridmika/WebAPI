using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //API method to get department details
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select DepartmentId, DepartmentName from dbo.Department";
            DataTable table = new DataTable();
            string sqlDataSource = _Configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                }
            }

        }
    }
}
