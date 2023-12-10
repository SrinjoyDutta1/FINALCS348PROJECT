import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";


function RestaurantSearch2() {



  const [zipCode, getZipcode] = useState("");
  const [cuisineSelected, getCuisineSelected] = useState("");  
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [cuisineList, setCuisineList] = useState([]);


  const columns = [
    {
      name: "Restaurant Name",
      selector: (row) => row[0],
      width: "150px",
      wrap: true,
    },
    {
      name: "Street Address",
      selector: (row) => row[1],
      width: "140px",      
      wrap: true
    },
    {
      name: "ZipCode",
      selector: (row) => row[2],
      width: "100px",            
      wrap: true
    },
    {
      name: "Email",
      selector: (row) => row[3],
      width: "100px",            
      wrap: true
    },
    {
      name: "Phone",
      selector: (row) => row[4],
      width: "100px",                  
      wrap: true
    },
    {
      name: "Website",
      selector: (row) => row[5],
      width: "100px",                  
      wrap: true
    },
    {
      name: "Cuisine",
      selector: (row) => row[6],
      width: "100px",             
      wrap: true
    },    
    {
      name: "Rating (Average)",
      selector: (row) => row[7],
      width: "150px",             
      wrap: true
    },    
  ];
  
  useEffect(() =>{
  	const fecthData = async ()=>{
  		const response = await fetch("http://127.0.0.1:5000//restaurants/cuisines");
  		const cdata = await response.json();
  		console.log(cdata);
  		setCuisineList(cdata);
  	};
  	fecthData();
  }, []) 
  
	
  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("cuisineType="+cuisineSelected)
    try {
      let res = await fetch("http://127.0.0.1:5000/restaurants?zipCode="+zipCode +"&cuisineType="+cuisineSelected, {
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
		<h5> Restaurant Search (by Zipcode and Cuisine) </h5>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={zipCode}
          placeholder="zipCode"
          onChange={(e) => getZipcode(e.target.value)}
        />
        <br/>
        <select className="form-control" value={cuisineSelected} onChange={(e) => getCuisineSelected(e.target.value)}>
        	<option value="">Choose Cuisine</option>
        	{cuisineList.map(cuisine => (
        		<option value={cuisine}>{cuisine}</option>
        	))
        	}
        </select>
        <br/>        
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
export default RestaurantSearch2;