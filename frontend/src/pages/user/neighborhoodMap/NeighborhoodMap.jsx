import React from 'react'
import UserDrawer from "../components/UserDrawer";
import GarbageMap from '../components/GarbageMap';


export default function NeighborhoodMap() {
  return (
    <UserDrawer>
        {/* <h1 className=" text-[#48752c] text-xl font-semibold my-3 mx-4">View All Trucks and Garbage Dumps Available in your Neighbourhood</h1> */}
        <GarbageMap />      
    </UserDrawer>
  )
}
