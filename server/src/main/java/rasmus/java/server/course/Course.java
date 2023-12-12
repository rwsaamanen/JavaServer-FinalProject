package rasmus.java.server.course;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Course {

    @Id
    private String courseID;
    @Column(name = "name")
    private String name;
    @Column(name = "TEACHERNAME")
    private String teacherName;

    public Course() {}

    public Course(String inputID, String inputCourseName, String inputTeacherName) {
        courseID = inputID;
        name = inputCourseName;
        teacherName = inputTeacherName;
    }

    // Getters and Setters.

    public String getId() {
        return courseID;
    }
    public void setId(String courseID) {
        this.courseID = courseID;
    }
    public String getCourseName() {
        return name;
    }
    public void setCourseName(String name) {
        this.name = name;
    }
    public String getTeacherName() {
        return teacherName;
    }
    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

}
