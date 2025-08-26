// package com.examly.springapp.controller;

// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.examly.springapp.Security.JwtUtil;
// import com.examly.springapp.dto.LoginRequest;
// import com.examly.springapp.model.Notification;
// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import com.examly.springapp.service.UserService;

// @RestController
// @RequestMapping("/user")
// public class UserController {
//    @Autowired
//     UserService us;
//     @Autowired
//     UserRepository ur;
//     @PostMapping("/register")
//     public ResponseEntity<User>Register(@RequestBody User u)
//     {
//         User created=us.Register(u);
//         return ResponseEntity.ok(created);
//     }

// // @PostMapping("/login")
// // public ResponseEntity<?> login(@RequestBody LoginRequest request) {
// //     try {
// //         if (request.getEmail() == null || request.getPassword() == null) {
// //             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
// //                     .body(Map.of("message", "Email and password are required"));
// //         }

// //         User user = ur.findByEmail(request.getEmail())
// //                 .orElseThrow(() -> new RuntimeException("Invalid credentials"));

// //         if (!user.getPassword().equals(request.getPassword())) {
// //             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
// //                     .body(Map.of("message", "Invalid credentials"));
// //         }

// //         return ResponseEntity.ok(Map.of(
// //             "message", "Login successful",
// //             "id", user.getId(),
// //             "role", user.getRole().name(),
// //             "email", user.getEmail()
// //         ));
// //     } catch (Exception e) {
// //         e.printStackTrace(); // <-- This prints the real error in your console
// //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
// //                 .body(Map.of("message", "Unexpected error: " + e.getMessage()));
// //     }
// // }




// //     @PostMapping("/admin/login")
// // public ResponseEntity<String> adminLogin(@RequestBody User user) {
// //     boolean isAdminAuthenticated = us.authenticateAdmin(user.getEmail(), user.getPassword());
// //     if (isAdminAuthenticated) {
// //         return ResponseEntity.ok("Admin login successful");
// //     } else {
// //         return ResponseEntity.status(401).body("Invalid admin credentials");
// //     }
// // }

// @Autowired
// private JwtUtil jwtUtil;

// @PostMapping("/login")
// public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//     try {
//         if (request.getEmail() == null || request.getPassword() == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                     .body(Map.of("message", "Email and password are required"));
//         }

//         User user = ur.findByEmail(request.getEmail())
//                 .orElseThrow(() -> new RuntimeException("Invalid credentials"));

//         if (!user.getPassword().equals(request.getPassword())) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                     .body(Map.of("message", "Invalid credentials"));
//         }

//         // ✅ Generate JWT token
//         String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

//         return ResponseEntity.ok(Map.of(
//             "message", "Login successful",
//             "token", token,
//             "id", user.getId(),
//             "role", user.getRole().name(),
//             "email", user.getEmail()
//         ));
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body(Map.of("message", "Unexpected error: " + e.getMessage()));
//     }
// }

// @PostMapping("/agent/login")
// public ResponseEntity<?> agentLogin(@RequestBody LoginRequest request) {
//     try {
//         if (request.getEmail() == null || request.getPassword() == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                     .body(Map.of("message", "Email and password are required"));
//         }

//         User user = ur.findByEmail(request.getEmail())
//                 .orElseThrow(() -> new RuntimeException("Invalid credentials"));

//         if (!user.getPassword().equals(request.getPassword())) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                     .body(Map.of("message", "Invalid credentials"));
//         }

//         // ✅ Ensure only Agents can log in from this endpoint
//         if (!"Agent".equalsIgnoreCase(user.getRole().name())) {
//             return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                     .body(Map.of("message", "Access denied: Not an Agent"));
//         }

//         // ✅ Generate JWT token
//         String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

//         return ResponseEntity.ok(Map.of(
//             "message", "Agent login successful",
//             "token", token,
//             "id", user.getId(),
//             "role", user.getRole().name(),
//             "email", user.getEmail()
//         ));
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body(Map.of("message", "Unexpected error: " + e.getMessage()));
//     }
// }


//    @PostMapping("/admin/login")
// public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
//     try {
//         if (request.getEmail() == null || request.getPassword() == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                     .body(Map.of("message", "Email and password are required"));
//         }

