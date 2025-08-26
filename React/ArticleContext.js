import React, { createContext, useContext, useState } from "react";

const ArticleContext = createContext();

export function ArticlesProvider({ children }) { // ✅ renamed to match your import
  const [articles] = useState([
    {
      id: 1,
      title: "How to Reset Your Password",
      summary: "Step-by-step guide to reset password",
      content: `Step-by-step instructions to reset your password:
1. Go to Settings → Security → Reset Password.
2. Enter your current password.
3. Enter your new password and confirm it.
4. Click "Save Changes".
5. You will receive a confirmation email once the password is reset.
Password security tips: use a mix of letters, numbers, and symbols. Avoid using easily guessable passwords.`,
    },
    {
      id: 2,
      title: "Troubleshooting Login Issues",
      summary: "Fix login errors quickly",
      content: `If you're facing login issues:
- Clear your browser cache and cookies.
- Make sure your Caps Lock is off.
- Try resetting your password if necessary.
- Check your internet connection.
- If the problem persists, contact support.
Always use the latest version of your browser for optimal experience.`,
    },
    {
      id: 3,
      title: "Understanding Ticket Priorities",
      summary: "Learn about ticket priority levels",
      content: `Ticket priorities help support teams manage issues effectively:
- LOW: Minor issues that do not affect core functionality.
- MEDIUM: Issues that partially affect functionality.
- HIGH: Critical issues that affect operations and need immediate attention.
Set appropriate priority when creating tickets for faster resolution.`,
    },
  ]);

  return (
    <ArticleContext.Provider value={{ articles }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticles() {
  return useContext(ArticleContext);
}
