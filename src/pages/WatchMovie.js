import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { movies } from '../data/movies';

const WatchContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  padding-top: 70px;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  position: relative;
  margin-top: 70px;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MovieTitle = styled.h1`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const WatchMovie = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) return <div>Film bulunamadı</div>;

  return (
    <WatchContainer>
      <MovieTitle>{movie.title}</MovieTitle>
      <VideoContainer>
        <iframe
          src={movie.watchUrl}
          title={movie.title}
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </VideoContainer>
    </WatchContainer>
  );
};

export default WatchMovie; 