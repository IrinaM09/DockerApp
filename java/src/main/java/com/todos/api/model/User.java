package com.todos.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    String email;
    String password;
    String accessToken;

    public User() {
    }

    public User(String email, String password, String accessToken) {
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
    }
}
