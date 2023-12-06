import React from 'react'
import SuperAdminHeader from '../common/SuperAdminHeader'
import ItemDatatable from '../../../admin/components/main/ItemDataTable'
import MenuItemDataTable from './datatables/MenuItemDataTable'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItem } from '../../../redux/items/itemThunk'
import { useState } from 'react'

export default function Details() {
    const location=useLocation()
    const dispatch=useDispatch()
    const fetchedItems=useSelector((state)=>state.fetchitem.f_item)
    const [MenuItems, setMenuItems] = useState([])
    (location.state.userId)
    useEffect(()=>{
        dispatch(fetchItem(location.state.userId))
    },[])
    useEffect(()=>{
        setMenuItems(fetchedItems)
    },[fetchedItems])
  return (
    <>
        <SuperAdminHeader/>
        <div className='dashboard'>
        <MenuItemDataTable
            MenuItems={MenuItems}
        />

        </div>
        
    </>
  )
}
