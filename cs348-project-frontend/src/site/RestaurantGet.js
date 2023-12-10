import React from 'react'
import { useState } from "react";





function RestaurantGet() {



  const [name, getRestaurantName] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/restaurants/"+name, {
        method: "GET",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        
      });
      let resJson = await res.json();

      if (res.status === 200) {
        var x = JSON.stringify(resJson)
        setMessage("Restaurant found :" +x);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <h5> Restaurant Get </h5>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Restaurant Name"
          onChange={(e) => getRestaurantName(e.target.value)}
        />


        <br></br>
        <button type="submit">get</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default RestaurantGet;