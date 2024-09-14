import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PropertyCard = ({
  id,
  creator,
  photos,
  city,
  state,
  country,
  category,
  type,
  price,
  booking
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  const showNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 ) % photos.length)
  }

  return (
    <div className='relative cursor-pointer p-3 rounded-lg hover:shadow-lg  bg-proper mx-2'
      onClick={() => {
        navigate(`/properties/${id}`)
      }}>
      <div className='w-72 overflow-hidden rounded-lg mb-2.5 '>
        <div className='flex w-full items-center transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
          {photos?.map((photo, index) => (
            <div
              className='relative flex-none w-full h-64 flex items-center justify-center bg-gray-200'
              key={index}
            >
              <img
                src={`http://localhost:3000/${photo?.replace('public', '')}`}
                alt=""
                className='w-full h-full object-cover'
              />

              <div className='absolute top-1/2 transform-translate-y-1/2 p-2 rounded-full border-none cursor-pointer flex items-center justify-center bg-white/80  z-50 left-1.5 hover:bg-white'
                onClick={(e) => {
                  e.stopPropagation()
                  showPrevSlide()
                }}
              ><FaArrowLeft /></div>

              <div className='absolute top-1/2 transform-translate-y-1/2 p-2 rounded-full border-none cursor-pointer flex items-center justify-center bg-white/80 z-50 right-1.5 hover:bg-white'
                onClick={(e) => {
                  e.stopPropagation()
                  showNextSlide()
                }}
              ><FaArrowRight /></div>
            </div>
          ))}
        </div>
      </div>
       <h3 className='items-center justify-center font-poppins text-sm font-bold'>{city}, {state}, {country}</h3>
       <p className='font-semibold text-sm'>{category}</p>
       <p className='font-semibold text-sm'>{type}</p>
       <span className='font-semibold text-md'>₹{price}</span>
    </div>
  );
}

export default PropertyCard;

