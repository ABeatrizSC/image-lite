package io.github.abeatrizsc.imageliteapi.domain.service;

import io.github.abeatrizsc.imageliteapi.domain.AccessToken;
import io.github.abeatrizsc.imageliteapi.domain.entity.User;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
