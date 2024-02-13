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
          <table className="font-poppins text-[#000000] min-w-full border rounded">
            <thead>
              <tr className="font-poppins text-[#000000] bg-gray-200">
                <th className="font-poppins text-[#000000] border p-2">Sr. No.</th>
                <th className="font-poppins text-[#000000] border p-2">Ref. Number</th>
                <th className="font-poppins text-[#000000] border p-2">Company Name</th>
                <th className="font-poppins text-[#000000] border p-2">Supplier Name</th>
                <th className="font-poppins text-[#000000] border p-2">Mailing Name</th>
                <th className="font-poppins text-[#000000] border p-2">Address</th>
                <th className="font-poppins text-[#000000] border p-2">State</th>
                <th className="font-poppins text-[#000000] border p-2">Country</th>
              </tr>
            </thead>
            <tbody>
              { companyData.map((company, index)=>(
                 <tr key={index}  className="font-poppins text-[#000000] hover:bg-gray-100">
                   <td className="font-poppins text-[#000000] border p-2">{i++}</td>
                  <td className="font-poppins text-[#000000] border p-2">{company.refNumber}</td>
                  <td className="font-poppins text-[#000000] border p-2">{company.companyName}</td>
                  <td className="font-poppins text-[#000000] border p-2">{company.supplier}</td>
                  <td className="font-poppins text-[#000000] border p-2">{company.mailingName}</td>
                  <td className="font-poppins text-[#000000] border p-2">{company.address}</td>
                  <td className="font-poppins text-[#000000] border p-2">{company.state} </td>
                  <td className="font-poppins text-[#000000] border p-2">{company.country} </td>
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
