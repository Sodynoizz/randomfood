import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

export default function Search() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  function handleinput(event: any) {
    setInput(event.target.value);
  }

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      makeRequest()
    }
  };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tucmcrandom-food-backend.vercel.app/api/search-menu-by-name",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      foodname: input,
    }),
  };

  useEffect(() => {  
    makeRequest()

    
  }, []);

  async function makeRequest() {
    try {
      const response = await axios.request(config);
      console.log(response.data);
      setResults(response.data);
      setError(false)
    } catch (error) {
      console.log(error);
      setError(true)
    }
  }

  const arrayResult = results.map((result) => 
  <div key={result['id']} className=" m-5 bg-[#edf5f7] w-96 h-64 rounded-md border-slate-300 border-solid border-2 p-6">
  <p>id : {result['id']}</p>
  <p>เมนูอาหาร : {result['foodname']}</p>
  <p>ประเภทอาหาร : {result['foodtype']}</p>
  <span>ชื่อร้าน : {result['shopname']} </span>
  <span>สถานที่ : {result['place']}</span>
  <p>ราคา(บาท) : {result['price']}</p>
  <p>note : {result['note']}</p>
  <p>images : {result['images']}</p>
  </div> )


  return (
    <>
      <div className="flex align-middle justify-center text-center mt-5">
        <label className=" flex w-3/5  lg:w-2/5 align-middle justify-center text-center">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={input}
            onInput={handleinput}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
      <div className="flex justify-center">
        <button
          className=" bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-5 transition duration-500 "
          onClick={makeRequest}
        >
          search
        </button>
      </div>
      <div className={error ? "block" : "hidden"}>
        <p className=" flex w-full justify-center my-5 text-red-700">
          Error : there is no result
        </p>
      </div>
      <div className=" grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3">
        {arrayResult}
      </div>  
    </>
  );
}
