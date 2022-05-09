package demoApp.User;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EncriptionService {


    private final BCryptPasswordEncoder passwordEncoder;


    public EncriptionService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

   public BCryptPasswordEncoder encoder(String password){
        return new BCryptPasswordEncoder();

   }
}
