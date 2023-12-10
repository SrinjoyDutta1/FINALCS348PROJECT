import React from 'react'
import { useState } from "react";




function UserGet() {
  const [username, getUserName] = useState("");
  const [message, setMessage] = useState("");
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/users/"+username, {
        method: "GET",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        
      });
      let resJson = await res.json();
      if (res.status === 200) {
        var x = JSON.stringify(resJson)
        setMessage("User found : " + x);
      } else {
        setMessage("Some error occured");
      } 
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <p> User Get </p>
        
        <br></br>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="User Name"
          onChange={(e) => getUserName(e.target.value)}
        />
        <br></br>
        <button type="submit">Get</button>

      </form>
      <div>{message ? <p>{message}</p> : null}</div>
      
    </div>
  );
}
export default UserGet;