package com.practise.springbootpractise.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practise.springbootpractise.entities.User;
import com.practise.springbootpractise.entities.UserPost;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUserEmailAndUserPassword(String userEmail, String userPassword);

    User findByUserName(String userName);

    void save(UserPost user);
}