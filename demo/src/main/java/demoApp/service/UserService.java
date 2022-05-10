package demoApp.service;

import demoApp.configuration.registration.EmailService;
import demoApp.model.User;
import demoApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service(value = "userService")
public class UserService implements UserDetailsService, UserInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findUserByEmail(username);
        if(user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        for(String roles: user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(roles));
        }

        UserDetails userDetails = new org.springframework.security.core.userdetails.
                User(user.getEmail(), user.getPassword(), authorities);

        return userDetails;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findUserByEmail(String email) {
        List<User> allUsers = userRepository.findAll();

        for(User user : allUsers) {
            if(user.getEmail().equals(email)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User insertUser(User user) {
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
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

        return userRepository.save(user);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByConfirmationToken(String token) {
        List<User> allUsers = userRepository.findAll();

        for(User user : allUsers) {
            if (!user.isEnabled()) {
                if (user.getConfirmationToken().equals(token)) {
                    user.setEnabled(true);
                    return user;
                }
            }
        }
        return null;
    }
    @Override
    public void delete(Integer id) {
        this.userRepository.deleteById(id);
    }

}
