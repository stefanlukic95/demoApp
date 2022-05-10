package demoApp.controller;

import demoApp.service.UserInterface;
import demoApp.configuration.registration.EmailService;
import demoApp.model.User;
import demoApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserInterface userInterface;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserController(UserService userService) {
        this.userInterface = userService;
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/allUsers",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = userInterface.findAllUsers();
        return new ResponseEntity<List<User>>(allUsers, HttpStatus.OK);
    }

    @RequestMapping(
            value="/userId/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) throws Exception{

        User user = this.userInterface.findUserById(id);
        if(user == null){
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);

    }

    @RequestMapping(
            value = "/register",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<User> insertUser(@RequestBody User user) throws Exception{

        User findUser = userInterface.findUserByEmail(user.getEmail());

        if(findUser != null) {
            System.out.println("Email already in use");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

        User insertedUser = userInterface.insertUser(user);
        return new ResponseEntity<User>(insertedUser, HttpStatus.OK);
    }

    //confirmation token
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/confirm"
    )
    public RedirectView confirm(@RequestParam("token") String confirmationToken){
        User user = userInterface.findByConfirmationToken(confirmationToken);
        userInterface.saveUser(user);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:4200/login");
        return redirectView;
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            value = "/deleteUser/{id}"
    )
    public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id){
        this.userInterface.delete(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/userEmail/{email}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        User user = userInterface.findUserByEmail(email);
        return new ResponseEntity<User>(user,HttpStatus.OK);
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            value = "/userUpdate/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer id, @RequestBody User user) throws Exception{
        User userById = this.userInterface.findUserById(id);

        if(userById == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userById.setName(user.getName());
        userById.setSurname(user.getSurname());
        User updatedUser = this.userInterface.saveUser(userById);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
