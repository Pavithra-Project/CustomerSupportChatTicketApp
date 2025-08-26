// import React, { useState, useEffect } from "react";
// import {
//   FaBell,
//   FaUserCircle,
//   FaSearch,
//   FaTicketAlt,
//   FaBook,
//   FaHome,
// } from "react-icons/fa";
// import "./CustomerDashboard.css";
// import { useNavigate } from "react-router-dom";

// const API_BASE = "http://localhost:8080/api/tickets";

// const CustomerDashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const CUSTOMER_EMAIL = user.email || "";
//   const token = localStorage.getItem("token"); 

//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [notifications, setNotifications] = useState(0);
//    const [showProfile, setShowProfile] = useState(false);
//   useEffect(() => {
//     if (!CUSTOMER_EMAIL || !token) return;
//     fetchTickets();
//     fetchNotifications();

//     const interval = setInterval(() => {
//       fetchTickets();
//       fetchNotifications();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [CUSTOMER_EMAIL, token]);

  
//   const fetchWithAuth = async (url, options = {}) => {
//     if (!token) throw new Error("No token found. Please log in.");
//     const res = await fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...options.headers,
//       },
//     });
//     if (!res.ok) {
//       throw new Error(`Request failed with status ${res.status}`);
//     }
//     if (res.status === 204) return null; 
//     return res.json();
//   };

//   const fetchTickets = async () => {
//     try {
//       const data = await fetchWithAuth(
//         `${API_BASE}/customer/${encodeURIComponent(CUSTOMER_EMAIL)}`
//       );
//       setTickets(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching tickets:", err.message);
//       setTickets([]);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const data = await fetchWithAuth(
//         `${API_BASE}/notifications?userEmail=${encodeURIComponent(
//           CUSTOMER_EMAIL
//         )}`
//       );
//       setNotifications(data?.count || 0);
//     } catch (err) {
//       console.error("Error fetching notifications:", err.message);
//     }
//   };

//   const handleSendMessage = async (ticketId) => {
//     if (!newMessage.trim()) return;
//     try {
//       await fetchWithAuth(`${API_BASE}/${ticketId}/responses`, {
//         method: "POST",
//         body: JSON.stringify({
//           message: newMessage,
//           respondedBy: CUSTOMER_EMAIL,
//         }),
//       });

//       setNewMessage("");
//       const updatedTicket = await fetchWithAuth(`${API_BASE}/${ticketId}`);
//       setSelectedTicket(updatedTicket);
//       fetchNotifications();
//     } catch (err) {
//       console.error("Error sending message:", err.message);
//     }
//   };

//  const handleNotificationClick = () => {
//   // Find the first ticket that has an agent response
//   const ticketWithAgentResponse = tickets.find(ticket =>
//     ticket.responses?.some(res => res.respondedBy !== CUSTOMER_EMAIL)
//   );

//   if (ticketWithAgentResponse) {
//     // Only keep agent responses
//     const agentResponses = ticketWithAgentResponse.responses.filter(
//       res => res.respondedBy !== CUSTOMER_EMAIL
//     );

//     setSelectedTicket({
//       id: ticketWithAgentResponse.id,
//       subject: ticketWithAgentResponse.subject,
//       agentResponses, // store only agent messages
//     });
//   }
// };




//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ticket.id?.toString().includes(searchTerm)
//   );

//   const openTickets = tickets.filter((t) => t.status === "OPEN").length;
//   const closedTickets = tickets.filter((t) => t.status === "CLOSED").length;
//   const navigate = useNavigate();

//   return (
//     <div className="custdashboard-container">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">SupportDesk</h2>
//         <nav>
//           <ul>
//             <li onClick={() => navigate("/CustomerDashboard")}>
//               <FaHome /> Dashboard
//             </li>
//             <li onClick={() => navigate("/CreateTicket")}>
//               <FaTicketAlt /> Create Ticket
//             </li>
//             <li onClick={() => navigate("/kb")}>
//               <FaBook /> Knowledge Base Articles
//             </li>
//           </ul>
//         </nav>
//       </aside>
   


