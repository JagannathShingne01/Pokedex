import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";
function PokemonDetails({pokemonName}) {
    const {id} = useParams();
    const [pokemon] = usePokemonDetails(id, pokemonName);
   return(
    <div className="pokemon-details-wrapper">
        
        <img className="pokemon-details-img" src={pokemon.image} />
        <div className="details">
            <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">Height: {pokemon.height}"</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight} lbs</div>
        
            <div className="pokemon-details-types">
            <span> Type:</span>
            {pokemon.types && pokemon.types.map((t) => <div className="details" key={t}>  {t} </div>)}
            </div>
            {
                pokemon.types && pokemon.similarPokemons && 
                <div className="similar-pokemon">
                   <span> More {pokemon.types[0]} Type Pokemons </span>
                    <ul>
                    { pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
            }
        </div>
    </div>
   )
}
export default PokemonDetails;