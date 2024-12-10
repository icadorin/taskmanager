package com.project.taskmanager.controller;

import com.project.taskmanager.dto.RegisterDTO;
import com.project.taskmanager.exception.EmailAlreadyInUseException;
import com.project.taskmanager.model.Register;
import com.project.taskmanager.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO) {
        try {
            Register register = new Register(registerDTO.getEmail(), registerDTO.getPassword());
            Register savedRegister = registerService.createRegister(register, registerDTO.getConfirmPassword());
            return ResponseEntity.ok(savedRegister);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @ExceptionHandler(EmailAlreadyInUseException.class)
    public ResponseEntity<String> handleEmailAlreadyInUseException(EmailAlreadyInUseException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}
