package demoApp.User;

import java.util.List;

public interface UserServiceInterface {

    List<User> findAllUsers();
    User findUserById(Integer id);
    User findUserByEmail(String email);
    User insertUser(User user);
    User saveUser(User user);
    User findByConfirmationToken(String token);



}
