import React from 'react'
import { useState } from "react";





function RestaurantCreate() {



  const [restaurantName, setRestaurantName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [message, setMessage] = useState("");


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/restaurants", {
        method: "POST",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
          restaurantName: restaurantName,
          streetAddress: streetAddress,
          zipCode: zipCode,
          Email:Email,
          phoneNumber:phoneNumber,
          website:website,
          cuisineType:cuisineType
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        setRestaurantName("");
        setStreetAddress("");
        setZipCode("");
        setEmail("");
        setPhoneNumber("");
        setWebsite("");
        setCuisineType("");
        setMessage("Restaurant created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
	  <h5> Restaurant Create </h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={restaurantName}
          placeholder="Restaurant Name"
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={streetAddress}
          placeholder="Street Address"
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={zipCode}
          placeholder="zipcode"
          onChange={(e) => setZipCode(e.target.value)}
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
          value={phoneNumber}
          placeholder="phone"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={website}
          placeholder="website"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={cuisineType}
          placeholder="cuisine"
          onChange={(e) => setCuisineType(e.target.value)}
        />
        <br></br>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default RestaurantCreate;