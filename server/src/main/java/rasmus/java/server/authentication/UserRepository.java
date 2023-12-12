package rasmus.java.server.authentication;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository <User, String> {

    User findByUsernameAndPassword(String username, String password);
    void deleteById(String id);

    Optional<User> findById(String id);

    @Query("SELECT MAX(u.id) FROM User u")
    String findMaxId();
    boolean existsByUsername(String username);
}
