package com.practise.springbootpractise.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.practise.springbootpractise.dao.UserRepository;
import com.practise.springbootpractise.entities.User;

@Service
public class UserServices {
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    UserRepository userrepo;

    @Autowired
    JWTService jwtservice;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User register(User user) {
        user.setUserPassword(encoder.encode(user.getUserPassword()));
        return userrepo.save(user);
    }

    public String verify(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getUserName(),
                user.getUserPassword()));

        if (authentication.isAuthenticated())
            return jwtservice.generateToken(user.getUserName());
        else
            return null;
    }

    public String CheckOldPass(User current_user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                current_user.getUserName(),
                current_user.getUserPassword()));
       if(authentication.isAuthenticated()){
        return "Success";
       }
       else return "Failure";
    }
}
