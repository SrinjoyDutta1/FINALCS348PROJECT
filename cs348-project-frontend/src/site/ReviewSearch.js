import React from 'react'
import { useState } from "react";
import DataTable from "react-data-table-component";


function ReviewSearch() {



  const [username, getUsername] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const columns = [
    {
      name: "Restaurant Name",
      selector: (row) => row[0],
      width: "200px",
      wrap: true,
    },
    {
      name: "Rating",
      selector: (row) => row[1],
      width: "100px",      
      wrap: true
    },
    {
      name: "Review",
      selector: (row) => row[2],
      wrap: true
    },
  ];  

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("http://127.0.0.1:5000/reviews?username="+username, {
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
       
            <h5> Review Search (by User) </h5>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => getUsername(e.target.value)}
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
export default ReviewSearch;