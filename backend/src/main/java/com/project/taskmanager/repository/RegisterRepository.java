package com.project.taskmanager.repository;

import com.project.taskmanager.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Long> {
    Optional<Register> findByEmail(String email);
}