//         User user = ur.findByEmail(request.getEmail())
//                 .orElseThrow(() -> new RuntimeException("Invalid credentials"));

//         if (!user.getPassword().equals(request.getPassword())) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                     .body(Map.of("message", "Invalid credentials"));
//         }

//         // ✅ Allow only Admin role
//         if (!"Admin".equalsIgnoreCase(user.getRole().name())) {
//             return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                     .body(Map.of("message", "Access denied: Not an Admin"));
//         }

//         // ✅ Generate JWT token
//         String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

//         return ResponseEntity.ok(Map.of(
//             "message", "Admin login successful",
//             "token", token,
//             "id", user.getId(),
//             "role", user.getRole().name(),
//             "email", user.getEmail()
//         ));
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body(Map.of("message", "Unexpected error: " + e.getMessage()));
//     }
// }

//    @GetMapping("/getById/{id}")
//    public ResponseEntity<User>getUserById(@PathVariable long id)
//    {
//     Optional<User> user=us.getUserById(id);
//     if(user.isPresent())
//     {
//         return ResponseEntity.ok(user.get());
//     }
//     else
//     {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//     }
//    }
//     @GetMapping
// public ResponseEntity<?> getAllUsers() {
//     try {
//         List<User> users = us.getAllUsers();
//         return ResponseEntity.ok(users);
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                              .body(new ErrorMessage("Unexpected error: " + e.getMessage()));
//     }
// }

//   @PutMapping("/update/{id}")
// public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User updatedUser) {
//     try {
//         User result = us.update(id, updatedUser);
//         if (result != null) {
//             return ResponseEntity.ok(result);
//         } else {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//         }
//     } catch (Exception e) {
//         e.printStackTrace(); 
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                              .body(null); 
//     }
// }


//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String>deleteUser(@PathVariable long id,@RequestParam String role)
//    {
//     String result=us.delete(id,role);
//     if(result.equals("Access denied:Admin only"))
//     {
//         return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
//     }
//     else
//     {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
//     }
//    }
   
// private static class ErrorMessage {
//     public String message;

//     public ErrorMessage(String message) {
//         this.message = message;
//     }
// }
// @GetMapping("/getByRole")
// public ResponseEntity<?> getUsersByRole(@RequestParam(required = false) String role) {
//     try {
//         List<User> users;
//         if (role != null && !role.isEmpty()) {
//             users = us.getUsersByRole(role);  // <-- We’ll create this in UserService
//         } else {
//             users = us.getAllUsers();
//         }
//         return ResponseEntity.ok(users);
//     } catch (Exception e) {
//         e.printStackTrace();
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body(new ErrorMessage("Unexpected error: " + e.getMessage()));
//     }
// }


// }


package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Security.JwtUtil;
import com.examly.springapp.dto.LoginRequest;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
   @Autowired
    UserService us;
    @Autowired
    UserRepository ur;
    @PostMapping("/register")
    public ResponseEntity<User>Register(@RequestBody User u)
    {
        User created=us.register(u);
        return ResponseEntity.ok(created);
    }

// @PostMapping("/login")
// public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//     try {
//         if (request.getEmail() == null || request.getPassword() == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                     .body(Map.of("message", "Email and password are required"));
//         }

//         User user = ur.findByEmail(request.getEmail())
//                 .orElseThrow(() -> new RuntimeException("Invalid credentials"));

//         if (!user.getPassword().equals(request.getPassword())) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                     .body(Map.of("message", "Invalid credentials"));
//         }

//         return ResponseEntity.ok(Map.of(
//             "message", "Login successful",
//             "id", user.getId(),
//             "role", user.getRole().name(),
//             "email", user.getEmail()
//         ));
//     } catch (Exception e) {
//         e.printStackTrace(); // <-- This prints the real error in your console
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body(Map.of("message", "Unexpected error: " + e.getMessage()));
//     }
// }

