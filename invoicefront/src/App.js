import React from 'react'
import './App.css'

import NavBar from './components/navbar/Navbar.js'
import MiniDrawer from './components/navDrawer/navDraver'
import AppRoutes from './routes/AppRoutes'



function App() {
  return (
    <div className="App">
      {AppRoutes}
    </div>
  );
}

export default App;
