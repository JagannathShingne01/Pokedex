import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon.jsx";
function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"


    async function downloadPokemon(){
        const response = await axios.get(POKEDEX_URL); // this download list of 20 pokemon

        const pokemonResults = response.data.results; // we get array of pokemon from result

        // iterating over the array of pokemon, and using their url, to create an array of promises that will download those 20 pokemons.
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        const pokemonData = await axios.all(pokemonResultPromise); //passing that promise to axois.all
        console.log(pokemonData);

        //now iterate on the data of each pokemon, and extract data
        const pokeListRes = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return{
                id: pokemon.id,
                name: pokemon.name, 
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :  pokemon.sprites.front_shiny, 
                types: pokemon.types
            }

        });
        console.log(pokeListRes)
        setPokemonList(pokeListRes);
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemon()
    },[])
    return (
        <div className="pkemon-list-wrapper">
            <div>Pokemon List</div>
            {(isLoading) ? "Loading....." :
            pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
        }
    </div>
    )
}
export default PokemonList;