package com.examly.springapp.dto;

public record TicketAdminDto(
    Long id,
    String subject,
    String status,
    String createdBy,
    String assignedAgentId,
    String assignedAgentName
) {}

