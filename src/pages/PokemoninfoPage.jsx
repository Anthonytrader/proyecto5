import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import "./PokemoninfoPage.css";

const PokemoninfoPage = () => {
  const { id } = useParams();
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, []);

console.log(pokemon)

  
  return (

  <div >
    <div className="header"></div>
    <div className="overlay-image"></div>
    <div className="pokemon-details">
    <header className={`pokecard_header ${pokemon?.types[0].type.name}-gradient`}>
      </header>
      <img src={pokemon?.sprites?.other['official-artwork']?.front_default} alt={pokemon?.name} className="pokemon-image" />
      <div className="id-name-section">
      <h1 className='pokemon-id'>#{pokemon?.id}</h1>
      <h2 className="pokemon-name">{pokemon?.name}</h2>
      </div>
      <div className="pokemon-p-a">
      <div className="column">
       <p className='peso'>Weight <span>{pokemon?.weight}</span></p>
      </div>
         <div className="column">
        <p className='altura'>Height <span>{pokemon?.height}</span></p>
      </div>
     </div>
     <div className='title'>
     <h3 className='title_type'> Type</h3>
     </div>
     <ul className='pokeinfo_types'>
          {pokemon?.types.map((infoType, index) => (
            <li className='pokeinfo_typename' key={index}>{infoType.type.name}</li>
          ))}
        </ul>
        <div className='title2'>
        <h3 className='title_Abilities'> Abilities </h3>
        </div>
        <ul className='pokeinfo_abilities'>
          {pokemon?.abilities.map((infoType, index) => (
            <li className='pokeinfo_abil' key={index}>{infoType.ability.name}</li>
          ))}
        </ul>
        <hr className='pokeinfo_hr' />
        <div className='title3'>
          <h2 className='title_stats'>Stats</h2>
        </div>
        <ul className='pokeinfo_stats'>
          {pokemon?.stats.map((infoStat, index) => (
            <li className='pokeinfo_stat' key={index}>
              <h4 className='pokeinfo_stat_name'>{infoStat.stat.name}</h4>
              <h3 className='pokeinfo_stat_value'>{infoStat.base_stat}</h3>
              </li>
          ))}
        </ul>
    </div>
   

  </div>
);

};

export default PokemoninfoPage;
