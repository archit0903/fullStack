import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {CurrentUser} = useSelector(state => state.user)
  return CurrentUser ? <Outlet/>: <Navigate to='/sign-in' />
}

export default PrivateRoute