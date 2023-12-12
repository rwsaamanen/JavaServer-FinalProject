package rasmus.java.server.course;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

@RestController
public class CourseController {
    private final CourseRepository repository;

    public CourseController(CourseRepository cr) { 
        this.repository = cr; 
    }

    @GetMapping("/courses")
    List<Course> getAllCourses() { 
        return (List<Course>) repository.findAll(); 
    }

    @PostMapping("/courses")
    Course addNewCourse(@RequestBody Course course) { 
        return repository.save(course); 
    }

    @GetMapping("/courses/{id}")
    Optional<Course> getOneCourse(@PathVariable String id) { 
        return repository.findById(id); 
    }

    @PutMapping("/courses/{id}")
    Course updateOneCourse(@RequestBody Course newCourse, @PathVariable String id) {
        return repository.findById(id)
                .map(course -> {
                    course.setId(newCourse.getId());
                    course.setCourseName(newCourse.getCourseName());
                    course.setTeacherName(newCourse.getTeacherName());
                    return repository.save(course);
                })
                .orElseGet(() -> {
                    newCourse.setId(id);
                    return repository.save(newCourse);
                });
    }

    @DeleteMapping("/courses/{id}")
    void deleteCourse(@PathVariable String id) {
        repository.deleteById(id);
    }
}






