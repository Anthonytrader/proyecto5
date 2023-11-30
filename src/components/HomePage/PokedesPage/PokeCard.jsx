import React, { useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import "./Styles/PokeCard.css"

const PokeCard = ({ url }) => {
  const [infoPoke, getInfoPoke] = useFetch(url);

  useEffect(() => {
    getInfoPoke();
  }, [url]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (infoPoke) {
      navigate(`/pokedex/${infoPoke.id}`);
    }
  };

  const firstType = infoPoke?.types[0].type.name;
 console.log(infoPoke)
  return (
    <article className={`pokecard ${firstType}-border`} onClick={handleNavigate}>
      <header className={`${infoPoke?.types[0].type.name}-gradient`}> 
       <img className='pokecard_image' src={infoPoke?.sprites?.other['official-artwork']?.front_default} alt="" />
      </header>
      <section className='pokecard_body'>
        <h3 className={`pokecard_name ${firstType}-color`}>{infoPoke?.name}</h3>
        <ul className='pokecard_types'>
          {infoPoke?.types.map((infoType, index) => (
            <li className='pokecard_typename' key={index}>{infoType.type.name}</li>
          ))}
        </ul>
        <hr className='pokecard_hr' />
        <ul className='pokecard_stats'>
          {infoPoke?.stats.map((infoStat, index) => (
            <li className='pokecard_stat' key={index}>
              <h4 className='pokecard_stat_name'>{infoStat.stat.name}</h4>
              <span className={`pokecard_stat_value ${firstType}-color`}>{infoStat.base_stat}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default PokeCard;

