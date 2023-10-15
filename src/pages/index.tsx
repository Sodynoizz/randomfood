import axios from 'axios';
import React from 'react';
import { useState } from 'react';


export default function Home() {
  const [info, setInfo] = useState();
  const [foodtype,setFoodtype] = useState('all')
  const [place,setPlace] = useState('all')
  const [error,setError] = useState(false)
  const [generate,setGenerate] = useState(false)
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://tucmcrandom-food-backend.vercel.app/api/random-foods',
    headers: { 
      'Content-Type': 'application/json'
    },
    data :JSON.stringify({
    "foodtype": foodtype,
    "place": place
  })
  };
  
  async function makeRequest() {
    try {
      const response = await axios.request(config);
      setInfo(response.data);
      setGenerate(true)
      setError(false)
      console.log(response.data);
    }
    catch (error) {
      setError(true)
      console.log(error);
    }
  }
  

  
  
  return (
    <div>
      <p className=' flex w-full justify-center my-10'>เลือกประเภทอาหาร</p>
      <div className=' flex flex-col justify-center items-center 2xs:flex-row 2xs:justify-evenly transition-all' >
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setFoodtype('อาหาร')}}>อาหารจานหลัก</button>
        </div>
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setFoodtype('เครื่องดื่ม')}}>เครื่องดื่ม</button>
        </div>
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setFoodtype('ของทานเล่น')}}>ของทานเล่น</button>
        </div>
      </div>
      <p className=' flex w-full justify-center my-10'>เลือกโรงอาหาร</p>
      <div className='  grid place-items-center grid-cols-2 xs:flex xs:flex-row xs:justify-evenly'>
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setPlace('โดมทอง')}}>โดมทอง</button>
        </div>
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setPlace('ใต้ตึก 50 ปี')}}>ใต้ตึก 50 ปี</button>
        </div>
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setPlace('โรงใหญ่')}}>โรงใหญ่</button>
        </div>
        <div>
          <button className=' bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={() => {setPlace('โรง 80 ปี')}}>โรง 80 ปี</button>
        </div>
      </div>
      <div className='flex justify-center my-10'>
        <button className='bg-pink-200 hover:bg-pink-300 focus:bg-pink-500 px-4 py-1 rounded-xl my-3 transition duration-500' onClick={makeRequest}>random</button>
      </div>
      <div className= {error ? "block" : "hidden"}>
        <p className=' flex w-full justify-center my-5 text-red-700'>Error : there is no such combination</p>
      </div>

      <div className= {generate ? "block" : "hidden"}>
        <p className=' flex w-full justify-center my-5'>เมนูอาหาร : {(info as any).foodname}</p>
        <p className=' flex w-full justify-center my-5'>ร้านค้า : {(info as any).shopname}</p>
        <p className=' flex w-full justify-center my-5'>สถานที่ : {(info as any).place}</p>
        <p className=' flex w-full justify-center my-5'>ราคา(บาท) : {(info as any).price}</p>
      </div>
      
    </div>
  );
}
