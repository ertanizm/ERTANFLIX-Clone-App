import React, { useState } from 'react';
import styled from 'styled-components';
import { movies } from '../data/movies';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  background-color: #111;
  min-height: 100vh;
  padding-top: 70px;
`;

const Header = styled.div`
  position: relative;
  height: 80vh;
  width: 100%;
  margin-bottom: 20px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 7.4rem;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(17, 17, 17, 0.6),
      #111
    );
  }
`;

const TrailerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  bottom: 150px;
  left: 50px;
  color: white;
  z-index: 10;

  h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
  }

  p {
    font-size: 1.2rem;
    max-width: 500px;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.45);
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px 50px;
  background-color: #111;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MovieCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 2;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
`;

const CustomModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background-color: #181818;
  color: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  position: relative;
  transform: scale(0.7);
  animation: scaleIn 0.3s ease forwards;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);

  @keyframes scaleIn {
    from {
      transform: scale(0.7);
    }
    to {
      transform: scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
`;

const WatchButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #E50914;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MovieInfo = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    margin: 15px 0;
    line-height: 1.5;
    color: #e5e5e5;
  }

  .imdb {
    display: inline-block;
    color: #ffd700;
    font-weight: bold;
    font-size: 1.2rem;
    background: rgba(255, 215, 0, 0.1);
    padding: 8px 12px;
    border-radius: 6px;
    margin-top: 10px;
  }

  .details {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    color: #a3a3a3;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 20px 0;
  }

  .buttons {
    display: flex;
    gap: 15px;
    margin-top: 25px;
  }
`;

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const featuredMovie = movies[0]; // Inception varsayılan olarak header'da gösterilecek

  return (
    <HomeContainer>
      <Header>
        <TrailerWrapper>
          <iframe
            src={`${featuredMovie.trailer}?autoplay=1&mute=1&controls=0&loop=1`}
            title={featuredMovie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </TrailerWrapper>
        <HeaderContent>
          <h1>{featuredMovie.title}</h1>
          <p>{featuredMovie.description}</p>
          <p className="imdb">IMDB: {featuredMovie.imdb}</p>
        </HeaderContent>
      </Header>

      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => setSelectedMovie(movie)}>
            <img src={movie.image} alt={movie.title} />
          </MovieCard>
        ))}
      </MoviesGrid>

      {selectedMovie && (
        <CustomModal onClick={() => setSelectedMovie(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedMovie(null)}>×</CloseButton>
            <MovieInfo>
              <h2>{selectedMovie.title}</h2>
              <div className="details">
                <span>{selectedMovie.year}</span>
                <span>•</span>
                <span>{selectedMovie.genre}</span>
              </div>
              <p className="description">{selectedMovie.description}</p>
              <p className="imdb">IMDB: {selectedMovie.imdb}</p>
              {selectedMovie.title === "Matrix" && (
                <div className="buttons">
                  <WatchButton to={`/watch/${selectedMovie.id}`}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Filmi İzle
                  </WatchButton>
                </div>
              )}
            </MovieInfo>
          </ModalContent>
        </CustomModal>
      )}
    </HomeContainer>
  );
};

export default Home; 