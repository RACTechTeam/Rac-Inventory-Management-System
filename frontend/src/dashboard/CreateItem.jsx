import React, { useEffect, useRef, useState } from 'react'
import './CreateItem.css'
import axios from 'axios';

const CreateItem = () => {
 

  //GET SELECTED MONTH
  const [selectedMonth, setSelelectedMonth] = useState('');

  const handleMonthChange = (e) =>{
    const selectedValue = e.target.value;
    // console.log(selectedValue);

    setSelelectedMonth(selectedValue);
    // console.log(selectedMonth);
  }

  const formatDateString = (dateString) => {
    const [day, month, year] = dateString.split('/');
    // Ensure proper formatting (assuming dd-mm-yyyy)
    return `${year}-${month}-${day}`;
  };


  const handleInsertItems = async(event)=>{
    event.preventDefault();
    const form = event.target;

    const productObj = {
    refNumber : form.refNumber.value,
     productName : form.productName.value,
     productDescription : form.productDescription.value,
     productPrice : form.productPrice.value,
     productCategory : form.productCategory.value,
     month : selectedMonth,
     productEntryDate: formatDateString(form.productEntryDate.value),
      productExpiryDate: formatDateString(form.productExpiryDate.value),
     numOfProducts : form.numOfProducts.value,
     tax : form.tax.value,
     cgst : form.cgst.value,
     sgst : form.sgst.value,
    };

    console.log(productObj);

    try{
      const res = await axios.post("http://localhost:4000/rac/product/new", productObj);

      console.log(`Item inserted successfully`, res.data);
      alert('Item inserted successfully');
      
    }catch(err){
      console.error(`Item not inserted`, err.message);

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
  }

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter" (key code 13)
    if (e.key === 'Enter') {
      // Trigger form submission
      handleInsertItems(e);
    }
  }


  return (
    <div className="card-body mt-2 pb-5 overflow-x-hidden">
        <div className="row" >
          <div className="col-lg-10 mx-auto mt-5 p-5 "  style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)' }} >

          <div className="flex flex-col items-center mb-2 ">
  <h5 className="mb-4 text-center" style={{color:'black', fontSize:'2rem'}}>Insert new Item</h5>
</div>
    <form onSubmit={handleInsertItems}>
            <div className="mt-4 row g-3">
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="refNumber">Product Reference Number <span className='text-red-500'>*</span></label>
                <input type="text" id="refNumber" name="refNumber" className="form-control" autoComplete='off' placeholder=""/>
              </div>
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productName">Product Name <span className='text-red-500'>*</span></label>
                <div className="input-group input-group-merge">
                  <input className="form-control" type="text" id="productName" autoComplete='off' name="productName"/>
                </div>
              </div>

              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productDescription">Product Decription <span className='text-red-500'>*</span></label>
                <textarea name="productDescription" className="form-control" id="productDescription" autoComplete='off' rows="2" placeholder=""></textarea>
              </div>
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productPrice">Product Price <span className='text-red-500'>*</span></label>
                <input type="text" id="productPrice" name="productPrice" autoComplete='off' className="form-control phone-mask"/>
              </div>

              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productCategory">Product Category <span className='text-red-500'>*</span></label>
                <input type="text" id="productCategory" name="productCategory" autoComplete='off' className="form-control phone-mask"/>
              </div>

              <div className="col-md">
                <label className="label-style font-poppins" htmlFor="month" id='month' name="month">Entry Month <span className='text-red-500'>*</span></label>
                <div className="position-relative"><select onChange={handleMonthChange} id="month" className="select2 form-select select2-hidden-accessible" data-allow-clear="true" data-select2-id="month" tabIndex="-1" aria-hidden="true">
                  <option value="" data-select2-id="2">Select</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                  
                </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1" style={{ width: '288.781px' }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-state-container"><span className="select2-selection__rendered" id="select2-state-container" role="textbox" aria-readonly="true"><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span></div>
              </div>

              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productEntryDate">Product Entry Date <span className='text-red-500'>*</span></label>
                <input type="text" id="productEntryDate" name="productEntryDate" autoComplete='off' className="form-control phone-mask" placeholder=""/>
              </div>

              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productExpiryDate">Product Expiry Date <span className='text-red-500'>*</span></label>
                <input type="text" id="productExpiryDate" name="productExpiryDate" autoComplete='off' className="form-control phone-mask" placeholder=""/>
              </div>


              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="numOfProducts">Number of Products <span className='text-red-500'>*</span></label>
                <input type="text" id="numOfProducts" name="numOfProducts" autoComplete='off' className="form-control phone-mask" placeholder=""/>
              </div>
              
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="tax">tax</label>
                <input type="text" id="tax" name="tax" className="form-control" autoComplete='off' placeholder=""/>
              </div>
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="cgst">CGST</label>
                <input type="text" id="cgst" name="cgst" className="form-control" autoComplete='off' placeholder=""/>
              </div>
              <div className="col-md">
                <label className="label-style font-poppins" htmlFor= "sgst">SGST</label>
                <input type="text" id="sgst" name="sgst" className="form-control" autoComplete='off' placeholder=""/>
              </div>
 
              <div className="flex justify-center">
        <button className="flex flex-col bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Submit
        </button>
</div>
              </div>
  </form>
              </div>
              </div>
              </div>
  )
}

export default CreateItem