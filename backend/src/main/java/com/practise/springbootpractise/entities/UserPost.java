package com.practise.springbootpractise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "blogpostdb25")
public class UserPost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public UserPost() {
    }

    @Column(name = "userpostblog")
    private String userpost;

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    @Column(name = "username")
    private String username;

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", userpost='" + getUserpost() + "'" +
            ", username='" + getUsername() + "'" +
            "}";
    }
    
   

    public UserPost(int id, String userpost, String username) {
        this.id = id;
        this.userpost = userpost;
        this.username = username;
    }



    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserpost() {
        return this.userpost;
    }

    public void setUserpost(String userpost) {
        this.userpost = userpost;
    }


}
