package rasmus.java.server.student;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Student {

	@Id
	private String studentID;
	private String firstname;
	private String lastname;
	private String email;
	
	public Student() {}
	
	public Student(String inputID, String inputFirstName, String inputLastName, String inputEmail) {
		studentID = inputID;
		firstname = inputFirstName;
		lastname = inputLastName;
		email = inputEmail;
	}

	// Getters and setters.
	
	public String getId() {
		return studentID;
	}
	public void setId(String studentID) {
		this.studentID = studentID;
	}
	public String getFirstName() {
		return firstname;
	}
	public void setFirstName(String firstname) {
		this.firstname = firstname;
	}
	public String getLastName() {
		return lastname;
	}
	public void setLastName(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
