import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import "./Search.css"

function Search({updateSearchTerm}){
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const debouncedCallback = useDebounce((text) => {
        updateSearchTerm(text);
        setIsLoading(false);
    });

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(delay);
    }, [debouncedCallback]);

    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        debouncedCallback(text);
    };

    return (
        <>
        { isLoading ? "Loading..." :(
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                autocomplete="off"
                placeholder="pokemon name......"
                value={searchText}
                onChange={handleChange}
            />
           
        </div>
        )
        }
        </>
        // <div className="search-wrapper">
        //     <input
        //         id="pokemon-name-search"
        //         type="text"
        //         autocomplete="off"
        //         placeholder="pokemon name......"
        //         value={searchText}
        //         onChange={handleChange}
        //     />
        //     {isLoading && <div className="loading-message">not found</div>}
        // </div>
    );
}
export default Search;