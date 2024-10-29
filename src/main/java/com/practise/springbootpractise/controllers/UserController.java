package com.practise.springbootpractise.controllers;

import java.util.*;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practise.springbootpractise.dao.UserPostRepository;
import com.practise.springbootpractise.dao.UserRepository;
import com.practise.springbootpractise.entities.User;
import com.practise.springbootpractise.entities.UserPost;
import com.practise.springbootpractise.services.JWTService;
import com.practise.springbootpractise.services.UserServices;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPostRepository userPostRepo;

    @Autowired
    private UserServices userServices;


    @Autowired
    private JWTService jwtService;

    @PostMapping("/saveUser")
    @CrossOrigin
    public ResponseEntity<User> saveUser(@RequestBody User Ruser) {
        return ResponseEntity.ok(userServices.register(Ruser));
    }

    @PostMapping("/postblog")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public String saveUser(@RequestBody UserPost userpost) {
        UserPost userblog = new UserPost();
        userblog.setUserpost(userpost.getUserpost());
        userblog.setUsername(userpost.getUsername());
        userPostRepo.save(userblog);
        return "/blogPage";
    }

    @PostMapping("/loginUser")
    @CrossOrigin
    public HashMap<String, String> login(@RequestBody User user) {
        System.out.println("UserName from postman is : " + user.getUserName() +
                " Password is : " + user.getUserPassword());
        String user_token = userServices.verify(user);
        HashMap<String, String> map = new HashMap<>();
        String userEmail = userRepository.findByUserName(user.getUserName()).getUserEmail();
        map.put("authToken", user_token);
        map.put("UserName", user.getUserName());
        map.put("UserEmail", userEmail);
        map.put("UserID", String.valueOf(user.getId()));
        return map;
    }

    @GetMapping("/getallposts")
    @CrossOrigin
    public ResponseEntity<List<UserPost>> getAllPosts() {
        List<UserPost> posts = userPostRepo.findAll();
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/updatePost")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public ResponseEntity<UserPost> updatePost(@RequestBody UserPost updatedPost, @RequestHeader("Authorization") String token) {
        Optional<UserPost> optionalUserPost = userPostRepo.findById(updatedPost.getId());
        System.out.println("Updated post in userpost is : " + updatedPost.getId());
        
        if (optionalUserPost.isPresent()) {
            UserPost existingUserPost = optionalUserPost.get();
            String username_from_token = jwtService.extractUserName(token);
            String username_from_post = existingUserPost.getUsername();
    
            if (username_from_token.equals(username_from_post)) {
                BeanUtils.copyProperties(updatedPost, existingUserPost, "id");
                UserPost savedUserPost = userPostRepo.save(existingUserPost);
                return ResponseEntity.ok(savedUserPost);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PutMapping("/updateEmail")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public User updateEmail(@RequestBody User user) {
        User user2 = null;
        user2 = userRepository.findByUserName(user.getUserName());
        user2.setUserEmail(user.getUserEmail());
        userRepository.save(user2);
        return user2;
    }

    @PutMapping("/updatePassword")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public ResponseEntity<User> updatePassword(@RequestBody User user) {
        User user2 = null;
        user2 = userRepository.findByUserName(user.getUserName());
        user2.setUserPassword(user.getUserPassword());
        return ResponseEntity.ok(userServices.register(user2));
    }

    @PostMapping("/checkquestionAndanswer")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public ResponseEntity<?> checkquestionAndanswer(@RequestBody User user) {
        System.out.println("MyCurrentUser is : " + user.getUserName() + " "
                + user.getUserQuestion() + "  " + user.getUserAnswer());

        User user2 = userRepository.findByUserName(user.getUserName());

        if (user2 != null) {
            if (user.getUserQuestion().equals(user2.getUserQuestion()) &&
                    user.getUserAnswer().equals(user2.getUserAnswer())) {
                return ResponseEntity.ok(user2);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect question or answer.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @DeleteMapping("/{postid}/deletePost")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public ResponseEntity<?> deleteUserPost(@PathVariable int postid) {
        Optional<UserPost> userPostOptional = userPostRepo.findById(postid);
        System.out.println("USerpost id is : " + postid);
        if (userPostOptional.isPresent()) {
            UserPost userPost = userPostOptional.get();
            userPostRepo.delete(userPost);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/checkOldPassword")
    @CrossOrigin(origins = { "http://localhost:5173/" })
    public ResponseEntity<?> checkOldPassword(@RequestBody User user) {

        System.out.println("I am Checking Old Password : "
                + user.getUserName() + "  " + user.getUserPassword());
        String status = userServices.CheckOldPass(user);
        if(status.equals("Success")){
            return ResponseEntity.ok(user);
        }
        else 
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }

    @GetMapping("/checkAuthentication")
    public String getMethodName() {
        return "Success";
    }

}
