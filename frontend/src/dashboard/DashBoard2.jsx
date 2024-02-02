import React from 'react';
import '../Components/styles/dashboard.css';
import { FaChartLine} from 'react-icons/fa';

const DashBoard2 = () => {
  return (
    <div className='flex flex-wrap'>
      <div className='flex-item '>
        <div className='bg-white p-5 w-20rem m-4' style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
        <h5 className='' >Total Stock
        </h5><h3>1000</h3>
        <div className='flex'>
        <FaChartLine className='ml-3' style={{color:'#11f51d'}}/> 
        <h4 className='mr-3 mt-1x' style={{color:'#11f51d'}}>40%</h4>
        pichart
        </div>

        
        </div>
        
      </div>

      <div className='flex-item'>
        <h5 className='bg-white p-5 rounded m-4 sm:w-12rem lg:w-20rem' style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>Total Stock</h5>
        
        
      </div>

      <div className='flex-item'>
        <h5 className='bg-white p-5 rounded m-4 sm:w-12rem lg:w-20rem' style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>Total Stock</h5>
      </div>

      <div className='flex-item'>
        <h5 className='bg-white p-5 rounded m-4 sm:w-12rem lg:w-20rem' style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>Total Stock</h5>
      </div>
    </div>
  );
};

export default DashBoard2;
