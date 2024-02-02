import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FaDownload, FaEdit, FaTrash } from 'react-icons/fa';
import ExcelJS from 'exceljs';
import './Createitem.css'



const GetAllItems = () => {
  const [data, setMyData] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedItemRefNumber, setSelectedItemRefNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/rac/products");
        setMyData(response.data.products);
        console.log(response.data.products);
      } catch (err) {
        console.log('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async(itemRefnumber)=>{
    try{

      await axios.delete(`http://localhost:4000/rac/product/${itemRefnumber}`);

    }catch(err){
      console.error('error')
    }
  };

  const handleButtonClick=(itemRefnumber)=>{
    setSelectedItemRefNumber(itemRefnumber);
    setFormVisible(true);
  };

  const handleCloseClick=()=>{
    setFormVisible(false);
  }

  const handleDownloadExcel = async()=>{
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Items');

    //add header
    const headerRow = worksheet.addRow([
      'Ref. Number',
      'Name',
      'Description',
      'Price',
      'Category',
      'Entry Month',
      'Entry Date',
      'Expiry Date',
      'Total Stock',
      'Total Price'
    ]);

    //Add data rows
    data.forEach((item)=>{
      worksheet.addRow([
        item.refNumber,
        item.productName,
        item.productDescription,
        `Rs ${item.productPrice}`,
        item.productCategory,
        item.month,
        item.productEntryDate,
        item.productExpiryDate,
        item.numOfProducts,
        parseFloat(item.totalPrice.$numberDecimal)
      ]);
    });

    //generate excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = window.URL.createObjectURL(blob);

    //create a link elements to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ProductInvoice.xlsx';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  return (

    <>
    
      <div className='flex flex-col mt-2 p-5 mt-3 mb-1 w-full' style={{backgroundColor:'white', boxShadow:'0 4px 8px rgba(0, 0, 1, 0.1)'}}>
      <h3 className='flex justify-center font-poppins' style={{color:'black', fontWeight:'800'}}>All Products</h3>
      <div className='flex justify-end mb-4'>
        

<div className='flex justify-end mb-4'>
        <button
          className="flex bg-blue-500 hover:bg-blue-700 font-poppins text-white font-bold py-3 px-3 border border-blue-700 rounded"
          onClick={handleDownloadExcel}
        >
          <FaDownload className='mr-2 mt-1' /> Download Excel
        </button>
      </div>
      </div>

        <table id='items-table'>
          
          {/* <thead>
            <tr className='font-poppins text-[#000000] bg-gray-100'>
              <th className='label-style font-poppins text-[#000000] font-bold'>Ref. Number</th>
              <th className='font-poppins text-[#000000] font-bold '>Name</th>
              <th className='font-poppins text-[#000000] font-bold'>Description</th>
              <th className='font-poppins text-[#000000] font-bold'>Price</th>
              <th className='font-poppins text-[#000000] font-bold'>Category</th>
              <th className='font-poppins text-[#000000] font-bold'>Edit</th>
              <th className='font-poppins text-[#000000] font-bold'>Delete</th>

            </tr>
          </thead> */}

<thead>
              <tr className="font-poppins text-[#000000] bg-gray-100">
                {/* <th className="label-style font-poppins border">Sr. No.</th> */}
                <th className="label-style font-poppins border p-3">Ref. Number</th>
                <th className="label-style font-poppins border p-3">Product Name</th>
                <th className="label-style font-poppins border p-3">Description</th>
                <th className="label-style font-poppins border p-3">Product Price</th>
                <th className="label-style font-poppins border p-3">Category</th>
                <th className="label-style font-poppins border p-3">Edit</th>
                <th className="label-style font-poppins border p-3">Delete</th>
              </tr>
            </thead>
         
        {isFormVisible && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <form className="bg-white p-8 rounded-md shadow-md">
              <div className="flex justify-end">
              
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <h4 className='font-poppins mb-6'>Are you sure you want to delete the item?</h4>

              <div className='flex'>
              <button
                type="submit"
                className="bg-blue-500 text-white w-20 p-2 mb-4 rounded-md m-auto"
                onClick={handleCloseClick}
              >
                No
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white w-20 p-2 mb-4 rounded-md m-auto"
                onClick={()=>handleDelete(selectedItemRefNumber)}
              >
                Yes
              </button>
              </div>
            </form>
          </div>
        )}

          <tbody>
            {

              data.map((item, index)=>(
                <tr key={index} style={{borderBottom:'1px solid rgba(211,211,211, 0.8)'}}>
                  <td className='p-4 font-poppins text-[#000000] border p-3'>{item.refNumber}</td>
                  <td className='p-4 font-poppins text-[#000000] border p-3'>{item.productName}</td>
                  <td className='p-4 font-poppins text-[#000000] border p-3'>{item.productDescription}</td>
                  <td className='p-4 font-poppins text-[#000000] border p-3'>Rs. {item.productPrice}</td>
                  <td className='p-4 font-poppins text-[#000000] border p-3'>{item.productCategory}</td>
                <td className='p-4 font-poppins text-[#000000] border p-3'> <Link to={`/dashboard/edit/${item.refNumber}`}> <FaEdit className='cursor-pointer text-lg text-green-500 hover:text-green-700 transition duration-300 ease-in-out' />
</Link> </td>
                  <td className='p-4 font-poppins text-[#000000] border p-3'> <FaTrash className='text-gray-600 text-lg hover:text-red-700 hover:cursor-pointer transition duration-300 ease-in-out' onClick={() => handleButtonClick(item.refNumber)} />
</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>

  );
};

export default GetAllItems;
