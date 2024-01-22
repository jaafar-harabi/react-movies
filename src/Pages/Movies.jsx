import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Select, Option, Card,
  CardHeader,
  CardBody,
  Typography} from "@material-tailwind/react";
import url from '../Services/requests'
import { ThumbUpSharp } from '@material-ui/icons'
import { Box,Pagination} from '@mui/material'
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};



const urlRegister = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

const Movies = () => {
  
  const [selectedGenreURL, setSelectedGenreURL] = useState(url.trendingMovies);
  const [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");




  const selectHandler = (e)=>{
    const gender = e
    const newMovie = url[gender]
    console.log(newMovie)
    setSelectedGenreURL(newMovie)
  }
  const items = 6
  const [current,setCurrent]=useState(1);
  const NbPage = Math.ceil(movies.length / items)
  const startIndex = (current-1) * items
  const endIndex = startIndex + items
  const dataPerPage = movies.slice(startIndex,endIndex)
  const handleChange = (event, page) =>{
    if (page >= 1 && page <= NbPage) {
      setCurrent(page);
    }
  }

  const fetchData = async()=>{
    try{
      await new Promise((resolve) => setTimeout(resolve, 2000));

      urlRegister.get(selectedGenreURL).then((result)=>{setMovies(result.data.results)}).catch(() => {
        setMovies(undefined)})

        setLoading(false)

    }catch(err){
      console.log(err)
    }
  }
  


  useEffect(() => {
    fetchData()
      
  })

    






  return (
    <div>





      <div className='flex mt-10 items-center justify-center mb-16'>
          <div className='w-52 '>
            <Select label="Select Gender" onChange={selectHandler}>
              <Option value='trendingMovies'>Trending</Option>
              <Option value='topRatedMovies'>Top Rated</Option>
              <Option value='actionMovies'>Action </Option>
              <Option value='comedyMovies'>Comedy</Option>
              <Option value='thrillerMovies'>Thriller</Option>
              <Option value='romanceMovies'>Romance</Option>
              <Option value='mysteryMovies'>Mystery</Option>
              <Option value='sciFiMovies'>Scifi</Option>
              <Option value='dramaMovies'>Drama</Option>
              <Option value='TVMovies'>TV</Option>
              <Option value='animationMovies'>Animation</Option>
            </Select>
          </div>
      </div>
        
      <MoonLoader
            
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-10 xl:grid-cols-3 gap-10">

                {movies ? dataPerPage.map(movie =>{
                  return(
                    <div key={movie.id} >
                      <Card className='dark border-2 w-96 mx-auto mt-5 card-responsive '>
                        <CardHeader className='relative mt-5 h-56 overflow-hidden' >
                          
                        <img  alt="" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}   className="object-cover w-full h-full " />
                        </CardHeader>
                      
                      <CardBody>
                        <Typography color='white' className='overview text-xl text-justify'>
                          {movie.overview}
                        </Typography>
                        <Typography className='title text-lg text-center mt-3'>{ movie.title || movie.name || movie.original_name }</Typography>
                      <Typography className='text-center mt-3' >
                        {movie.media_type ? movie.media_type : ''} {'• '}
                        {movie.release_date || movie.first_air_date} {'• '}
                      </Typography>
                      <Typography className='text-center mt-3'>
                          <ThumbUpSharp /> {' '}
                            {movie.vote_count}
                      </Typography>
                    
                      </CardBody>
                  
                    
                  

                    </Card>
                    </div>

                  )
                } 
                ) : <p>No Movie Found, Check Your Internet Connection.</p>}
          
        </div>
        <Box sx={{ display:"flex",justifyContent: "center", mt:10}} >
            <Pagination count={NbPage} page={current} onChange={handleChange}   className="bg-white" /> 

          </Box>
          
    </div>
  );
};

export default Movies;