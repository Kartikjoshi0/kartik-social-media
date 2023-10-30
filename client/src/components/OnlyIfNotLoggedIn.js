import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStoragerManager'
import { Navigate, Outlet } from 'react-router-dom';

function OnlyIfNotLoggedIn() {
    const user=getItem(KEY_ACCESS_TOKEN);
  return (
    user? <Navigate to="/" />:<Outlet />
  )
}

export default OnlyIfNotLoggedIn