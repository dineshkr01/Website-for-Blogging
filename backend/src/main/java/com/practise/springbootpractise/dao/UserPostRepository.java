package com.practise.springbootpractise.dao;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practise.springbootpractise.entities.UserPost;


@Repository
public interface UserPostRepository extends JpaRepository<UserPost , Integer> {
    Optional<UserPost> findById(Integer id);
}
