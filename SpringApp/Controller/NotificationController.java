package com.examly.springapp.controller;

import com.examly.springapp.model.Notification;
import com.examly.springapp.repository.NotificationRepository;
import com.examly.springapp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
private NotificationRepository notificationRepository;

//     @PostMapping
// public Notification createNotification(@RequestBody Notification notification) {
//     return notificationService.createNotification(notification);
// }

@PostMapping("/add")
public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
    try {
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        return new ResponseEntity<>(notificationService.createNotification(notification), HttpStatus.CREATED);
    } catch (Exception e) {
        e.printStackTrace(); 
        return new ResponseEntity<>("Unexpected error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}




    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Optional<Notification> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }
   
 

    @PatchMapping("/read/{id}")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }
}
