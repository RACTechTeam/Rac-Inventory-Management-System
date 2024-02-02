import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const GetAllItems = () => {
    const [companyData, setCompanyData] = useState([]);
    let i=1;
    
    useEffect(()=>{
      const fetchCompany = async () =>{
        try{
            const response = await axios.get("http://localhost:4000/rac/company/all");
            setCompanyData(response.data.allCompanyDetails);
            console.log(response.data.allCompanyDetails);
        }catch(err){
          console.log(err);
        }
    }
    fetchCompany();
    }, [])

  return (

    <>
      <div className='flex flex-col mt-2 p-5 mt-3 mb-1 w-full' style={{backgroundColor:'white', boxShadow:'0 4px 8px rgba(0, 0, 1, 0.1)'}}>
      <div className="font-poppins text-[#000000] overflow-x-auto">
        <h3 className='flex font-poppins text-[#000000] font-bold justify-center center mb-4'>Party Details</h3>
          <table className="font-poppins text-[#000000] min-w-full border rounded">
            <thead>
              <tr className="font-poppins text-[#000000] bg-gray-100">
                <th className="label-style font-poppins border">Sr. No.</th>
                <th className="label-style font-poppins border p-3">Ref. Number</th>
                <th className="label-style font-poppins border p-3">Company Name</th>
                <th className="label-style font-poppins border p-3">Supplier Name</th>
                <th className="label-style font-poppins border p-3">Mailing Name</th>
                <th className="label-style font-poppins border p-3">Address</th>
                <th className="label-style font-poppins border p-3">State</th>
                <th className="label-style font-poppins border p-3">Country</th>
              </tr>
            </thead>
            <tbody>
              { companyData.map((company, index)=>(
                 <tr key={index}  className="font-poppins text-[#000000] hover:bg-gray-100">
                   <td className="font-poppins text-[#000000] border p-3">{i++}</td>
                  <td className="font-poppins text-[#000000] border p-3">{company.refNumber}</td>
                  <td className="font-poppins text-[#000000] border p-3">{company.companyName}</td>
                  <td className="font-poppins text-[#000000] border p-3">{company.supplier}</td>
                  <td className="font-poppins text-[#000000] border p-3">{company.mailingName}</td>
                  <td className="font-poppins text-[#000000] border p-3">{company.address}</td>
                  <td className="font-poppins text-[#000000] border p-3">{company.state} </td>
                  <td className="font-poppins text-[#000000] border p-3">{company.country} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  );
};

export default GetAllItems;
