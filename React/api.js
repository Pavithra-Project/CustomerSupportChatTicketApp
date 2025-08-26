// api.js
const API_BASE = "http://localhost:8080/api";

export const fetchWithAuth = async (url, token, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (res.status === 401 || res.status === 403) {
      throw new Error("Authentication failed");
    }

    const text = await res.text();
    return text ? JSON.parse(text) : [];
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

export const getTickets = async (email, token) => {
  return await fetchWithAuth(`${API_BASE}/tickets/customer/${encodeURIComponent(email)}`, token);
};

export const getTicketById = async (ticketId, token) => {
  return await fetchWithAuth(`${API_BASE}/tickets/${ticketId}`, token);
};

export const getNotifications = async (email, token) => {
  const data = await fetchWithAuth(`${API_BASE}/tickets/notifications?userEmail=${encodeURIComponent(email)}`, token);
  return data.count || data.length || 0;
};

export const sendTicketResponse = async (ticketId, message, email, token) => {
  return await fetchWithAuth(`${API_BASE}/tickets/${ticketId}/responses`, token, {
    method: "POST",
    body: JSON.stringify({ message, respondedBy: email }),
  });
};
