import React from 'react'
import { useState } from "react";





function RestaurantDelete() {



  const [name, RestaurantDelete] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/restaurants/"+name, {
        method: "DELETE",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        
      });
      let resJson = await res.json();

      if (res.status === 200) {

        setMessage("Restaurant deleted successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <h5> Restaurant Delete </h5>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="delete Name"
          onChange={(e) => RestaurantDelete(e.target.value)}
        />


        <br></br>
        <button type="submit">Delete</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default RestaurantDelete;