//       <div className="main-area">
//         <header className="header">
//           <div className="search-bar">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search tickets..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="header-right" style={{ position: "relative" }}>
//   {/* <div className="notification">
//     <FaBell />
//     {notifications > 0 && <span className="badge">{notifications}</span>}
//   </div> */}

//  <div
//   className="notification"
//   onClick={handleNotificationClick}
//   style={{ cursor: "pointer" }}
// >
//   <FaBell />
//   {notifications > 0 && <span className="badge">{notifications}</span>}
// </div>
//   <div
//     className="profile"
//     onClick={() => setShowProfile((prev) => !prev)}
//     style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
//   >
//     <FaUserCircle className="profile-icon" />
//     <span>{user.name || "Customer"}</span>

//     {/* Move profile panel INSIDE profile div */}
//     {showProfile && (
//       <div
//         className="profile-panel"
//         style={{
//           position: "absolute",
//           top: "40px", // below the icon
//           right: 0,
//           background: "#fff",
//           padding: "20px",
//           borderRadius: "12px",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//           zIndex: 1000,
//           minWidth: "250px",
//         }}
//       >
//         <h3>User Profile</h3>
//         {/* <p><strong>Name:</strong> {user.name}</p> */}
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role || "Customer"}</p>
//         <button
//           onClick={() => {
//             localStorage.clear();
//             navigate("/login");
//           }}
//           style={{
//             marginTop: "10px",
//             padding: "8px 12px",
//             background: "#ef4444",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     )}
//   </div>
// </div>

//         </header>

//         {/* Stats */}
//         {!selectedTicket && (
//           <div className="stats">
//             <div className="stat-card">
//               <h3>Total Tickets</h3>
//               <p>{tickets.length}</p>
//             </div>
//             <div className="stat-card">
//               <h3>Open Tickets</h3>
//               <p>{openTickets}</p>
//             </div>
//             <div className="stat-card">
//               <h3>Closed Tickets</h3>
//               <p>{closedTickets}</p>
//             </div>
//             <div className="stat-card">
//               <h3>Notifications</h3>
//               <p>{notifications}</p>
//             </div>
//           </div>
//         )}

//         <h3 className="ticdet">Ticket Details</h3>

//         {/* Ticket List / Details */}
//         <div className="ticket-section">
//           {selectedTicket ? (
//             <div className="ticket-details">
//               <button onClick={() => setSelectedTicket(null)}>⬅ Back</button>
//               <h2>
//                 Ticket #{selectedTicket.id} - {selectedTicket.subject}
//               </h2>
//               <p>Status: {selectedTicket.status}</p>
//               <p>Agent: {selectedTicket.assignedAgentName || "Not Assigned"}</p>
//               <div className="responses">
//                 {selectedTicket.responses?.map((res) => (
//                   <div
//                     key={res.id}
//                     className={`response ${
//                       res.respondedBy === CUSTOMER_EMAIL ? "customer" : "agent"
//                     }`}
//                   >
//                     <strong>{res.respondedBy}:</strong> {res.message}
//                   </div>
//                 ))}
//               </div>
//               <textarea
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button onClick={() => handleSendMessage(selectedTicket.id)}>
//                 Send
//               </button>
//             </div>
//           ) : (
//             <div className="tickets-grid">
//               {filteredTickets.map((ticket) => (
//                 <div
//                   key={ticket.id}
//                   className="ticket-card"
//                   onClick={() => setSelectedTicket(ticket)}
//                 >
//                   <h3>{ticket.subject}</h3>
//                   <p>Status: {ticket.status}</p>
//                   <p>Agent: {ticket.assignedAgentName || "Not Assigned"}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;


