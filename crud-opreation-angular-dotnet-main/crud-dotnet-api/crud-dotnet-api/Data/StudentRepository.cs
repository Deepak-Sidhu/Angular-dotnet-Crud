using Microsoft.EntityFrameworkCore;

namespace crud_dotnet_api.Data
{
    public class StudentRepository
    {
        private readonly AppDbContext _appDbContext;

        public StudentRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddStudentAsync(Student Student)
        {
            await _appDbContext.Set<Student>().AddAsync(Student);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<Student>> GetAllStudentAsync()
        {
            return await _appDbContext.Students.ToListAsync();
        }
             
        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _appDbContext.Students.FindAsync(id);
        }

        public async Task UpdateStudentAsync(int id,  Student model)
        {
            var Studente = await _appDbContext.Students.FindAsync(id);
            if(Studente == null)
            {
                throw new Exception("Student not found");
            }
            Studente.FirstName= model.FirstName;
            Studente.LastName= model.LastName;
            Studente.Class= model.Class; 
            Studente.Subject=model.Subject;
            Studente.Marks = model.Marks;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteStudentAsnyc(int id)
        {
            var Studente = await _appDbContext.Students.FindAsync(id);
            if (Studente == null)
            {
                throw new Exception("Student not found");
            }
            _appDbContext.Students.Remove(Studente);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
