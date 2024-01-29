import React, { useEffect, useState, useCallback, useContext } from 'react';

import Layout from '../../components/layout/Layout';
import UserCard from '../../components/home/UserCard';

interface HomeProps {}

interface PokemonData {
  name: string;
  url: string;
}

const PokemonContext = React.createContext<PokemonData[]>([]);

const Home: React.FC<HomeProps> = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [counter, setCounter] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const incrementCounter = () => setCounter(prevCounter => prevCounter + 1);
  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };
  const resetCounter = () => setCounter(10);

  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${counter}&limit=${counter}`
      );
      const { results } = await response.json();
      setPokemonData(results);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [counter]);

  useEffect(() => {
    fetchPokemons();
  }, [counter, fetchPokemons]);

  return (
    <Layout>
      <PokemonContext.Provider value={pokemonData}>
        <section className="section">
          <div className="container mb-4">
            <h1 className="title">Counter</h1>
            <span>Number of cards to show: {counter} </span>
            <div>
              <button
                className="button is-primary mr-1 ml-1"
                onClick={incrementCounter}
              >
                Add
              </button>
              <button
                className="button is-warning mr-1 ml-1"
                onClick={resetCounter}
              >
                Reset
              </button>
              <button
                className="button is-danger mr-1 ml-1"
                onClick={decrementCounter}
              >
                Subtract
              </button>
              <button
                className="button is-danger mr-1 ml-1"
                onClick={fetchPokemons}
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
                {pokemonData.map((pokemon, index) => (
                  <div className="column is-4 p-3" key={index}>
                    <UserCard name={pokemon.name} url={pokemon.url} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </PokemonContext.Provider>
    </Layout>
  );
};

const usePokemonContext = () => useContext(PokemonContext);

export default Home;
