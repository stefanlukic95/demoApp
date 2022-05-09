package demoApp.User;

import demoApp.User.registration.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceInterface userServiceInterface;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;


    public UserController(UserServiceInterface userServiceInterface) {
        this.userServiceInterface = userServiceInterface;
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/allUsers",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = userServiceInterface.findAllUsers();

        return new ResponseEntity<List<User>>(allUsers, HttpStatus.OK);
    }

    @RequestMapping(
            value="/user/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) {

        User user = this.userServiceInterface.findUserById(id);
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
    public ResponseEntity<User> insertUser(@RequestBody User user){

        User findUser = userServiceInterface.findUserByEmail(user.getEmail());

        if(findUser != null) {

            System.out.println("Email already in use");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

        user.setEnabled(false);


        user.setConfirmationToken(UUID.randomUUID().toString());


        String appUrl = "http://localhost:8080";

        SimpleMailMessage registrationEmail = new SimpleMailMessage();
        registrationEmail.setTo(user.getEmail());
        registrationEmail.setSubject("Registration Confirmation");
        registrationEmail.setText("To confirm your e-mail address, please click the link below:\n"
                + appUrl + "/confirm?token=" + user.getConfirmationToken());
        registrationEmail.setFrom("poseti.me.isa@gmail.com");
        emailService.sendEmail(registrationEmail);



        User insertedUser = userServiceInterface.insertUser(user);
        return new ResponseEntity<User>(insertedUser, HttpStatus.OK);
    }

    //confirmation token
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/confirm"
    )
    public RedirectView confirm(@RequestParam("token") String confirmationToken){
        User user = userServiceInterface.findByConfirmationToken(confirmationToken);
        user.setEnabled(true);
        userServiceInterface.saveUser(user);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:4200/login");
        return redirectView;
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            value = "/deleteUser/{id}"
    )
    public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id){
        this.userServiceInterface.delete(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }



}
