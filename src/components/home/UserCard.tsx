import React, { useEffect, useState, useCallback } from 'react';

interface UserCardProps {
  name: string;
  url: string;
}

interface Pokemon {
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

const UserCard: React.FC<UserCardProps> = ({ name, url }) => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  const fetchPokemon = useCallback(async () => {
    try {
      const response = await fetch(url);
      const pokemonData = await response.json();
      setPokemon(pokemonData);
    } catch (error) {
      console.error('Failed to fetch Pokemon:', error);
    }
  }, [url]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={pokemon?.sprites?.front_default}
                width="96"
                alt="Pokemon"
                title="Pokemon"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">
          <p>
            {pokemon?.types.map((type: { type: { name: string } }) => (
              <span key={type.type.name}>{type.type.name}/</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
