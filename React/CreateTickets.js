
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css'; // Import CSS
import { motion } from 'framer-motion';

const API_BASE = "http://localhost:8080/api/tickets";
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
const INIT_FORM = { subject: '', description: '', priority: 'LOW', createdBy: '' };

const CreateTickets = () => {
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-fill createdBy with logged-in user's email
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setForm(prev => ({ ...prev, createdBy: user.email }));
    }
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.subject.trim()) errs.subject = 'Required';
    else if (form.subject.length < 5 || form.subject.length > 100) errs.subject = '5-100 characters required';

    if (!form.description.trim()) errs.description = 'Required';
    else if (form.description.length < 10 || form.description.length > 1000) errs.description = '10-1000 characters required';

    if (!form.createdBy.trim()) errs.createdBy = 'Required';
    else if (form.createdBy.length < 5 || form.createdBy.length > 100) errs.createdBy = 'Invalid email length';

    if (!form.priority) errs.priority = 'Required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); 

  if (!token) {
    alert("You must log in first!");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create ticket: ${res.status} - ${errorText}`);
    }

    alert("✅ Ticket created successfully!");
    navigate("/CustomerDashboard");
  } catch (err) {
    console.error("Error creating ticket:", err);
    alert(err.message);
  }
};

  return (
    <div
      className="ticket-container"
      style={{
        // backgroundImage: `url('https://slidescorner.com/wp-content/uploads/2024/01/Pastel-Clouds-Lavender-Plain-Background-for-Wallpaper-PPT-and-Google-Slides-by-SlidesCorner.com_-700x394.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="ticket-box"
      >
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2 className="ticket-title">🎫 Create New Ticket</h2>

        <form onSubmit={handleSubmit} className="ticket-form">
          <label>Subject</label>
          <input type="text" name="subject" value={form.subject} onChange={handleChange} disabled={loading} />
          {errors.subject && <div className="error">{errors.subject}</div>}

          <label>Description</label>
          <textarea name="description" rows="5" value={form.description} onChange={handleChange} disabled={loading} />
          {errors.description && <div className="error">{errors.description}</div>}

          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} disabled={loading}>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.priority && <div className="error">{errors.priority}</div>}

          <label>Created By</label>
          <input type="text" name="createdBy" value={form.createdBy} disabled />
          {errors.createdBy && <div className="error">{errors.createdBy}</div>}

          {apiError && <div className="error">{apiError}</div>}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn"
          >
            {loading ? 'Creating...' : 'Submit Ticket'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateTickets;
