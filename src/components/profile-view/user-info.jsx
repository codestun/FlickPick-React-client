import React from "react";

function UserInfo({ name, email }) {
  return (
    <>
      <div className="bg-dark text-white">
        <h4>Your Info</h4>
        <p>Name: {name}</p>
        <p>e-mail: {email}</p>
      </div >
    </>
  )
}

export default UserInfo
