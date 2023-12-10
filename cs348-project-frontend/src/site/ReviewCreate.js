import React from 'react'
import { useState } from "react";





function ReviewCreate() {



  const [reviewId, setReviewId] = useState("");
  const [username, setUsername] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [textReview, setTextReview] = useState("");
  const [message, setMessage] = useState("");



  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/reviews", {
        method: "POST",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
	        username: username,
            restaurantName: restaurantName,
            rating: rating,
            textReview:textReview,
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
       
            <h5> Review Create </h5>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="User name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>      
        <input
          type="text"
          value={restaurantName}
          placeholder="Restaurant Name"
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={rating}
          placeholder="Rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={textReview}
          placeholder="Text Review"
          onChange={(e) => setTextReview(e.target.value)}
        />
        <br></br>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
export default ReviewCreate;