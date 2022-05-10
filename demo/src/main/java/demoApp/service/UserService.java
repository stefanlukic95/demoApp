package demoApp.service;

import demoApp.model.User;
import demoApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service(value = "userService")
public class UserService implements UserDetailsService, UserInterface {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = findUserByEmail(s);
        if(user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        for(String r: user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(r));
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

        for(User u : allUsers) {
            if(u.getEmail().equals(email)) {
                return u;
            }
        }
        return null;
    }

    @Override
    public User insertUser(User user) {
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User saveUser(User u) {
        return userRepository.save(u);
    }

    @Override
    public User findByConfirmationToken(String token) {
        List<User> allUsers = userRepository.findAll();

        for(User u : allUsers) {
            if (!u.isEnabled()) {
                if (u.getConfirmationToken().equals(token)) {
                    return u;
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
