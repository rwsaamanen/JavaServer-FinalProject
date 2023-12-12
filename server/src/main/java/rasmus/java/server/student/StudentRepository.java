package rasmus.java.server.student;

import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository <Student, String> {}
