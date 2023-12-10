import React from 'react'
import { useState } from "react";





function UserDelete() {



  const [username, UserDelete] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/users/"+username, {
        method: "DELETE",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        
      });
      let resJson = await res.json();

      if (res.status === 200) {

        setMessage("User deleted successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <p> User Delete </p>
        
        <br></br>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="User Name"
          onChange={(e) => UserDelete(e.target.value)}
        />


        <br></br>
        <button type="submit">Delete</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default UserDelete;