// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ErrorIcon from '@material-ui/icons/Error';

// OTHER IMPORTS \\
import { connect } from "react-redux";
import { DECREASE, INCREASE } from "../Reducer/actions";

import clsx  from "clsx";
import Inner_Basket from "./Inner_Basket";
const useStyle = makeStyles({
   container: {
      "@media screen and (max-width: 1440px)": {
         display: "none",
      },
   }
});

const Basket = () => {
   const classes = useStyle();
   
   return (
      <Box className = {classes.container}>
         
         {
            <Inner_Basket/>
         }
         
      </Box>
   );
};

export default Basket