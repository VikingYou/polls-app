package com.example.polls.repository;

import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author ycd20
 * @date 23/02/2022
 * @time 12:12
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName roleName);
}
