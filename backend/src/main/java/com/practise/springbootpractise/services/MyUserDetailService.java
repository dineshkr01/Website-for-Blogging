package com.practise.springbootpractise.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.practise.springbootpractise.dao.UserRepository;
import com.practise.springbootpractise.entities.User;
import com.practise.springbootpractise.entities.UserPrincipal;



@Service
public class MyUserDetailService implements UserDetailsService{

    @Autowired 
    UserRepository userrepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userrepo.findByUserName(username);
        System.out.println("Username in UserDetails is : " + username);
        if(user == null){
            System.out.println("User Not Found !!");
            throw new UsernameNotFoundException("User Not Found !!!");
        }
        return new UserPrincipal(user);
    }
}
