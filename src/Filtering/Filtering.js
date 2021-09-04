import Box from '@material-ui/core/Box';

import Sorting from "./Sort_Filter/Sorting";
import Brands from "./Brand_Filter/Brands";
import Tags from "./Tag_Filter/Tags";
import { connect } from "react-redux";

const Filter = () => {

   return (
      <Box>
         <Sorting />
         <Brands />
         <Tags />
      </Box>
   );
}


export default connect() (Filter)
