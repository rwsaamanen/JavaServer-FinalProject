package rasmus.java.server.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users") 
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        if (users.isEmpty()) 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
        else 
            return ResponseEntity.ok(users);
        
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User userLoginRequest) {
        User user = userService.getUserByUsernameAndPassword(userLoginRequest.getUsername(), userLoginRequest.getPassword());

        if (user != null) {
            String token = JwtGenerator.generateJWT(user.getUsername()); // Generate JWT token
            ApiResponse response = new ApiResponse(true, "Login successful");

            response.setToken(token);
            response.setRole(user.getRole());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "Invalid username or password"));
        }
    }

    @PostMapping("/register") 
    public ResponseEntity<ApiResponse> register(@RequestBody User newUserRequest) {

        if (userService.doesUserExist(newUserRequest.getUsername())) 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Username already exists"));

        User newUser = new User(newUserRequest.getUsername(), newUserRequest.getPassword());
        
        newUser.setRole("user"); 
        userService.saveUser(newUser);

        return ResponseEntity.ok(new ApiResponse(true, "Registration successful"));
    }

    @DeleteMapping("/users/{id}") 
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/users/{userId}/role/{newRole}")
    public ResponseEntity<String> changeUserRole(@PathVariable("userId") String userId, @PathVariable("newRole") String newRole) {
        userService.changeUserRole(userId, newRole);
        return ResponseEntity.ok("User role updated successfully");
    }

}
