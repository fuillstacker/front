import React, { useState } from "react";
import '../profile.css'

const ProfileInfo = ({ users }) => {

    return (
        
        <div className="info">{users.email}</div>
    )
}

export default ProfileInfo