// import React, { useState, useEffect } from "react";
// import {
//   FaBell,
//   FaUserCircle,
//   FaSearch,
//   FaTicketAlt,
//   FaBook,
//   FaHome,
// } from "react-icons/fa";
// import "./CustomerDashboard.css";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const API_BASE = "http://localhost:8080/api/tickets";

// const CustomerDashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const CUSTOMER_EMAIL = user.email || "";
//   const token = localStorage.getItem("token");

//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [notifications, setNotifications] = useState(0);
//   const [showProfile, setShowProfile] = useState(false);

//   useEffect(() => {
//     if (!CUSTOMER_EMAIL || !token) return;
//     fetchTickets();
//     fetchNotifications();

//     const interval = setInterval(() => {
//       fetchTickets();
//       fetchNotifications();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [CUSTOMER_EMAIL, token]);

//   const fetchWithAuth = async (url, options = {}) => {
//     if (!token) throw new Error("No token found. Please log in.");
//     const res = await fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...options.headers,
//       },
//     });
//     if (!res.ok) {
//       throw new Error(`Request failed with status ${res.status}`);
//     }
//     if (res.status === 204) return null;
//     return res.json();
//   };

//   const fetchTickets = async () => {
//     try {
//       const data = await fetchWithAuth(
//         `${API_BASE}/customer/${encodeURIComponent(CUSTOMER_EMAIL)}`
//       );
//       setTickets(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching tickets:", err.message);
//       setTickets([]);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const data = await fetchWithAuth(
//         `${API_BASE}/notifications?userEmail=${encodeURIComponent(
//           CUSTOMER_EMAIL
//         )}`
//       );
//       setNotifications(data?.count || 0);
//     } catch (err) {
//       console.error("Error fetching notifications:", err.message);
//     }
//   };

//   const handleSendMessage = async (ticketId) => {
//     if (!newMessage.trim()) return;
//     try {
//       await fetchWithAuth(`${API_BASE}/${ticketId}/responses`, {
//         method: "POST",
//         body: JSON.stringify({
//           message: newMessage,
//           respondedBy: CUSTOMER_EMAIL,
//         }),
//       });

//       setNewMessage("");
//       const updatedTicket = await fetchWithAuth(`${API_BASE}/${ticketId}`);
//       setSelectedTicket(updatedTicket);
//       fetchNotifications();
//     } catch (err) {
//       console.error("Error sending message:", err.message);
//     }
//   };

//   const [lastStatuses, setLastStatuses] = useState({}); // store last known statuses

// const handleNotificationClick = () => {
//   let newNotifications = [];

//   tickets.forEach((ticket) => {
//     const prevStatus = lastStatuses[ticket.id];
//     if (prevStatus !== ticket.status) {
//       // status changed -> push notification
//       newNotifications.push(ticket);
//     }
//   });

//   if (newNotifications.length > 0) {
//     newNotifications.forEach((t) => {
//       let message = "";
//       switch (t.status) {
//         case "OPEN":
//           message = `📢 Ticket #${t.id} (${t.subject}) has been created. Assigned Agent: ${t.assignedAgentName || "Unassigned"}`;
//           break;
//         case "IN_PROGRESS":
//           message = `⚡ Ticket #${t.id} (${t.subject}) is being worked on by Agent ${t.assignedAgentName || "Unassigned"}`;
//           break;
//         case "RESOLVED":
//           message = `✅ Ticket #${t.id} (${t.subject}) has been resolved by Agent ${t.assignedAgentName || "Unassigned"}`;
//           break;
//         case "CLOSED":
//           message = `🔒 Ticket #${t.id} (${t.subject}) has been closed by Agent ${t.assignedAgentName || "Unassigned"}`;
//           break;
//         default:
//           message = `ℹ️ Ticket #${t.id} (${t.subject}) status updated: ${t.status}`;
//       }

