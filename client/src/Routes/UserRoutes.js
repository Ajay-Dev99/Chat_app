import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import HomePage from '../components/HomePage'
import UsersList from '../components/UsersList'
import { UserProvider } from '../Contexts/activeUser'

function UserRoutes() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<HomePage />} />

        {/* Mobile Routes */}

        <Route path='/userLists' element={<UsersList />} />
      </Routes>

    </UserProvider>

  )
}

export default UserRoutes
