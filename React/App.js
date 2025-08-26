import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import CreateTicket from './components/CreateTicket';
import LandingPage from './LandingPage';
import Login from './Login';
import SignUp from './SignUp';
import CustomerDashboard from './CustomerDashboard';
import Kb from './Kb';
import AgentLogin from './Agent.js/AgentLogin';
import AgentDashboard from './Agent.js/AgentDashboard';
import AdminLogin from './Admin.js/AdminLogin';
import AdminDashboard from './Admin.js/Dashboard';
import ArticlePage from './Article';
import CreateTickets from './CreateTickets';

// function App() {
//   // return (
//   //   <Router>
//   //     <div className="App">
//   //       <nav style={{ padding: '1.1rem', background: '#f7fafc', boxShadow: '0 1px 6px rgba(0,0,0,.06)', marginBottom: '2rem' }}>
//   //         <Link to="/" style={{ fontWeight: 700, fontSize: '1.22em', marginRight: 24, color: '#3b82f6', textDecoration: 'none', letterSpacing: '0.01em' }}>
//   //           Ticket Support
//   //         </Link>
//   //         <Link to="/" style={{ marginRight: 15, color: '#222', textDecoration: 'none' }}>
//   //           Ticket List
//   //         </Link>
//   //         <Link to="/tickets/new" style={{ color: '#222', textDecoration: 'none' }}>
//   //           Create Ticket
//   //         </Link>
//   //       </nav>
//   //       <Routes>
//   //         <Route path="/" element={<TicketList />} />
//   //         <Route path="/tickets/new" element={<CreateTicket />} />
//   //         <Route path="/tickets/:id" element={<TicketDetail />} />
//   //       </Routes>
//   //     </div>
//   //   </Router>
//   // );
//   return (
//    <Routes>
//      <Route path="/" element={<LandingPage/>}></Route>
//      <Route path='/Login' element={<Login/>}></Route>
//     <Route path='/SignUp' element={<SignUp/>}></Route> 
//     <Route path='/CustomerDashboard' element={<CustomerDashboard/>}></Route>
//     <Route path="/CreateTicket" element={<CreateTickets />} />
//     <Route path='/Kb' element={<Kb/>}/>
//     <Route path="/Article/:id" element={<ArticlePage />} />
//     <Route path="AgentLogin" element={<AgentLogin/>}></Route>
//     <Route path='/AgentDashboard' element={<AgentDashboard/>}></Route>
//     <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
//     <Route path='/Dashboard' element={<AdminDashboard/>}></Route>
//    </Routes>
//   );
// }

// export default App;


import PrivateRoute from "./PrivateRoute"; // make sure this exists

function App() {
   return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/AgentLogin" element={<AgentLogin />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
       <Route path='/Kb' element={<Kb/>}/>
    <Route path="/Article/:id" element={<ArticlePage />} />

      {/* Customer Protected */}
      <Route
        path="/CustomerDashboard"
        element={
          <PrivateRoute role="Customer">
            <CustomerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/CreateTicket"
        element={
          <PrivateRoute role="Customer">
            <CreateTickets />
          </PrivateRoute>
        }
      />

      {/* Agent Protected */}
      <Route
        path="/AgentDashboard"
        element={
          <PrivateRoute role="Agent">
            <AgentDashboard />
          </PrivateRoute>
        }
      />

      {/* Admin Protected */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute role="Admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );

}
export default App;
