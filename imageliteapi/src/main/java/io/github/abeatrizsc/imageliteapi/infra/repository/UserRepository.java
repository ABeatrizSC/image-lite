package io.github.abeatrizsc.imageliteapi.infra.repository;

import io.github.abeatrizsc.imageliteapi.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
