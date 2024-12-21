package com.project.taskmanager.service;

import com.project.taskmanager.model.Register;
import com.project.taskmanager.repository.RegisterRepository;
import com.project.taskmanager.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String authenticate(String email, String password) {
        Register user = registerRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        return jwtTokenProvider.generateToken(user.getId().toString());
    }
}
