package com.project.taskmanager.service;

import com.project.taskmanager.exception.EmailAlreadyInUseException;
import com.project.taskmanager.model.Register;
import com.project.taskmanager.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    public Register createRegister(Register register) {
        if (!register.getPassword().equals(register.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match.");
        }

        if (registerRepository.findByEmail(register.getEmail()).isPresent()) {
            throw new EmailAlreadyInUseException("Email already in use.");
        }

        return registerRepository.save(register);
    }
}
