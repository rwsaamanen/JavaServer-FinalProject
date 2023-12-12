package rasmus.java.server.authentication;

public class ApiResponse {
    private boolean success;
    private String message;
    private String token;
    private String role;

    public void setToken(String token) {
        this.token = token;
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.token = null;
        this.role = null;
    }

    // Getters and Setters.

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
