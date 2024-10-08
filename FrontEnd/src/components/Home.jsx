import React, { useEffect, useState } from 'react';
import items from "../Data/categories.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard.jsx';
import { useSelector } from 'react-redux';

const Home = () => {
  const [fetchedProperties, setFetchedProperties] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const resp = await axios.get('http://localhost:3000/api/host/');
        setFetchedProperties(resp.data);
        setHasFetched(true);
      } catch (error) {
        console.log(error);
        setHasFetched(false);
      }
    };
    if (!hasFetched) {
      fetchProperties();
    }
  }, [hasFetched]);
  useEffect(() => {
    console.log("fetchedProperties", fetchedProperties)
  }, [fetchedProperties])

  return (
    <>
      <div className="bg-fav-color">
        <div
          className="relative min-h-[75vh] w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://hips.hearstapps.com/hmg-prod/images/alpe-di-siusi-sunrise-with-sassolungo-or-langkofel-royalty-free-image-1623254127.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-black opacity-55"></div>
          <div className="relative p-8 rounded-lg text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Room with Homely
            </h1>
            <p className="text-base md:text-lg text-white mb-6">
              Discover a wide range of affordable and cozy homes tailored to your needs.
              Whether you’re looking for a short-term stay or a long-term home, Homely has you covered.
            </p>
            <Link
              to={user.user ? "/listProperty" : "/login"}
              className="bg-f-color text-white py-2 px-4 rounded-lg border border-transparent hover:border-white hover:border-2 transition duration-300 ease-in-out w-full"
            >
              Host A Property
            </Link>
          </div>
        </div>
        <div className="categories">
          <h1 className="text-4xl font-bold mb-4 font-yusei mx-10 my-5 text-black">Top Categories</h1>
          <div className="w-full p-8">
            <div className="h-[200px] m-auto overflow-hidden relative w-auto my-5">
              <ul className="flex w-[calc(250px*14)] animate-scroll justify-center items-center gap-5 categories-section">
                {items.concat(items).map((item, index) => (
                  <li
                    key={index}
                    className="w-[250px] h-[200px] relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-lg"
                    style={{
                      backgroundImage: `url(${item.image})`
                    }}
                  >
                    <span className="absolute bottom-0 w-full bg-black bg-opacity-75 text-white text-center py-1">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="properties">
          <h1 className="text-4xl font-bold mb-4 font-yusei mx-10 my-5 text-black">Recently Added Properties</h1>
          <div className='px-12 pb-32  lg:px-5 flex flex-wrap justify-center gap-1'>
            {fetchedProperties.length === 0 && <PropertyCard
              photos={[]}
            />}
            {fetchedProperties.map(({ _id, creator, photos, city, state, country, category, type, price, booking = false }) => (
              <PropertyCard
                key={_id}
                id={_id}
                creator={creator}
                photos={photos}
                city={city}
                state={state}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
