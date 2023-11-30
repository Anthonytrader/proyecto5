import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/HomePage/PokedesPage/PokeCard';
import SelectType from '../components/HomePage/PokedesPage/SelectType';
import imagenes from '../assets/imagenes.js';
import "./PokedexPage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('allPokemons');
  const trainerName = useSelector((store) => store.trainerName);
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0';
  const [pokemons, getPokemons, getByTypePokemons] = useFetch(url);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      getPokemons();
    } else {
      getByTypePokemons(selectValue)
    }
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.toLowerCase().trim());
    inputSearch.current.value = '';
  };

  const filterPokemon = (poke) => {
    const nameFiltered = poke.name.includes(inputValue);
    return nameFiltered;
  };

  return (
    <div>
      <div className="header"></div>
      <div className="overlay-image"></div>
      <div className="welcome-section">
        <p className="welcome-text">Welcome <span className="trainer-name">{trainerName}</span>, here you can find your favorite Pokémon. Let's go!
        </p>
      </div>
      <div className="search-section">
        <form className='search-form' onSubmit={handleSubmit}>
          <input ref={inputSearch} type="text" />
          <button type="submit" className='Search'>Search</button>
        </form>
        <SelectType setSelectValue={setSelectValue}  />
      </div>
      <div className="pokemons-section">
        {pokemons?.results.filter(filterPokemon).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} className="pokecard" />
        ))}
      </div>
    </div>
  );
  
};

export default PokedexPage;
