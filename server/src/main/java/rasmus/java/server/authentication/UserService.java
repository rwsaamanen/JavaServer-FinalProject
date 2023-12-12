package rasmus.java.server.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        Iterable<User> usersIterable = userRepository.findAll();
        List<User> userList = new ArrayList<>();
        usersIterable.forEach(userList::add);
        return userList;
    }

    public User getUserByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public boolean doesUserExist(String id) {
        return userRepository.existsById(id);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public void saveUser(User user) {
        String nextAvailableId = getNextAvailableId();
        user.setId(nextAvailableId);

        userRepository.save(user);
    }

    private String getNextAvailableId() {
        String maxId = userRepository.findMaxId();

        int nextId = 1; 

        if (maxId != null) {
            int maxIdInt = Integer.parseInt(maxId);
            nextId = maxIdInt + 1;
        }

        return String.valueOf(nextId);
    }

    public void changeUserRole(String userId, String newRole) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setRole(newRole);
            userRepository.save(user);
        } else {
            // User not found
        }
    }

}
