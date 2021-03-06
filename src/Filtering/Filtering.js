// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// OTHER IMPORTS \\
import Sorting from "./Sort_Filter/Sorting";
import Brands from "./Brand_Filter/Brands";
import Tags from "./Tag_Filter/Tags";
import { connect } from "react-redux";

const useStyle = makeStyles({
   filtering_box: {
      
      "@media screen and (max-width: 1080px)": {
         width: "100%",
         display: "flex",
         justifyContent: "space-evenly",
         flexFlow: "row wrap",
      },
      "@media screen and (max-width: 720px)": {
         display: "block",
      },
   },
});
const Filter = () => {
   const classes = useStyle();

   return (
      <Box className = {classes.filtering_box}>
         <Sorting />
         <Brands />
         <Tags />
      </Box>
   );
}


export default connect() (Filter)
