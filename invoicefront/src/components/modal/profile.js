import React from 'react'
import './profile.style.scss'

const Profile = ({ isShowing, toggle }) => {
  return(
    <div className="profile-modal">

      <div className="profile-edit">
        <div className="profile-header">
         <h4>Edit Your Profile</h4>
        </div>

      

        <button onClick={toggle}>Hide Modal!</button>
      </div>
      
    </div>
  ) 

}

export default Profile