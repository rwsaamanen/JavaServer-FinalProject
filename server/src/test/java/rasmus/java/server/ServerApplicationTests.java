package rasmus.java.server;

import static org.assertj.core.api.Assertions.assertThat;

import rasmus.java.server.authentication.User;
import rasmus.java.server.course.Course;
import rasmus.java.server.course.CourseRepository;
import rasmus.java.server.student.Student;
import rasmus.java.server.student.StudentRepository;
import rasmus.java.server.authentication.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServerApplicationTests {
	@Autowired
    StudentRepository studentRepository;
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	UserRepository userRepository;
	@Test
	void contextLoads() {
	}
    @Test
    void testCreate() {
	}

    @Test
    void testRead() {
	}

    @Test
    void testUpdate() {
	}
}
