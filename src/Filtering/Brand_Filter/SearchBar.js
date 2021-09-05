import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
   searchbar: {
      height: "44px",
      width: "244px",
      border: "2px solid #E0E0E0",
      borderRadius: "2px",
      marginTop: "24px",
      marginBottom: "10px",
      marginLeft: "24px",
   },
});
const SearchBar = ({searchQuery, setSearchQuery}) => {
   const classes = useStyle();
   return (
      <form action="/" method = "get">
         <input value = {searchQuery} onInput = {e => {setSearchQuery(e.target.value)}} type="text" id = "brandSearch" name = "brandSearch" placeholder = "Search Brand" className = {classes.searchbar}/>
      </form>
   );
}

export default SearchBar