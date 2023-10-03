import './index.css'
import Signup from './pages/sign/SignUp'
import LogIn from './pages/sign/LogIn'
import ForgotPassword from './pages/sign/ForgotPassword'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Sponsored from './pages/Sponsored'
import Admins from './pages/Admins'
import Users from './pages/Users'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/layout'
import Bills from './pages/Bills'
import Courses from './pages/Courses'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sponsored" element={<Sponsored />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
