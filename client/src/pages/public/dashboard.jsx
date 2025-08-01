import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Outlet/>
    <div>Dashboard</div>
    </>
  )
}

export default Dashboard