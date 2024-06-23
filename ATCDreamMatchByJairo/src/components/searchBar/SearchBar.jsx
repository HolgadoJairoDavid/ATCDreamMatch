import style from './searchBar.module.css';

const SearchBar = () => {
    return (
        <div className={style.SearchBar}>
        <input
            type="text"
            placeholder="Search"
        />
        </div>
    );
};

export default SearchBar;