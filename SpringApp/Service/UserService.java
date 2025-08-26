

package com.examly.springapp.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

   private final PasswordEncoder passwordEncoder;
    
    // Only depend on PasswordEncoder, not SecurityConfig
    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    public User register(User user) {
    // Store hashed password
    // user.setPassword(passwordEncoder.encode(user.getPassword()));
     user.setPassword(user.getPassword());
    return userRepository.save(user);
}

public User authenticateUser(String email, String password) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        if (user.getPassword().equals(password)) {
            return user;
        }
    }
    return null;
}

   
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

   
    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

   public User update(long id, User updatedUser) {
    Optional<User> userOptional = userRepository.findById(id);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
           
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        user.setRole(updatedUser.getRole());
        return userRepository.save(user);
    } else {
        return null;
    }
}


    public String delete(long id, String role) {
        if (!"admin".equalsIgnoreCase(role)) {
            return "Access denied: Admins only.";
        }
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.deleteById(id);
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }

    // ✅ Authenticate User for login
//     public User authenticateUser(String email, String password) {
//     Optional<User> userOptional = userRepository.findByEmail(email);
//     if (userOptional.isPresent()) {
//         User user = userOptional.get();
//         System.out.println("👉 DB stored password: " + user.getPassword());
//         System.out.println("👉 Raw password from login: " + password);
//         boolean matches = passwordEncoder.matches(password, user.getPassword());
//         System.out.println("👉 Password match result: " + matches);

//         if (matches) {
//             return user;
//         }
//     }
//     return null;
// }


    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList() 
        );
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

 
    private final String adminEmail = "admin123@gmail.com";
    private final String adminPassword = "123456";

    public boolean authenticateAdmin(String email, String password) {
        String inputEmail = email != null ? email.trim() : "";
        String inputPassword = password != null ? password.trim() : "";
        return inputEmail.equalsIgnoreCase(adminEmail) && inputPassword.equals(adminPassword);
    }
}