//       toast.info(message, {
//         position: "top-right",
//         autoClose: 4000,
//       });
//     });

//     // update last known statuses
//     setLastStatuses((prev) => {
//       const updated = { ...prev };
//       newNotifications.forEach((t) => {
//         updated[t.id] = t.status;
//       });
//       return updated;
//     });
//   } else {
//     toast.success("No new notifications 🎉", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   }
// };

//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ticket.id?.toString().includes(searchTerm)
//   );

//   const openTickets = tickets.filter((t) => t.status === "OPEN").length;
//   const closedTickets = tickets.filter((t) => t.status === "CLOSED").length;
//   const navigate = useNavigate();

//   return (
//     <div className="custdashboard-container">
//       <aside className="sidebar">
//         <h2 className="sidebar-logo">SupportDesk</h2>
//         <nav>
//           <ul>
//             <li onClick={() => navigate("/CustomerDashboard")}>
//               <FaHome /> Dashboard
//             </li>
//             <li onClick={() => navigate("/CreateTicket")}>
//               <FaTicketAlt /> Create Ticket
//             </li>
//             <li onClick={() => navigate("/kb")}>
//               <FaBook /> Knowledge Base Articles
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       <div className="main-area">
//         <header className="header">
//           <div className="search-bar">
//             <FaSearch className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search tickets..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="header-right" style={{ position: "relative" }}>
//             <div
//               className="notification"
//               onClick={handleNotificationClick}
//               style={{ cursor: "pointer" }}
//             >
//               <FaBell />
//               {notifications > 0 && <span className="badge">{notifications}</span>}
//             </div>
//             <div
//               className="profile"
//               onClick={() => setShowProfile((prev) => !prev)}
//               style={{
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "5px",
//               }}
//             >
//               <FaUserCircle className="profile-icon" />
//               <span>{user.name || "Customer"}</span>

//               {showProfile && (
//                 <div
//                   className="profile-panel"
//                   style={{
//                     position: "absolute",
//                     top: "40px",
//                     right: 0,
//                     background: "#fff",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//                     zIndex: 1000,
//                     minWidth: "250px",
//                   }}
//                 >
//                   <h3>User Profile</h3>
//                   <p>
//                     <strong>Email:</strong> {user.email}
//                   </p>
//                   <p>
//                     <strong>Role:</strong> {user.role || "Customer"}
//                   </p>
//                   <button
//                     onClick={() => {
//                       localStorage.clear();
//                       navigate("/login");
//                     }}
//                     style={{
//                       marginTop: "10px",
//                       padding: "8px 12px",
//                       background: "#ef4444",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Stats */}
//     {/* Stats */}
// {!selectedTicket && (
//   <div className="stats">
//     <div className="stat-card">
//       <h3>Total Tickets</h3>
//       <p>{tickets.length}</p>
//     </div>
//     <div className="stat-card">
//       <h3>Open Tickets</h3>
//       <p>{openTickets}</p>
//     </div>
//     <div className="stat-card">
//       <h3>Closed Tickets</h3>
//       <p>{closedTickets}</p>
//     </div>

//     {/* ✅ Notification Card (clickable) */}
//     <div
//       className="stat-card"
//       style={{ cursor: "pointer" }}
//       onClick={handleNotificationClick}
//     >
//       <h3>Notifications</h3>
//       <p>{notifications}</p>
//       <small style={{ color: "#555" }}>
//         Click to view latest updates
//       </small>
//     </div>
//   </div>
// )}


//         <h3 className="ticdet">Ticket Details</h3>

