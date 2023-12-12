package rasmus.java.server.student;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

@RestController
public class StudentController {
	private final StudentRepository repository;
	
	public StudentController(StudentRepository sr) { 
		this.repository = sr; 
	}

	@GetMapping("/students")
	List<Student> GetAllStudents() { 
		return (List<Student>) repository.findAll(); 
	}

	@PostMapping("/students")
	Student addNewStudent(@RequestBody Student student) { 
		return repository.save(student); 
	}

	@GetMapping("/students/{id}")
	Optional<Student> getOneStudent(@PathVariable String id) { 
		return repository.findById(id); 
	}

	@PutMapping("/students/{id}")
	Student updateOneStudent(@RequestBody Student newStudent, @PathVariable String id) {
		return repository.findById(id)
				.map(student -> {
					if (newStudent.getEmail() != null) 
						student.setEmail(newStudent.getEmail());
					
					if (newStudent.getFirstName() != null) 
						student.setFirstName(newStudent.getFirstName());
					
					if (newStudent.getLastName() != null) 
						student.setLastName(newStudent.getLastName());

					return repository.save(student);
				})
				.orElseGet(() -> {
					newStudent.setId(id);
					return repository.save(newStudent);
				});
	}

	@DeleteMapping("/students/{id}")
	void deleteStudent(@PathVariable String id) {
		repository.deleteById(id);
	}
}
