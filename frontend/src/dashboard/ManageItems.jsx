import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const ManageItems = () => {
  const [refNumber, setRefNumber] = useState('');
  const [itemInfo, setItemInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  const handleSearch = async () => {
    try {
      // Check if refNumber is not empty
      if (refNumber.trim() === '') {
        console.log('Please enter a reference number.');
        return;
      }

      // Fetch item information
      const itemResponse = await axios.get(`http://localhost:4000/rac/product/${refNumber}`);
      setItemInfo(itemResponse.data.product);

      // Fetch company details
      const companyResponse = await axios.get(`http://localhost:4000/rac/company/${refNumber}`);
      console.log('Company Details:', companyResponse.data.company);

      const companyData = companyResponse.data.company;

      if(companyData){
        setCompanyInfo(companyResponse.data.company);
      }
      else{
        setCompanyInfo(null);
      }

      
    } catch (err) {
      console.error('Error fetching information:', err);

      if (err.response) {
        // Accessing the error response from the server
        const errorResponse = err.response.data;
  
        console.error(`Server error response:`, errorResponse);
        alert(`Error: ${errorResponse.message}`);
        
      } else {
        console.error(`Error during item insertion`, err);
        alert(`Error`);
      }
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const renderTotalPrice = () => {
    if (itemInfo && itemInfo.totalPrice && itemInfo.totalPrice["$numberDecimal"]) {
      const totalPriceValue = parseFloat(itemInfo.totalPrice["$numberDecimal"]);
      if (!isNaN(totalPriceValue)) {
        return <p>{totalPriceValue.toFixed(2)}</p>;
      }
    }
  }

  const formatExpiryDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <div className='flex flex-col text-center pt-4 mt-2 pr-5 mt-3 mb-1 w-full pr-2 overflow-x-hidden ' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)', height:'100vh' }}>
      <div>
        <div>
          <h4 className='font-poppins font-bold text-black'>Enter the Reference Number of the item you want to edit</h4>
          <div className="text-center">
            <input
              className='m-3 border rounded-md p-3 mr-5 w-80'
              type="text"
              id='refNumber'
              name='refNumber'
              placeholder='Reference Number'
              value={refNumber}
              autoComplete='off'
              onChange={(e) => setRefNumber(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 font-poppins text-white font-bold py-3 px-4 border border-blue-700 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        {itemInfo && companyInfo &&  (
  <div className="flex flex-col mt-5 p-3">
    
  <h4 className='font-poppins font-bold text-black text-xl mb-3'>Item Information:</h4>
  <Link to={`/dashboard/edit/${itemInfo.refNumber}`}
      className="bg-blue-500 hover:bg-blue-700 flex flex-col text-white m-auto px-4 py-2 rounded font-poppins font-bold text-black text-xl mb-3"
    >
      Edit
    </Link>
  <div className="item-details">

    <div className="w-[1100px] h-[809px] relative rounded-lg">
    <div className="left-[19px] top-[75px] absolute text-gray-600 text-base font-bold text-xl font-poppins text-black leading-normal">Overiew</div>
    <div className="left-[43px] top-[141px] absolute text-gray-600 text-base font-semibold font-poppins text-black leading-normal">Primary Details</div>
    <div className="left-[703px] top-[141px] absolute text-gray-600 text-base font-semibold font-poppins text-black leading-normal">Supplier Details</div>
    <div className="left-[43px] top-[530px] absolute text-gray-600 text-base font-semibold font-poppins text-black leading-normal">Total Price</div>
    <div className="left-[283px] top-[530px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{renderTotalPrice()} </div>
    <div className="left-[43px] top-[183px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Product name:</div>
  <div className="left-[703px] top-[183px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Supplier Name:</div>
    <div className="left-[283px] top-[183px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.productName}</div>
    <div className="left-[883px] top-[183px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{companyInfo.supplier}</div>
    <div className="left-[43px] top-[235px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Product ID:</div>
    <div className="left-[703px] top-[235px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Company Name:</div>
    <div className="left-[703px] top-[287px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Mailing Name:</div>
    <div className="left-[883px] top-[287px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{companyInfo.mailingName}</div>
    <div className="left-[703px] top-[339px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Address:</div>
    <div className="left-[883px] top-[339px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{companyInfo.address}</div>
    <div className="left-[703px] top-[400px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">State:</div>
    <div className="left-[883px] top-[400px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{companyInfo.state}</div>
    <div className="left-[703px] top-[460px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Country:</div>
    <div className="left-[883px] top-[460px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{companyInfo.country}</div>


    <div className="left-[283px] top-[235px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.refNumber}</div>
    <div className="left-[883px] top-[235px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{companyInfo.companyName}</div>
    {/* <div className="left-[668px] top-[693px] absolute text-blue-600 text-base font-medium font-poppins text-black leading-tight">19</div> */}
    <div className="left-[43px] top-[287px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Product category</div>
    <div className="left-[283px] top-[287px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.productCategory}</div>
    <div className="left-[43px] top-[339px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Expiry Date</div>
    <div className="left-[283px] top-[339px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{formatExpiryDate(itemInfo.productExpiryDate)}</div>
    <div className="left-[43px] top-[391px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal"> </div>
    <div className="w-[1205px] h-[1px] left-[150px] top-[111px] absolute border border-gray-100"></div>
    <div className="left-[43px] top-[400px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Opening Stock</div>
    <div className="left-[43px] top-[460px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Remaining  Stock</div>
    <div className="left-[43px] top-[537px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal"> </div>
    <div className="left-[283px] top-[400px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-normal">40</div>
    <div className="left-[283px] top-[460px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-normal">{itemInfo.numOfProducts}</div>
    {/* <div className="w-[75px] h-0.5 left-[16px] top-[109px] absolute bg-blue-600 rounded-[10px]"></div>
    <div className="w-[689px] h-10 left-[37px] top-[653px] absolute opacity-50 bg-gray-100 border-b border-gray-100"></div>
    <div className="left-[43px] top-[591px] absolute text-gray-500 text-base font-semibold font-poppins text-black leading-tight">Store Name</div>
    <div className="left-[592px] top-[591px] absolute text-gray-500 text-sm font-semibold font-poppins text-black leading-tight">Stock in hand</div> */}
   <div className=''>
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              
            >
              Download
            </button> */}
   </div>
</div>
  </div>
</div>

)}


{itemInfo && !companyInfo &&  (
  <div className="flex flex-col mt-5 p-3">
  <div>
    <h4 className='font-poppins font-bold text-black text-xl mb-3'>Item Information:</h4>
  </div>
  <div className="flex justify-center items-center">
  <Link to={`/dashboard/edit/${itemInfo.refNumber}`}
      className="bg-blue-500 hover:bg-blue-700 flex flex-col text-white m-auto px-4 py-2 rounded font-poppins font-bold text-black text-xl mb-3"
    >
      Edit
    </Link>
  </div>

  <div className="item-details">

    <div className="w-[1096px] h-[809px] relative  rounded-lg">
    <div className="left-[19px] top-[75px] absolute text-gray-600 text-base font-bold text-xl font-poppins text-black leading-normal">Overiew</div>
    <div className="left-[43px] top-[141px] absolute text-gray-600 text-base font-semibold font-poppins text-black leading-normal">Primary Details</div>
    <div className="left-[703px] top-[141px] absolute text-gray-600 text-base font-semibold font-poppins text-black leading-normal">Supplier Details</div>
    <div className="left-[43px] top-[660px] absolute text-gray-600 text-base font-semibold font-poppins text-black leading-normal">Total Price</div>
    <div className="left-[43px] top-[530px] absolute text-gray-600 text-base  font-poppins text-black leading-normal">Product Price</div>
    <div className="left-[283px] top-[530px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.productPrice} </div>

    <div className="left-[283px] top-[660px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{renderTotalPrice()} </div>
    <div className="left-[43px] top-[183px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Product name:</div>

  <div className="left-[703px] top-[183px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Supplier Name:</div>
    <div className="left-[283px] top-[183px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.productName}</div>
    <div className="left-[43px] top-[235px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Product ID:</div>
    <div className="left-[703px] top-[235px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Company Name:</div>
    <div className="left-[703px] top-[287px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Mailing Name:</div>
    <div className="left-[703px] top-[339px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Address:</div>
    <div className="left-[703px] top-[400px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">State:</div>
    <div className="left-[703px] top-[460px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Country:</div>


    <div className="left-[283px] top-[235px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.refNumber}</div>
    <div className="left-[43px] top-[287px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Product category</div>
    <div className="left-[283px] top-[287px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{itemInfo.productCategory}</div>
    <div className="left-[43px] top-[339px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Expiry Date</div>
    <div className="left-[283px] top-[339px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-tight">{formatExpiryDate(itemInfo.productExpiryDate)}</div>
    <div className="left-[43px] top-[391px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal"> </div>
    <div className="w-[1005px] h-[0px] left-[40px] top-[111px] absolute border border-gray-100"></div>
    <div className="left-[43px] top-[400px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Opening Stock</div>
    <div className="left-[43px] top-[460px] absolute text-gray-400 text-base font-normal font-poppins text-black leading-normal">Remaining  Stock</div>
    <div className="left-[283px] top-[400px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-normal">40</div>
    <div className="left-[283px] top-[460px] absolute text-gray-500 text-base font-medium font-poppins text-black leading-normal">{itemInfo.numOfProducts}</div>
    <div className="w-[75px] h-0.5 left-[16px] top-[109px] absolute bg-blue-600 rounded-[10px]"></div>
    <div className="w-[689px] h-10 left-[37px] top-[653px] absolute opacity-60 bg-white-100 border-b border-gray-100"></div>

   <div className=''>

            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              
            >
              Download
            </button> */}
   </div>
</div>
  </div>
</div>

)}

      </div>
    </div>
  );
};

export default ManageItems
