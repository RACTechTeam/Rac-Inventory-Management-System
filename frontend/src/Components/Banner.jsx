import React from 'react'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
            
                {/* left side */ } 
                <div className='md:w-1/2 space-y-8 h-full'>
                    <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Items here</h2>
                    <p className='md:w-4/5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti obcaecati itaque earum ratione aspernatur et optio. Nobis excepturi aspernatur labore fugit?</p>
                    <div>
                        <input type="text" placeholder='Search an Item' name='search' id='search' className='py-2 px-2 rounded-s-sm outline-none'/>
                        <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all duration-200'>Search</button>
                    </div>
                </div>

                {/* right side */ }
                 <div>Right Side</div>
            
        </div>
    </div>
  )
}

export default Banner