//         {/* Ticket List / Details */}
//         <div className="ticket-section">
//           {selectedTicket ? (
//             <div className="ticket-details">
//               <button onClick={() => setSelectedTicket(null)}>⬅ Back</button>
//               <h2>
//                 Ticket #{selectedTicket.id} - {selectedTicket.subject}
//               </h2>
//               <p>Status: {selectedTicket.status}</p>
//               <p>
//                 Agent: {selectedTicket.assignedAgentName || "Not Assigned"}
//               </p>
//               <div className="responses">
//                 {selectedTicket.responses?.map((res) => (
//                   <div
//                     key={res.id}
//                     className={`response ${
//                       res.respondedBy === CUSTOMER_EMAIL ? "customer" : "agent"
//                     }`}
//                   >
//                     <strong>{res.respondedBy}:</strong> {res.message}
//                   </div>
//                 ))}
//               </div>
//               <textarea
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button onClick={() => handleSendMessage(selectedTicket.id)}>
//                 Send
//               </button>
//             </div>
//           ) : (
//             <div className="tickets-grid">
//               {filteredTickets.map((ticket) => (
//                 <div
//                   key={ticket.id}
//                   className="ticket-card"
//                   onClick={() => setSelectedTicket(ticket)}
//                 >
//                   <h3>{ticket.subject}</h3>
//                   <p>Status: {ticket.status}</p>
//                   <p>Agent: {ticket.assignedAgentName || "Not Assigned"}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Toast container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default CustomerDashboard;


import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaTicketAlt,
  FaBook,
  FaHome,
} from "react-icons/fa";
import "./CustomerDashboard.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://localhost:8080/api/tickets";

const CustomerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const CUSTOMER_EMAIL = user.email || "";
  const token = localStorage.getItem("token");

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [lastStatuses, setLastStatuses] = useState({}); // stores last known ticket status

  const navigate = useNavigate();

  // Load lastStatuses from localStorage on mount
  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem("lastStatuses")) || {};
    setLastStatuses(storedStatuses);
  }, []);

  useEffect(() => {
    if (!CUSTOMER_EMAIL || !token) return;
    fetchTickets();

    const interval = setInterval(() => {
      fetchTickets();
    }, 5000);

    return () => clearInterval(interval);
  }, [CUSTOMER_EMAIL, token]);

  const fetchWithAuth = async (url, options = {}) => {
    if (!token) throw new Error("No token found. Please log in.");
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    if (res.status === 204) return null;
    return res.json();
  };

  const fetchTickets = async () => {
    try {
      const data = await fetchWithAuth(
        `${API_BASE}/customer/${encodeURIComponent(CUSTOMER_EMAIL)}`
      );
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tickets:", err.message);
      setTickets([]);
    }
  };

  const handleSendMessage = async (ticketId) => {
    if (!newMessage.trim()) return;
    try {
      await fetchWithAuth(`${API_BASE}/${ticketId}/responses`, {
        method: "POST",
        body: JSON.stringify({
          message: newMessage,
          respondedBy: CUSTOMER_EMAIL,
        }),
      });

      setNewMessage("");
      const updatedTicket = await fetchWithAuth(`${API_BASE}/${ticketId}`);
      setSelectedTicket(updatedTicket);
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  };

  const handleNotificationClick = () => {
    // Find tickets with status changes
    const newNotifications = tickets.filter(ticket => {
      return lastStatuses[ticket.id] !== ticket.status;
    });

    if (newNotifications.length > 0) {
      newNotifications.forEach((t) => {
        let message = "";
        switch (t.status) {
          case "OPEN":
            message = `📢 Ticket #${t.id} (${t.subject}) has been created. Assigned Agent: ${t.assignedAgentName || "Unassigned"}`;
            break;
          case "IN_PROGRESS":
            message = `⚡ Ticket #${t.id} (${t.subject}) is being worked on by Agent ${t.assignedAgentName || "Unassigned"}`;
            break;
          case "RESOLVED":
            message = `✅ Ticket #${t.id} (${t.subject}) has been resolved by Agent ${t.assignedAgentName || "Unassigned"}`;
            break;
          case "CLOSED":
            message = `🔒 Ticket #${t.id} (${t.subject}) has been closed by Agent ${t.assignedAgentName || "Unassigned"}`;
            break;
          default:
            message = `ℹ️ Ticket #${t.id} (${t.subject}) status updated: ${t.status}`;
        }
        toast.info(message, { position: "top-right", autoClose: 4000 });
      });

      // Update lastStatuses in state and localStorage
      const updatedStatuses = { ...lastStatuses };
      newNotifications.forEach(t => {
        updatedStatuses[t.id] = t.status;
      });
      setLastStatuses(updatedStatuses);
      localStorage.setItem("lastStatuses", JSON.stringify(updatedStatuses));

      setNotifications(0); // reset badge
    } else {
      toast.success("No new notifications 🎉", { position: "top-right", autoClose: 3000 });
      setNotifications(0);
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id?.toString().includes(searchTerm)
  );

  const openTickets = tickets.filter((t) => t.status === "OPEN").length;
  const closedTickets = tickets.filter((t) => t.status === "CLOSED").length;

  return (
    <div className="custdashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-logo">SupportDesk</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/CustomerDashboard")}>
              <FaHome /> Dashboard
            </li>
            <li onClick={() => navigate("/CreateTicket")}>
              <FaTicketAlt /> Create Ticket
            </li>
            <li onClick={() => navigate("/kb")}>
              <FaBook /> Knowledge Base Articles
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-area">
        <header className="header">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="header-right" style={{ position: "relative" }}>
            <div
              className="notification"
              onClick={handleNotificationClick}
              style={{ cursor: "pointer" }}
            >
              <FaBell />
              {notifications > 0 && <span className="badge">{notifications}</span>}
            </div>
            <div
              className="profile"
              onClick={() => setShowProfile((prev) => !prev)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FaUserCircle className="profile-icon" />
              <span>{user.name || "Customer"}</span>

              {showProfile && (
                <div
                  className="profile-panel"
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: 0,
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                    minWidth: "250px",
                  }}
                >
                  <h3>User Profile</h3>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role || "Customer"}
                  </p>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {!selectedTicket && (
          <div className="stats">
            <div className="stat-card">
              <h3>Total Tickets</h3>
              <p>{tickets.length}</p>
            </div>
            <div className="stat-card">
              <h3>Open Tickets</h3>
              <p>{openTickets}</p>
            </div>
            <div className="stat-card">
              <h3>Closed Tickets</h3>
              <p>{closedTickets}</p>
            </div>

            <div
              className="stat-card"
              style={{ cursor: "pointer" }}
              onClick={handleNotificationClick}
            >
              <h3>Notifications</h3>
              <p>{notifications}</p>
              <small style={{ color: "#555" }}>Click to view latest updates</small>
            </div>
          </div>
        )}

        <h3 className="ticdet">Ticket Details</h3>

        <div className="ticket-section">
          {selectedTicket ? (
            <div className="ticket-details">
              <button onClick={() => setSelectedTicket(null)}>⬅ Back</button>
              <h2>
                Ticket #{selectedTicket.id} - {selectedTicket.subject}
              </h2>
              <p>Status: {selectedTicket.status}</p>
              <p>
                Agent: {selectedTicket.assignedAgentName || "Not Assigned"}
              </p>
              <div className="responses">
                {selectedTicket.responses?.map((res) => (
                  <div
                    key={res.id}
                    className={`response ${
                      res.respondedBy === CUSTOMER_EMAIL ? "customer" : "agent"
                    }`}
                  >
                    <strong>{res.respondedBy}:</strong> {res.message}
                  </div>
                ))}
              </div>
              <textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={() => handleSendMessage(selectedTicket.id)}>
                Send
              </button>
            </div>
          ) : (
            <div className="tickets-grid">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="ticket-card"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <h3>{ticket.subject}</h3>
                  <p>Status: {ticket.status}</p>
                  <p>Agent: {ticket.assignedAgentName || "Not Assigned"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CustomerDashboard;
