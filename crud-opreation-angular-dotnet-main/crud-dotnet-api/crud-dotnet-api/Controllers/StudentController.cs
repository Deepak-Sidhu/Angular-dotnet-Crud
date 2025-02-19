using crud_dotnet_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace crud_dotnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentRepository _studentRepository;

        public StudentController(StudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpPost]
        public async Task<ActionResult> Addstudent([FromBody] Student model)
        {
            await _studentRepository.AddStudentAsync(model);
            return Ok();
        }

        [HttpGet]
        
        public async Task<ActionResult> GetstudentList()
        {
            var studentList =await  _studentRepository.GetAllStudentAsync();
            return Ok(studentList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetstudentById([FromRoute] int id)
        {
            var student = await _studentRepository.GetStudentByIdAsync(id);
            return Ok(student);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Updatestudent([FromRoute] int id, [FromBody] Student model)
        {
            await _studentRepository.UpdateStudentAsync(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletestudent([FromRoute] int id)
        {
            await _studentRepository.DeleteStudentAsnyc(id);
            return Ok();
        }
    }
}
