package com.practise.springbootpractise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "blogsitedb23")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
   
    private int id;

    @Column(name = "username")
    private String userName;

    @Column(name = "email")
    private String userEmail;

    @Column(name = "password")
    private String userPassword;

    @Column(name = "security_question")
    private String userQuestion;

    @Column(name = "security_answer")
    private String userAnswer;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserQuestion() {
        return userQuestion;
    }

    public void setUserQuestion(String userQuestion) {
        this.userQuestion = userQuestion;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", userName='" + getUserName() + "'" +
            ", userEmail='" + getUserEmail() + "'" +
            ", userPassword='" + getUserPassword() + "'" +
            ", userQuestion='" + getUserQuestion() + "'" +
            ", userAnswer='" + getUserAnswer() + "'" +
            "}";
    }

   
}


// CREATE TABLE blogsitedb2 (
//     id INT ,
//     username VARCHAR(255),
//     email VARCHAR(255),
//     password VARCHAR(255),
//     security_question VARCHAR(255),
//     security_answer VARCHAR(255)
// );


// CREATE TABLE UserDataNew (
//     id INT ,
//     username VARCHAR(255),
//     email VARCHAR(255),
//     password VARCHAR(255),
    
// );
