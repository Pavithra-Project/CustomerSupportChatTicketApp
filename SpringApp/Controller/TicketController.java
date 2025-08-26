package com.examly.springapp.controller;

import com.examly.springapp.dto.*;
import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.User;
import com.examly.springapp.model.Response;
import com.examly.springapp.service.TicketService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@Valid @RequestBody TicketRequestDto dto) {
        Ticket ticket = Ticket.builder()
                .subject(dto.getSubject())
                .description(dto.getDescription())
                .priority(Ticket.TicketPriority.valueOf(dto.getPriority()))
                .createdBy(dto.getCreatedBy())
                .build();
        Ticket saved = ticketService.createTicket(ticket);
        return new ResponseEntity<>(toDto(saved), HttpStatus.CREATED);
    }

    @GetMapping
    public List<TicketDetailsDto> getAllTickets() {
        return ticketService.getAllTickets().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable Long id) {
        Optional<Ticket> ticketOpt = ticketService.getTicketById(id);
        if (ticketOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Ticket not found"));
        }
        return ResponseEntity.ok(toDto(ticketOpt.get()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @Valid @RequestBody TicketStatusUpdateDto dto) {
        // First: check ticket existence
        Optional<Ticket> ticketOpt = ticketService.getTicketById(id);
        if (ticketOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Ticket not found"));
        }
        // Then: check status
        Ticket.TicketStatus status;
        try {
            status = Ticket.TicketStatus.valueOf(dto.getStatus());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorMessage("Invalid status: " + dto.getStatus()));
        }
        // Update
        Ticket updated = ticketService.updateTicketStatus(id, status);
        return ResponseEntity.ok(toDto(updated));
    }

    // @PostMapping("/{ticketId}/responses")
    // public ResponseEntity<?> addResponse(@PathVariable Long ticketId, @Valid @RequestBody ResponseRequestDto dto) {
    //     try {
    //         Response response = Response.builder()
    //             .message(dto.getMessage())
    //             .respondedBy(dto.getRespondedBy())
    //             .build();
    //         Response saved = ticketService.addResponseToTicket(ticketId, response);
    //         return new ResponseEntity<>(toResponseDto(saved), HttpStatus.CREATED);
    //     } catch (EntityNotFoundException ex) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Ticket not found"));
    //     } catch (IllegalArgumentException ex) {
    //         String msg = ex.getMessage() != null ? ex.getMessage().toLowerCase() : "";
    //         if (msg.contains("not found")) {
    //             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Ticket not found"));
    //         }
    //         return ResponseEntity.badRequest().body(new ErrorMessage(ex.getMessage()));
    //     }
    // }

    @PostMapping("/{ticketId}/responses")
public ResponseEntity<?> addResponse(@PathVariable Long ticketId, @Valid @RequestBody ResponseRequestDto dto) {
    try {
        Response response = Response.builder()
            .message(dto.getMessage())
            .respondedBy(dto.getRespondedBy())
            .build();
        ticketService.addResponseToTicket(ticketId, response);

        // Fetch the updated ticket
        Ticket updatedTicket = ticketService.getTicketById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        return new ResponseEntity<>(toDto(updatedTicket), HttpStatus.CREATED);
    } catch (EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Ticket not found"));
    } catch (IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(new ErrorMessage(ex.getMessage()));
    }
}


    @GetMapping("/{ticketId}/responses")
    public ResponseEntity<?> getResponses(@PathVariable Long ticketId) {
        try {
            List<Response> responses = ticketService.getResponsesForTicket(ticketId);
            List<ResponseDetailsDto> responseDtos = responses.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
            return ResponseEntity.ok(responseDtos);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage("Ticket not found"));
        }
    }

    // DTO Conversion helpers
    // private TicketDetailsDto toDto(Ticket ticket) {
    //     List<ResponseDetailsDto> responses = ticket.getResponses() == null ? List.of() :
    //             ticket.getResponses().stream()
    //                     .map(this::toResponseDto)
    //                     .collect(Collectors.toList());
    //     return new TicketDetailsDto(
    //         ticket.getId(),
    //         ticket.getSubject(),
    //         ticket.getDescription(),
    //         ticket.getStatus().toString(),
    //         ticket.getPriority().toString(),
    //         ticket.getCreatedBy(),
    //         ticket.getCreatedAt(),
    //         ticket.getUpdatedAt(),
    //         responses
    //     );
    // }

    // Updated toDto() method