@Autowired
JwtUtil jwtUtil;
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    System.out.println("Login attempt for email: " + request.getEmail());
    
    if(request.getEmail() == null || request.getPassword() == null){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message","Email and password are required"));
    }

    Optional<User> optionalUser = ur.findByEmail(request.getEmail());
    if(optionalUser.isEmpty()) {
        System.out.println("User not found: " + request.getEmail());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message","Invalid credentials"));
    }
    
    User user = optionalUser.get();
    System.out.println("Found user: " + user.getEmail() + ", role: " + user.getRole());
    
    if(!user.getPassword().equals(request.getPassword())) {
        System.out.println("Password mismatch for user: " + user.getEmail());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message","Invalid credentials"));
    }
    
    try {
        // ✅ Generate JWT token
        System.out.println("Attempting to generate token...");
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        System.out.println("Token generated successfully: " + (token != null ? "YES" : "NO"));
        System.out.println("Token length: " + (token != null ? token.length() : 0));
        
        if (token == null || token.isEmpty()) {
            System.out.println("ERROR: Token is null or empty!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Token generation failed"));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("id", user.getId());
        response.put("role", user.getRole().name());
        response.put("email", user.getEmail());
        
        System.out.println("Sending response with token: " + token.substring(0, Math.min(20, token.length())) + "...");
        
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        System.err.println("Token generation error: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Token generation failed: " + e.getMessage()));
    }
}

@PostMapping("/agent/login")
public ResponseEntity<?> agentLogin(@RequestBody LoginRequest request) {
    try {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email and password are required"));
        }

        User user = ur.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }

        // ✅ Ensure only Agents can log in from this endpoint
        if (!"Agent".equalsIgnoreCase(user.getRole().name())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Access denied: Not an Agent"));
        }

        // ✅ Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return ResponseEntity.ok(Map.of(
            "message", "Agent login successful",
            "token", token,
            "id", user.getId(),
            "role", user.getRole().name(),
            "email", user.getEmail()
        ));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Unexpected error: " + e.getMessage()));
    }
}


   @PostMapping("/admin/login")
public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
    try {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email and password are required"));
        }

        User user = ur.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials"));
        }

        // ✅ Allow only Admin role
        if (!"Admin".equalsIgnoreCase(user.getRole().name())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Access denied: Not an Admin"));
        }

        // ✅ Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return ResponseEntity.ok(Map.of(
            "message", "Admin login successful",
            "token", token,
            "id", user.getId(),
            "role", user.getRole().name(),
            "email", user.getEmail()
        ));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Unexpected error: " + e.getMessage()));
    }
}


   @GetMapping("/getById/{id}")
   public ResponseEntity<User>getUserById(@PathVariable long id)
   {
    Optional<User> user=us.getUserById(id);
    if(user.isPresent())
    {
        return ResponseEntity.ok(user.get());
    }
    else
    {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
   }
    @GetMapping
public ResponseEntity<?> getAllUsers() {
    try {
        List<User> users = us.getAllUsers();
        return ResponseEntity.ok(users);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(new ErrorMessage("Unexpected error: " + e.getMessage()));
    }
}

  @PutMapping("/update/{id}")
public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User updatedUser) {
    try {
        User result = us.update(id, updatedUser);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    } catch (Exception e) {
        e.printStackTrace(); 
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(null); 
    }
}


   @DeleteMapping("/delete/{id}")
   public ResponseEntity<String>deleteUser(@PathVariable long id,@RequestParam String role)
   {
    String result=us.delete(id,role);
    if(result.equals("Access denied:Admin only"))
    {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    }
    else
    {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
    }
   }
   
private static class ErrorMessage {
    public String message;

    public ErrorMessage(String message) {
        this.message = message;
    }
}
@GetMapping("/getByRole")
public ResponseEntity<?> getUsersByRole(@RequestParam(required = false) String role) {
    try {
        List<User> users;
        if (role != null && !role.isEmpty()) {
            users = us.getUsersByRole(role);  // <-- We’ll create this in UserService
        } else {
            users = us.getAllUsers();
        }
        return ResponseEntity.ok(users);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorMessage("Unexpected error: " + e.getMessage()));
    }
}


// @PostMapping("/registration")
// public ResponseEntity<User> registerUser(@RequestBody User u) {
//     User created = us.register(u);  // <-- use the updated method name here
//     return ResponseEntity.ok(created);
// }

}
