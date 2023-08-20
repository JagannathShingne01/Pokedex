import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import "./Search.css"

function Search({updateSearchTerm}){
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const debouncedCallback = useDebounce((text) => {
        updateSearchTerm(text);
        setIsLoading(true);
    });

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, [debouncedCallback]);

    const handleChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        debouncedCallback(text);
    };

    return (
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="pokemon name......"
                value={searchText}
                onChange={handleChange}
            />
            {isLoading && <div className="loading-message">Loading...</div>}
        </div>
    );
}
export default Search;