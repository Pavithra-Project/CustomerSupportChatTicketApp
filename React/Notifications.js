import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch ticket updates
    axios.get("http://localhost:8080/api/tickets/updates")
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err));
  }, []);

  // Function to format status message
  const getMessage = (ticket) => {
    switch(ticket.status) {
      case "OPEN":
        return `Ticket #${ticket.ticketId} - "${ticket.title}" has been created. Assigned Agent: ${ticket.agentId}`;
      case "IN_PROGRESS":
        return `Ticket #${ticket.ticketId} is being worked on by Agent ${ticket.agentId}.`;
      case "RESOLVED":
        return `Ticket #${ticket.ticketId} has been resolved by Agent ${ticket.agentId}.`;
      case "CLOSED":
        return `Ticket #${ticket.ticketId} has been closed by Agent ${ticket.agentId}.`;
      default:
        return `Ticket #${ticket.ticketId} status updated: ${ticket.status}`;
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-3">🔔 Ticket Notifications</h2>
      {notifications.length === 0 ? (
        <p>No updates available.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((ticket) => (
            <li key={ticket.ticketId} className="p-2 bg-white rounded-lg shadow">
              {getMessage(ticket)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
