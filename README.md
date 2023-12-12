# Java Server Programming Final Project

This Final Project contains simple Font- and Backend. Software is a web application with a simple 
user, student and course management. As a database I have used our schools MariaDB.

## Management system

### Account creation:

* Users can create an account through a signup form, providing a unique username and password.
* Upon signup, a new account is generated in the database with a default role of "user".

### User Roles:

* Users with the "user" role have access to view content stored in the database, such as information about students and courses.
* Those with the "admin" role have additional privileges:
    * Edit and add student and course data.
    * Access a comprehensive list of all registered users in the application.
    * Ability to modify user roles, switching between "admin" and "user" status as needed.

### Role-Based Permissions:

* "User" Role:
    * Access: View-only permissions for content in the database.
* "Admin" Role:
    * Full control: Edit, add, and manage student and course data.
    * Access to a complete user list and the ability to modify user roles.



## Built With

### Front

* React.tsx
* React Routers
* Axios
* Tailwind CSS

### Back

* Java
* Springboot


## Getting Started

### Prerequisites

In client directory run this:

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rwsaamanen/JavaServer-FinalProject.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API's in `application.properties` (server/src/main/resources)
   ```js
   spring.datasource.url='Enter your URL'
   spring.datasource.username='Your username'
   spring.datasource.password='Your password'
   ```

## Contributing

Contributions are not currently accepted or incorporated into the system's functionality.

