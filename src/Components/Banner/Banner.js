import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState();
  
  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`);
        const results = response.data.results;
        const randomIndex = Math.floor(Math.random() * Math.min(19, results.length));
        setMovie(results[randomIndex]);
      } catch (error) {
        console.error('Error fetching random movie:', error);
      }
    };

    fetchRandomMovie(); // Initial fetch

    const intervalId = setInterval(fetchRandomMovie, 3000); // Fetch every 3 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}
      className='banner'
    >
      <div className='content'>
        <h1 className='title'>{movie ? movie.title : ''}</h1>
        <div className='banner_buttons'>
          <button className='button'>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className='fade_bottom'></div>
    </div>
  );
}

export default Banner;
