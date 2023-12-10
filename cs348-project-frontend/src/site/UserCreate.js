import React from 'react'
import { useState } from "react";





function UserCreate() {



  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");



  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email:email,
            password:password,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {

        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <h5> User Create </h5>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={firstname}
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={lastname}
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default UserCreate;