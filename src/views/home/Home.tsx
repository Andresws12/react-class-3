import React, { useEffect, useState, useCallback } from 'react';

import Layout from '../../components/layout/Layout';
import UserCard from '../../components/home/UserCard';

interface HomeProps {
  // Add type annotations for props
}

interface PokemonData {
  name: string;
  url: string;
}

const Home: React.FC<HomeProps> = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [counter, setCounter] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sum = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const rest = () => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };

  const reset = () => setCounter(10);

  const getPokemons = useCallback(async () => {
    setIsLoading(true); // Set loading state to true
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${counter}&limit=${counter}`
    );
    const pokemonResponse = await response.json();
    setPokemonData(pokemonResponse.results);
    setIsLoading(false); // Set loading state to false
    return pokemonResponse.results;
  }, [counter]);

  useEffect(() => {
    getPokemons();
  }, [counter, getPokemons]);

  return (
    <Layout>
      <section className="section">
        <div className="container mb-4">
          <h1 className="title">Counter</h1>
          <span>Number of cards to show: {counter} </span>
          <div>
            <button className="button is-primary mr-1 ml-1" onClick={sum}>
              Add
            </button>
            <button className="button is-warning mr-1 ml-1" onClick={reset}>
              Reset
            </button>
            <button className="button is-danger mr-1 ml-1" onClick={rest}>
              Subtract
            </button>
            <button
              className="button is-danger mr-1 ml-1"
              onClick={getPokemons}
            >
              Get pokemons
            </button>
          </div>
        </div>
        <div className="container">
          {isLoading ? (
            <div className="has-text-centered">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="columns is-multiline is-centered">
              {pokemonData.slice(0, counter).map((pokemon, index) => (
                <div className="column is-4 p-3" key={index}>
                  <UserCard name={pokemon.name} url={pokemon.url} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
