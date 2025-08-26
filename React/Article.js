// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Container, Typography, Button } from "@mui/material";
// import './Article.css';

// const articles = [
//   {
//     id: 1,
//     title: "How to Reset Your Password",
//     content: `Step-by-step instructions to reset your password:
// 1. Go to Settings → Security → Reset Password.
// 2. Enter your current password.
// 3. Enter your new password and confirm it.
// 4. Click "Save Changes".
// 5. You will receive a confirmation email once the password is reset.
// Password security tips: use a mix of letters, numbers, and symbols. Avoid using easily guessable passwords.`,
//   },
//   {
//     id: 2,
//     title: "Troubleshooting Login Issues",
//     content: `If you're facing login issues:
// - Clear your browser cache and cookies.
// - Make sure your Caps Lock is off.
// - Try resetting your password if necessary.
// - Check your internet connection.
// - If the problem persists, contact support.
// Always use the latest version of your browser for optimal experience.`,
//   },
//   {
//     id: 3,
//     title: "Understanding Ticket Priorities",
//     content: `Ticket priorities help support teams manage issues effectively:
// - LOW: Minor issues that do not affect core functionality.
// - MEDIUM: Issues that partially affect functionality.
// - HIGH: Critical issues that affect operations and need immediate attention.
// Set appropriate priority when creating tickets for faster resolution.`,
//   },
//   {
//     id: 4,
//     title: "How to Submit a Support Ticket",
//     content: `To submit a ticket:
// 1. Go to the "Create Ticket" page.
// 2. Fill in the subject, description, and priority.
// 3. Add your contact details in the "Created By" field.
// 4. Click "Submit Ticket".
// You will receive a confirmation message once your ticket is created. Monitor ticket status on your dashboard.`,
//   },
//   {
//     id: 5,
//     title: "Best Practices for Customer Support",
//     content: `Effective customer support practices:
// - Respond promptly to all queries.
// - Prioritize critical issues first.
// - Communicate clearly and politely.
// - Keep customers updated on ticket status.
// - Follow up to ensure satisfaction.
// This ensures higher customer satisfaction and trust.`,
//   },
// ];

// export default function ArticlePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const article = articles.find(a => a.id === parseInt(id));

//   if (!article) return <p>Article not found</p>;

//   return (
//     <div className="article-page-container" style={{
//         backgroundImage: `url("https://png.pngtree.com/background/20250508/original/pngtree-a-book-with-its-pages-open-flying-through-the-air-picture-image_16516122.jpg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         paddingBottom: "50px", // spacing at bottom
//       }}>
//       <Container sx={{ py: 5 }}>
//         <Button className="back-btn" onClick={() => navigate(-1)}>← Back</Button>
//         <Typography variant="h3" className="article-title" gutterBottom>
//           {article.title}
//         </Typography>
//         <Typography variant="body1" className="article-content">
//           {article.content}
//         </Typography>
//       </Container>
//     </div>
//   );
// }
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { useArticles } from "./ArticleContext"

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useArticles();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) return <p>Article not found</p>;

  return (
    <div
      style={{
         backgroundImage: `url("https://i.pinimg.com/736x/3e/7f/23/3e7f2398a2d8f2bfe3a1257672966a94.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      <Container sx={{ py: 5 }}>
        <Button onClick={() => navigate(-1)}>← Back</Button>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          {article.title}
        </Typography>
        <Typography variant="body1">{article.content}</Typography>
      </Container>
    </div>
  );
}

