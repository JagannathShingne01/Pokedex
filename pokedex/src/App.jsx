
import { Link } from 'react-router-dom';
import './App.css'
import CustomRoutes from './routes/CustomRoutes';
import poke from "../public/HomePoke.png"
function App() {

  return (
    <div className='outer-pokedex'>
    <h1 id="pokedex-heading">
      <Link to="/">Pokedex</Link>  
      <img class="navimg" src="public/HomePoke.png" alt="Pokemon" />
    </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
