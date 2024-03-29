import React, { useState } from 'react';
import axios from 'axios';

const AddSupplier = () => {
  const [refNumber, setNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [supplier, setSupplier] = useState('');
  const [mailingName, setMailingname] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      refNumber,
      companyName,
      supplier,
      mailingName,
      address,
      state,
      country,
     
    };

    try {
      // Make a POST request using Axios
      const response = await axios.post('http://localhost:4000/rac/company/new', data);

      if (response.status === 200) {
        console.log('Supplier added successfully');
        // Optionally, you can reset the form fields after a successful submission
        setNumber('');
        setCompanyName('');
        setSupplier('');
        setMailingname('');
        setAddress('');
        setState('');
        setCountry('');
        // Reset other state variables as needed
      } else {
        console.error('Failed to add supplier');
      }
    } catch (error) {
      console.error('Error occurred while adding supplier', error);
    }
  };

  return (
    <div className="font-poppins card-body mt-2 pb-5 overflow-y-hidden">
    <div className="font-poppins row">
      <div
        className="font-poppins col-lg-8 mx-auto mt-5 p-5 "
        style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)' }}
      >
        <div className="font-poppins flex flex-col items-center mb-2 ">
          <h5 className="font-poppins  text-[#000000] font-bold  mb-2 text-center">Add Supplier</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="font-poppins text-[#000000] row g-3">
            <div className="font-poppins text-[#000000] col-md-6">
              <label className="font-poppins text-[#000000] text-2xl form-label" htmlFor="refNumber">Reference Number</label>
              <input type="text" value={refNumber}  onChange={(e) => setNumber(e.target.value)}  id="refNumber" name="refNumber" className="font-poppins text-[#000000] form-control " placeholder=""/>
            </div>
            <div className="font-poppins text-[#000000] col-md-6 ">
              <label className="font-poppins text-[#000000] form-label" htmlFor="mailingname">Mailing Name</label>
              <input type="text" value={mailingName}  onChange={(e) => setMailingname(e.target.value)}  id="mailingname" name="mailingname" className="font-poppins text-[#000000] form-control phone-mask"/>
            </div>
            <div className="font-poppins text-[#000000] col-12">
              <label className="font-poppins text-[#000000] form-label" htmlFor="companyname">Company Name</label>
              <textarea name="companyname" className="font-poppins text-[#000000] form-control"  value={companyName}  onChange={(e) => setCompanyName(e.target.value)} id="companyname" rows="2" placeholder=""></textarea>
            </div>
            <div className="font-poppins text-[#000000] col-md-6">
              <label className="font-poppins text-[#000000] form-label" htmlFor="supplier">Supplier</label>
              <div className="font-poppins text-[#000000] input-group input-group-merge">
                <input className="font-poppins text-[#000000] form-control" type="text" value={supplier}  onChange={(e) => setSupplier(e.target.value)} id="supplier" name="supplier"/>
              </div>
            </div>
                     
            

            <div className="font-poppins text-[#000000] col-md-6">
              <label className="font-poppins text-[#000000] form-label" htmlFor="address">Address</label>
              <input type="text" value={address}  onChange={(e) => setAddress(e.target.value)}  id="address" name="address" className="font-poppins text-[#000000] form-control phone-mask"/>
            </div>

            <div className="font-poppins text-[#000000] col-md-6">
              <label className="font-poppins text-[#000000] form-label" htmlFor="state">State</label>
              <input type="text" value={state}  onChange={(e) => setState(e.target.value)}  id="state" name="state" className="font-poppins text-[#000000] form-control phone-mask" placeholder=""/>
            </div>
            <div className="font-poppins text-[#000000] col-md-6">
              <label className="font-poppins text-[#000000] form-label" htmlFor="country">Country</label>
              <input type="text" value={country}  onChange={(e) => setCountry(e.target.value)}  id="country" name="country" className="font-poppins text-[#000000] form-control phone-mask" placeholder=""/>
            </div>

            
            <div className="font-poppins text-[#000000] flex justify-center">
<button type='submit' className="font-poppins text-[#000000] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-5">
  Add Supplier
</button>
</div>
            </div>
</form>
      </div>
    </div>
  </div>
  );
};

export default AddSupplier;