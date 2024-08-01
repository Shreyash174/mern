import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout title={'Your orders'}>
       <div className='container-flui p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'></div>
            <h1>All orders</h1>
        </div>
       </div>
    </Layout>
  )
}

export default Orders