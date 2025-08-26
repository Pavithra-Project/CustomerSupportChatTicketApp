package com.examly.springapp.repository;

import com.examly.springapp.model.Ticket;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

   @Query("SELECT t FROM Ticket t WHERE LOWER(t.createdBy) = LOWER(:createdBy)")
List<Ticket> findByCreatedByIgnoreCase(@Param("createdBy") String createdBy);


    // List<Ticket> findByCreatedBy(String createdBy);
   List<Ticket> findByAssignedAgentId(Long agentId); 
   // Page<Ticket> findByAssignedAgentId(Long agentId, Pageable pageable);


}
