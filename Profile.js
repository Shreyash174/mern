import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Profile = () => {
  return (
    <Layout title={'Your profile'}>
        <div className='container-fluid m-3 p-4'>
       < div className='row'>
            <div className='col-md-3'></div>
            <UserMenu/>
            <div className='col-md-9'>
            <h1>Profile</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile