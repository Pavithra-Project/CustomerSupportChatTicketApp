// import React from "react";
// import {
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Paper,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Nav from "./Nav";

// const articles = [
//   { id: 1, title: "How to Reset Your Password", summary: "Step-by-step guide to reset password" },
//   { id: 2, title: "Troubleshooting Login Issues", summary: "Fix login errors quickly" },
//   { id: 3, title: "Understanding Ticket Priorities", summary: "Learn about ticket priority levels" },
// ];

// export default function Kb() {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         // backgroundImage: `url("https://png.pngtree.com/background/20250205/original/pngtree-a-book-for-knowledge-ai-generate-picture-image_16056470.jpg")`,
//          background: "linear-gradient(135deg, #0f0f0f, #1c1c1c)", // ✅ string value
//     minHeight: "100vh",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     flexDirection: "column",
//       }}
//     >
//       <Nav />
//       <Container sx={{ mt: 6 }}>
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: "18px",
//             background: "rgba(255,255,255,0.85)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
//           }}
//         >
//           <Typography
//             variant="h4"
//             gutterBottom
//             align="center"
//             sx={{
//               fontWeight: "bold",
//               background: "linear-gradient(90deg,#26c6da,#00897b)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               mb: 3,
//             }}
//           >
//             Knowledge Base
//           </Typography>

//           <List>
//             {articles.map((article) => (
//               <React.Fragment key={article.id}>
//                 <ListItem
//                   button
//                   onClick={() => navigate(`/article/${article.id}`)}
//                   sx={{
//                     borderRadius: "10px",
//                     mb: 1,
//                     transition: "0.3s",
//                     "&:hover": {
//                       background: "linear-gradient(90deg, #e0f7fa, #b2dfdb)",
//                       transform: "translateX(5px)",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={article.title}
//                     secondary={article.summary}
//                     primaryTypographyProps={{ fontWeight: "600", color: "#004d40" }}
//                     secondaryTypographyProps={{ color: "#555" }}
//                   />
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </List>
//         </Paper>
//       </Container>
//     </div>
//   );
// }


import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useArticles } from "./ArticleContext"; 

export default function Kb() {
  const navigate = useNavigate();
  const { articles } = useArticles();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e9eeedff, #ffffffff)",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav />
      <Container sx={{ mt: 6 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "18px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg,#26c6da,#00897b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            Knowledge Base
          </Typography>

          <List>
            {articles.map((article) => (
              <React.Fragment key={article.id}>
                <ListItem
                  button
                  onClick={() => navigate(`/article/${article.id}`)}
                  sx={{
                    borderRadius: "10px",
                    mb: 1,
                    transition: "0.3s",
                    "&:hover": {
                      background: "linear-gradient(90deg, #e0f7fa, #b2dfdb)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <ListItemText
                    primary={article.title}
                    secondary={article.summary}
                    primaryTypographyProps={{ fontWeight: "600", color: "#004d40" }}
                    secondaryTypographyProps={{ color: "#555" }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
}