private TicketDetailsDto toDto(Ticket ticket) {
    List<ResponseDetailsDto> responses = ticket.getResponses() == null ? List.of() :
            ticket.getResponses().stream()
                    .map(this::toResponseDto)
                    .collect(Collectors.toList());

    Long agentId = null;
    String agentName = null;
    if (ticket.getAssignedAgent() != null) {
        agentId = ticket.getAssignedAgent().getId();
        agentName = ticket.getAssignedAgent().getName();
    }

    return new TicketDetailsDto(
        ticket.getId(),
        ticket.getSubject(),
        ticket.getDescription(),
        ticket.getStatus().toString(),
        ticket.getPriority().toString(),
        ticket.getCreatedBy(),
        ticket.getCreatedAt(),
        ticket.getUpdatedAt(),
        responses,
        agentId,
        agentName
    );
}

    private ResponseDetailsDto toResponseDto(Response response) {
        return new ResponseDetailsDto(
            response.getId(),
            response.getMessage(),
            response.getRespondedBy(),
            response.getRespondedAt()
        );
    }

    // For error message consistency
    private static class ErrorMessage {
        public String message;
        public ErrorMessage(String m) { message = m; }
    }

   
     //public record TicketDetailsDto(Long id, String subject, String description, String status, String priority, String createdBy, java.time.LocalDateTime createdAt, java.time.LocalDateTime updatedAt, List<ResponseDetailsDto> responses) {}

     public record TicketDetailsDto(
    Long id,
    String subject,
    String description,
    String status,
    String priority,
    String createdBy,
    java.time.LocalDateTime createdAt,
    java.time.LocalDateTime updatedAt,
    List<ResponseDetailsDto> responses,
    Long assignedAgentId,       // added
    String assignedAgentName    // added
) {}


    
    public record ResponseDetailsDto(Long id, String message, String respondedBy, java.time.LocalDateTime respondedAt) {}
    @GetMapping("/customer/{createdBy}")
public ResponseEntity<List<TicketDetailsDto>> getTicketsByCustomer(@PathVariable String createdBy) {
    List<Ticket> tickets = ticketService.getTicketsByCreatedBy(createdBy);
    List<TicketDetailsDto> dtos = tickets.stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    return ResponseEntity.ok(dtos);
}

//  @PutMapping("/{ticketId}/assign")
//     public ResponseEntity<String> assignAgent(
//         @PathVariable Long ticketId,
//         @RequestBody AssignAgentRequest request) {
//         try {
//             ticketService.assignAgent(ticketId, request.agentId);
//             return ResponseEntity.ok("Agent assigned successfully");
//         } catch (EntityNotFoundException e) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket or Agent not found");
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to assign agent");
//         }
//     }
@PutMapping("/{ticketId}/assign")
public ResponseEntity<String> assignAgent(
    @PathVariable Long ticketId,
    @RequestBody AssignAgentRequest request) {
    try {
        ticketService.assignAgent(ticketId, request.agentId);
        return ResponseEntity.ok("Agent assigned successfully");
    } catch (EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket or Agent not found");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();  // Print stack trace here for debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to assign agent");
    }
}

// @PutMapping("/{ticketId}/assign")
// public ResponseEntity<String> assignAgent(
//     @PathVariable Long ticketId,
//     @RequestBody AssignAgentRequest request) {
//     try {
//         ticketService.assignAgent(ticketId, request.agentId);
//         return ResponseEntity.ok("Agent assigned successfully");
//     } catch (EntityNotFoundException e) {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket or Agent not found");
//     } catch (IllegalArgumentException e) {
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//     } catch (Exception e) {
//         e.printStackTrace(); // Add this line to print the stack trace to your logs
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to assign agent");
//     }
// }

  @GetMapping("/admin")
public List<TicketAdminDto> getTicketsForAdmin() {
    return ticketService.getAllTickets().stream()
        .map(ticket -> {
            Long agentId = null;
            String agentName = null;
            if (ticket.getAssignedAgent() != null) {
                agentId = ticket.getAssignedAgent().getId();
                agentName = ticket.getAssignedAgent().getName();
            }
            return new TicketAdminDto(
                ticket.getId(),
                ticket.getSubject(),
                ticket.getStatus().toString(),
                ticket.getCreatedBy(),
                agentId != null ? agentId.toString() : null,
                agentName
            );
        })
        .collect(Collectors.toList());
}

    public static record AssignAgentRequest(Long agentId) {}

    @GetMapping("/agent/{agentId}")
public ResponseEntity<List<TicketDetailsDto>> getTicketsByAgent(@PathVariable Long agentId) {
    List<Ticket> tickets = ticketService.getTicketsByAgentId(agentId);
    List<TicketDetailsDto> dtos = tickets.stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    return ResponseEntity.ok(dtos);
}

@GetMapping("/pag")
public ResponseEntity<?> getTickets(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "3") int size
) {
    try {
        Page<Ticket> ticketPage = ticketService.getTickets(page, size);
        List<TicketDetailsDto> dtos = ticketPage.stream()
                .map(this::toDto)
                .toList();

        // Wrap manually
        var response = Map.of(
            "content", dtos,
            "page", ticketPage.getNumber(),
            "size", ticketPage.getSize(),
            "totalElements", ticketPage.getTotalElements(),
            "totalPages", ticketPage.getTotalPages(),
            "last", ticketPage.isLast()
        );

        return ResponseEntity.ok(response);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(Map.of("message", "Unexpected error"));
    }
}






}
