package com.practise.springbootpractise.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.practise.springbootpractise.dao.UserPostRepository;
import com.practise.springbootpractise.dao.UserRepository;
import com.practise.springbootpractise.entities.User;
import com.practise.springbootpractise.entities.UserPost;

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPostRepository userPostRepo;

    @PostMapping("/saveUser")
    public String saveUser(@RequestParam String userName, @RequestParam String userEmail,
            @RequestParam String userPassword, @RequestParam String userQuestion, @RequestParam String userAnswer) {
        User user = new User();
        user.setUserName(userName);
        user.setUserEmail(userEmail);
        user.setUserPassword(userPassword);
        user.setUserQuestion(userQuestion);
        user.setUserAnswer(userAnswer);
        userRepository.save(user);
        return "/home";
    }

    @PostMapping("/postblog")
    public String saveUser(@RequestBody UserPost userpost) {
        UserPost userblog = new UserPost();
        userblog.setUserpost(userpost.getUserpost());
        userblog.setUsername(userpost.getUsername());
        userPostRepo.save(userblog);
        return "/blogPage";
    }

    @RequestMapping("/loginUser")
    public ResponseEntity<User> login(@RequestParam String userName,
            @RequestParam String userPassword, Model model) {
        String username = userName;
        String password = userPassword;

        User user2 = null;
        user2 = userRepository.findByUserName(username);
        String user2password = user2.getUserPassword();
        if (password.equals(user2password)) {
            return ResponseEntity.ok(user2);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    // @PostMapping("/generatetoken")
    // public ResponseEntity<String> generatetoken(@RequestBody User user) {
    // String username = user.getUserName();
    // JwtHelper tokenobj = new JwtHelper();
    // String token = tokenobj.generateToken(username);
    // return ResponseEntity.ok(token);
    // }

    @GetMapping("/getallposts")
    public ResponseEntity<List<UserPost>> getAllPosts() {
        List<UserPost> posts = userPostRepo.findAll();
        return ResponseEntity.ok(posts);
    }

    // @GetMapping("/getuserposts")
    // public ResponseEntity<List<UserPost>> getuserposts() {
    // List<UserPost> posts = userPostRepo.findAll();
    // return ResponseEntity.ok(posts);
    // }

    // @PostMapping("/loginUserviaToken")
    // public ResponseEntity<User> loginUserviaToken(@RequestBody Token token) {
    // String tokenval = token.getToken();
    // JwtHelper jwthelper = new JwtHelper();
    // User user2 = null;
    // user2 = userRepository.findByUserName(jwthelper.getUsername(tokenval));
    // System.out.println("Your toen is :# " + tokenval);
    // return ResponseEntity.ok(user2);
    // }

    // @PutMapping("/{userame}")
    // public ResponseEntity<User> updateuser(@RequestBody User user) {
    // User user2 = null;
    // user2 = userRepository.findByUserName(user.getUserName());
    // System.out.println("Sended email is :" + user.getUserEmail());
    // user2.setUserEmail(user.getUserEmail());
    // System.out.println("Updated email is : " + user2.getUserEmail());
    // userRepository.save(user2);
    // return ResponseEntity.ok(user2);
    // }

    @PutMapping("/users/{id}/updatePost")
    public ResponseEntity<UserPost> updatepost(@PathVariable Integer id, @RequestBody UserPost updatedUser) {
        Optional<UserPost> optionalUserPost = userPostRepo.findById(id);
        if (optionalUserPost.isPresent()) {
            UserPost existingUserPost = optionalUserPost.get();
            existingUserPost.setUserpost(updatedUser.getUserpost());
            UserPost savedUserPost = userPostRepo.save(existingUserPost);
            return ResponseEntity.ok(savedUserPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/users/{userEmail}/email")
    public ResponseEntity<User> updateEmail(@PathVariable String userEmail, @RequestBody User user) {
        User user2 = null;
        user2 = userRepository.findByUserName(user.getUserName());
        user2.setUserPassword(userEmail);
        userRepository.save(user2);
        return ResponseEntity.ok(user2);
    }

    @PutMapping("/users/{userPassword}/password")
    public ResponseEntity<User> updatePassword(@PathVariable String userPassword, @RequestBody User user) {
        User user2 = null;
        user2 = userRepository.findByUserName(user.getUserName());
        user2.setUserPassword(userPassword);
        userRepository.save(user2);
        return ResponseEntity.ok(user2);
    }

    // @PostMapping("/loginviausername")
    // public ResponseEntity<User> loginviausername(@RequestBody User user) {
    // User user2 = null;
    // user2 = userRepository.findByUserName(user.getUserName());
    // if (user2 != null) {
    // System.out.println("User is going");
    // return ResponseEntity.ok(user2);
    // } else {
    // return ResponseEntity.ok(null);
    // }
    // }

    @DeleteMapping("/users/{id}/deletePost")
    public ResponseEntity<?> deleteUserPost(@PathVariable Integer id) {
        Optional<UserPost> userPostOptional = userPostRepo.findById(id);
        if (userPostOptional.isPresent()) {
            UserPost userPost = userPostOptional.get();
            userPostRepo.delete(userPost);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}