import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";
function PokemonDetails() {
    const {id} = useParams();
    const [pokemon] = usePokemonDetails(id);
   return(
    <div className="pokemon-details-wrapper">
        
        <img className="pokemon-details-img" src={pokemon.image} />
        <div className="details">
            <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">Height: {pokemon.height}"</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight} lbs</div>
        
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div className="details" key={t}> {t} </div>)}
            </div>
            {
                pokemon.types && pokemon.similarPokemons && 
                <div className="similar-pokemon">
                    more {pokemon.types[0]} type pokemons
                    <ul>
                    { pokemon.similarPokemons.map((p) => <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
            }
        </div>
    </div>
   )
}
export default PokemonDetails;