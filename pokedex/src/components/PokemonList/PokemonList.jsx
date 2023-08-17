import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon.jsx";
function PokemonList(){

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [pokedexUrl, setPokedexUrl] = useState( "https://pokeapi.co/api/v2/pokemon" );
    // const[nextUrl, setNextUrl] = useState("");
    // const[prevUrl, setPrevUrl] = useState("");

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: "",
        prevUrl: ""
    })

    async function downloadPokemon(){
        setPokemonListState({...pokemonListState, isLoading: true});
        const response = await axios.get(pokemonListState.pokedexUrl); // this download list of 20 pokemon

        const pokemonResults = response.data.results; // we get array of pokemon from result
        console.log(response.data)
        setPokemonListState((state)=>({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));
       

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
        setPokemonListState((state)=>({
            ...state, 
            pokemonList: pokeListRes, 
            isLoading: false}));
        
    }

    useEffect(()=>{
        downloadPokemon()
    },[pokemonListState.pokedexUrl])
    return (
        <div className="pkemon-list-wrapper">
            <div className="pokemon-wrapper">
            {(pokemonListState.isLoading) ? "Loading....." :
                pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
            }
            </div>
            <div className="controls">
                <button disabled= {pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}>Prev</button>
                <button disabled= {pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>
            </div>
        </div>
    )
}
export default PokemonList;