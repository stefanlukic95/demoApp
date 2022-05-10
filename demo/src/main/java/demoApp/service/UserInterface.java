package demoApp.service;

import demoApp.model.User;

import java.util.List;

public interface UserInterface {

    List<User> findAllUsers();
    User findUserById(Integer id);
    User findUserByEmail(String email);
    User insertUser(User user);
    User saveUser(User user);

    User findByConfirmationToken(String token);
    void delete(Integer id);




}
