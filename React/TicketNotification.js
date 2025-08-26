import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TicketNotification() {
  const notify = () => toast.success("Your query has been resolved ✅");

  return (
    <div>
      <button onClick={notify}>Resolve Ticket</button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
