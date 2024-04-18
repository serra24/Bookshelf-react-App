import React, { useState } from 'react';

import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { AuthProvider } from './context/AuthContext';
function App() {

    return (
     <AuthProvider>
        <div>
            <h1>Bookshelf App</h1>
         
               
                  <Register  />
                 <Login />
                  
            
        </div>
         </AuthProvider>
    );
};

export default App;


