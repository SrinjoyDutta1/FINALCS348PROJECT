import React from 'react'
import { useState } from "react";





function UserUpdate() {



  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/users/" + username, {
        method: "PUT",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
          username: username,
          firstName: firstName,
          lastName: lastName,
          Email:Email,
          Password:Password,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        setMessage("User updated successfully" + resJson);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <h5> User Update </h5>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={Email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={Password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit">Update</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default UserUpdate;