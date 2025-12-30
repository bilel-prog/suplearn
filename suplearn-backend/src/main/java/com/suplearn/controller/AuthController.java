package com.suplearn.controller;

import com.suplearn.model.User;
import com.suplearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            if (userService.existsByUsername(user.getUsername())) {
                return ResponseEntity
                    .badRequest()
                    .body(createResponse(false, "Username already exists"));
            }
            
            if (userService.existsByEmail(user.getEmail())) {
                return ResponseEntity
                    .badRequest()
                    .body(createResponse(false, "Email already exists"));
            }
            
            User savedUser = userService.registerUser(user);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createResponse(true, "User registered successfully", savedUser));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createResponse(false, "Registration failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        // TODO: Implement JWT authentication
        // For now, simple username check
        return userService.findByUsername(username)
            .map(user -> {
                if (user.getIsActive()) {
                    return ResponseEntity.ok(createResponse(true, "Login successful", user));
                } else {
                    return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(createResponse(false, "Account is inactive"));
                }
            })
            .orElse(ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(createResponse(false, "Invalid credentials")));
    }
    
    private Map<String, Object> createResponse(boolean success, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", message);
        return response;
    }
    
    private Map<String, Object> createResponse(boolean success, String message, Object data) {
        Map<String, Object> response = createResponse(success, message);
        response.put("data", data);
        return response;
    }
}
