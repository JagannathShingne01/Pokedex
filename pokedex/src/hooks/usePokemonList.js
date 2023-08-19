import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon', 
        nextUrl: "",
        prevUrl: ""
    });


    async function downloadPokemon(){
      
        setPokemonListState({...pokemonListState, isLoading: true});
        const response = await axios.get(pokemonListState.pokedexUrl);  

        const pokemonResults = response.data.results;
        
        console.log("response js",response.data.pokemon)
        setPokemonListState((state)=>({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));

        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        const pokemonData = await axios.all(pokemonResultPromise);
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
            isLoading: false
        }));  
}
    useEffect(()=>{
        downloadPokemon();
    },[pokemonListState.pokedexUrl]);

    return[ pokemonListState, setPokemonListState ]
}

export default usePokemonList;