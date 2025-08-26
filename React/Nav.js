import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const CUSTOMER_NAME = "Pavi"; // Replace with actual logged-in user's name
const API_BASE = "http://localhost:8080/api/tickets";

const Nav = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_BASE}/customer/${encodeURIComponent(CUSTOMER_NAME)}`);
      if (!res.ok) throw new Error("Failed to fetch tickets");
      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tickets", err);
      setTickets([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/notifications?userName=${encodeURIComponent(CUSTOMER_NAME)}`);
      const data = await res.json();
      setNotifications(data.count || 0);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchNotifications();
  }, []);

  return (
    <header className="navbar" 
 
  style={{
    backgroundImage: `url("https://media.istockphoto.com/id/1472930610/vector/abstract-curved-red-shape-on-green-background-with-lighting-effect-and-copy-space-for-text.jpg?s=612x612&w=0&k=20&c=EamQMN-rhLKSQ5D2CeahjOyXPvT10kilxgZy115vXHA=")`,
    // background: "linear-gradient(135deg, #032a2cff, #010a05d2)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "0 0 25px 25px",
    overflow: "hidden",
    height: "180px",
  }}
>
      <div className="logo" onClick={() => navigate("/")}>SupportDesk</div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="navbar-buttons">
        <button className="create-btn" onClick={() => navigate("/CreateTicket")}>
          Create Ticket
        </button>
        <button className="knowledge-btn" onClick={() => navigate("/Kb")}>
          Knowledge Base
        </button>
      </div>

      <div className="navbar-right">
        <div className="notification-icon">
          <FaBell />
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </div>

        <div className="profile-section">
          <FaUserCircle className="profile-icon" onClick={() => setShowProfileMenu(!showProfileMenu)} />
          {showProfileMenu && (
            <div className="profile-dropdown">
              <p onClick={() => navigate("/Profile")}>My Profile</p>
              <p onClick={() => navigate("/Settings")}>Settings</p>
              <p onClick={() => navigate("/Logout")}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
