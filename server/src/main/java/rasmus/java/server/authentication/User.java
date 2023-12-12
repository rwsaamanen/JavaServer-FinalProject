package rasmus.java.server.authentication;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name= "user")
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String role;

    public User() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User(String inputUsername, String inputPassword) {
        username = inputUsername;
        password = inputPassword;
    }

    // Getters and Setters

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
