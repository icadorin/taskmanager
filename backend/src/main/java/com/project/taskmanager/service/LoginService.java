package com.project.taskmanager.service;

import com.project.taskmanager.model.Register;
import com.project.taskmanager.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private RegisterRepository registerRepository;

    public Register authenticate(String email, String password) {
        return registerRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }
}
