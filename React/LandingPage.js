import React from "react";
import "./LandingPage.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate=useNavigate();
  return (
  
    <div className="landing-container">
   
      <header className="landing-header">
        <div className="logo">💬 SupportDesk</div>
        <nav>
         
          <button onClick={()=>navigate("/Login")} className="button-style">Login</button>
         
          <button onClick={()=>navigate("/SignUp")} className="button-style">SignUp</button>
         
          <button onClick={()=>document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="button-style">About Us</button>
           <button
            onClick={() => navigate("/AgentLogin")}
            className="button-style agent-btn"
          >
            Login as Agent
          </button>
          <button
            onClick={() => navigate("/AdminLogin")}
            className="button-style admin-btn"
          >
            Login as Admin
          </button>
        </nav>
      </header>

      
      <section className="hero-section">
        <h1>Customer Support Chat Ticket System</h1>
        <p>
          Manage customer queries seamlessly with our intuitive ticketing .
          
          Faster responses. Happier customers.
        </p>
        <button className="cta-button"   onClick={() => navigate("/Login")}>Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features-section">
  <h2>Why Choose Us?</h2>
  <div className="features-grid">
    <div className="feature-card">
      <img src="https://commence.com/wp-content/uploads/2018/12/1.jpg" alt="Easy Ticket" className="feature-img"/>
      <h3>📩 Easy Ticket Management</h3>
      <p>Track and resolve issues efficiently with our streamlined dashboard.</p>
    </div>
    <div className="feature-card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOtou_WU46cH8HmdJ0ujON4cIzTlngI4kSog&s" alt="Quick Resolution" className="feature-img"/>
      <h3>📥 Quick Ticket Resolution</h3>
      <p>Prioritize and resolve customer issues faster with automated ticket routing and smart notifications.</p>
    </div>
    <div className="feature-card">
      <img src="https://images.ctfassets.net/lbgy40h4xfb7/5j6xLfvngmdjnmOLF7fo7x/0cd36e16583b93a685a4515bf3e12834/reports-vs-analytics-the-difference.jpg?w=1200&h=700&fl=progressive&q=90&fm=jpg" alt="Analytics" className="feature-img"/>
      <h3>📊 Analytics & Reports</h3>
      <p>Gain insights into performance with advanced analytics.</p>
    </div>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          At SupportDesk, we believe every customer deserves quick and efficient
          help. Our mission is to simplify communication between businesses and
          their customers with modern technology.
        </p>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} SupportDesk. All rights reserved.</p>
      </footer>
    </div>
  );
}
