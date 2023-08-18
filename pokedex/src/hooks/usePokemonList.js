import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url, type) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: "",
        prevUrl: ""
    });


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
        downloadPokemon();
    },[pokemonListState.pokedexUrl]);

    return{ pokemonListState, setPokemonListState }
}

export default usePokemonList;