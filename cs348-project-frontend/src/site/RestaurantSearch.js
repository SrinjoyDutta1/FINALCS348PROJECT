import React from 'react'
import { useState } from "react";
import DataTable from "react-data-table-component";


function RestaurantSearch() {



  const [zipCode, getZipcode] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const columns = [
    {
      name: "Restaurant Name",
      selector: (row) => row.restaurantName,
      width: "200px",
      wrap: true,
    },
    {
      name: "Street Address",
      selector: (row) => row.streetAddress,
      width: "200px",      
      wrap: true
    },
    {
      name: "ZipCode",
      selector: (row) => row.zipCode,
      wrap: true
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      wrap: true
    },
    {
      name: "Phone",
      selector: (row) => row.phoneNumber,
      wrap: true
    },
    {
      name: "Website",
      selector: (row) => row.website,
      wrap: true
    },
    {
      name: "Cuisine",
      selector: (row) => row.cuisineType,
      wrap: true
    },    
  ];  

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("http://127.0.0.1:5000/restaurants?zipCode="+zipCode, {
        method: "GET",
        mode : "cors",
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
        
      });
      let resJson = await res.json();
      setData(resJson);
      setLoading(false);
      setSubmitClicked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
  
    <div className="center">
       
            <h5> Restaurant Search (by Zipcode) </h5>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={zipCode}
          placeholder="zipCode"
          onChange={(e) => getZipcode(e.target.value)}
        />


        <br></br>
        <button type="submit">Search</button>
      </form>        
		
	{submitClicked && (
    	<DataTable
			columns={columns}
    	    data={data}
        	progressPending={loading}
	        pagination
    	/>
	)}
    </div>
  );
}
export default RestaurantSearch;