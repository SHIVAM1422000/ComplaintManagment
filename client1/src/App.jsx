import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddFakeComplaint from './pages/AddFakeComplaint';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/add-fake" element={<AddFake />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App