import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateItem.css'

const EditItems = () => {

  const {refNumber} = useParams();
  const [values, setValues] = useState({
    refNumber:refNumber,
    productName:'',
    productDescription:'',
    productCategory:'',
    productPrice:'',
    month:'',
    productEntryDate:'',
    productExpiryDate:'',
    numOfProducts:'',
    taxPercentage:'',
    cgstPercentage:'',
    sgst:'',
    totalPrice:'',
  });


  useEffect(()=>{

    axios.get(`http://localhost:4000/rac/product/`+refNumber)
    .then(res => {
      // console.log(res.data.product.refNumber)
      setValues({...values, 
        productName:res.data.product.productName, 
        productDescription: res.data.product.productDescription,
        productCategory:res.data.product.productCategory,
        productPrice:res.data.product.productPrice,
        productEntryDate: res.data.product.productEntryDate,
        productExpiryDate: res.data.product.productExpiryDate,
        numOfProducts: res.data.product.numOfProducts,
        taxPercentage:res.data.product.taxPercentage,
        cgstPercentage:res.data.product.cgstPercentage,
        sgstPercentage:res.data.product.sgstPercentage,
        totalPrice:res.data.totalPrice
      })
    })
    .catch(err=>console.log(err.message))

  },[])

  const navigate = useNavigate()

  const handleUpdate = (e) =>{
    e.preventDefault();
    axios.put(`http://localhost:4000/rac/product/update/${refNumber}`, values)
    .then(res=>{
      navigate("/dashboard/allitems");

    }).catch(err=>console.log(err));
  }

  return (
    <div>
       <div className="card-body mt-2 pb-5 overflow-y-hidden">
        <div className="row" >
          <div className="col-lg-8 mx-auto mt-5 p-5 "  style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)' }} >

          <div className="flex flex-col items-center mb-2 ">
  <h5 className="mb-4 text-center label-style font-poppins">Update The Item</h5>
</div>
    <form onSubmit={handleUpdate}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="refNumber" >Product Reference Number</label>
                <input type="text" id="refNumber" name="refNumber" className="form-control" placeholder="" value={values.refNumber} />
              </div>
              <div className="col-md-6">
                <label className="label-style font-poppins font-bold" htmlFor="productName" >Product Name</label>
                <label className="label-style font-poppins" htmlFor="productName" >Product Name</label>
                <div className="input-group input-group-merge">
                  <input className="form-control" type="text" id="productName" name="productName" value={values.productName} onChange={e=> setValues({...values,productName:e.target.value})} />
                </div>
              </div>

              <div className="col-12">
                <label className="label-style font-poppins" htmlFor="productDescription" >Product Decription</label>
                <textarea name="productDescription" className="form-control" id="productDescription" rows="2" placeholder="" value={values.productDescription} onChange={e=> setValues({...values,productDescription:e.target.value})}></textarea>
              </div>
              <div className="col-md-6">
                <label className="label-style font-poppins font-bold" htmlFor="productPrice">Product Price</label>
                <label className="label-style font-poppins" htmlFor="productPrice">Product Price</label>
                <input type="text" id="productPrice" name="productPrice" className="form-control phone-mask" value={values.productPrice} onChange={e=> setValues({...values,productPrice:e.target.value})} />
              </div>

              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productCategory" >Product Category</label>
                <input type="text" id="productCategory" name="productCategory" className="form-control phone-mask" value={values.productCategory} onChange={e=> setValues({...values,productCategory:e.target.value})}/>
              </div>

              {/* <div className="col-md">
                <label className="label-style font-poppins" htmlFor="month" id='month' name="month">Entry Month</label>
                <div className="position-relative"><select id="month" className="select2 form-select select2-hidden-accessible" data-allow-clear="true" data-select2-id="month" tabIndex="-1" aria-hidden="true">
                  <option value={values.month} data-select2-id="2"></option>
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
              </div> */}

<div className="col-md">
  <label className="label-style font-poppins" htmlFor="month">
    Entry Month
  </label>
  <div className="position-relative">
    <select
      id="month"
      className="select2 form-select select2-hidden-accessible"
      data-allow-clear="true"
      tabIndex="-1"
      aria-hidden="true"
      value={values.month} // Set the value dynamically
      onChange={(e) => setValues({ ...values, month: e.target.value })}
    >
      <option value="" data-select2-id="2"></option>
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
    </select>
    <span
      className="select2 select2-container select2-container--default"
      dir="ltr"
      style={{ width: '288.781px' }}
    >
      <span className="selection">
        <span
          className="select2-selection select2-selection--single"
          role="combobox"
          aria-haspopup="true"
          aria-expanded="false"
          tabIndex="0"
          aria-disabled="false"
          aria-labelledby="select2-state-container"
        >
          <span
            className="select2-selection__rendered"
            id="select2-state-container"
            role="textbox"
            aria-readonly="true"
          >
            <span className="select2-selection__placeholder"></span>
          </span>
          <span className="select2-selection__arrow" role="presentation">
            <b role="presentation"></b>
          </span>
        </span>
      </span>
      <span className="dropdown-wrapper" aria-hidden="true"></span>
    </span>
  </div>
</div>


              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productEntryDate">Product Entry Date</label>
                <input type="text" id="productEntryDate" name="productEntryDate" className="form-control phone-mask" placeholder=""     value={values.productEntryDate ? new Date(values.productEntryDate).toLocaleDateString() : ''}
 onChange={e=> setValues({...values,productEntryDate:e.target.value})} />
              </div>

              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="productExpiryDate">Product Expiry Date</label>
                <input type="text" id="productExpiryDate" name="productExpiryDate" className="form-control phone-mask" placeholder=""     value={values.productExpiryDate ? new Date(values.productExpiryDate).toLocaleDateString() : ''}
 onChange={e=> setValues({...values,productExpiryDate:e.target.value})} />
              </div>


              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="numOfProducts">Number of Products</label>
                <input type="text" id="numOfProducts" name="numOfProducts" className="form-control phone-mask" placeholder="" value={values.numOfProducts} onChange={e=> setValues({...values,numOfProducts:e.target.value})} />
              </div>
              
              <div className="col-md-6">
                <label className="label-style font-poppins" htmlFor="tax">tax</label>
                <input type="text" id="tax" name="tax" className="form-control" placeholder="" value={values.taxPercentage} onChange={e=> setValues({...values,taxPercentage:e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="label-style font-poppins font-bold" htmlFor="cgst">CGST</label>
                <label className="label-style font-poppins" htmlFor="cgst">CGST</label>
                <input type="text" id="cgst" name="cgst" className="form-control" placeholder="" value={values.cgstPercentage} onChange={e=> setValues({...values,cgstPercentage:e.target.value})} />
              </div>
              <div className="col-md">
                <label className="label-style font-poppins font-bold" htmlFor= "sgst">SGST</label>
                <label className="label-style font-poppins" htmlFor= "sgst">SGST</label>
                <input type="text" id="sgst" name="sgst" className="form-control" placeholder="" value={values.sgstPercentage} onChange={e=> setValues({...values,sgstPercentage:e.target.value})} />
              </div>

              {/* <div className="col-md">
                <label className="label-style font-poppins" htmlFor= "totalPrice">Total Price</label>
                <input type="text" id="totalPrice" name="totalPrice" className="form-control" placeholder="" value={values.totalPrice} onChange={e=> setValues({...values,totalPrice:e.target.value})} />
              </div>
  */}
              <div className="flex justify-center">
        <button className=" font-poppins text-[#000000] flex flex-col bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Update
        </button>
</div>
              </div>
  </form>
              </div>
              </div>
              </div>
    </div>
  )
}


export default EditItems