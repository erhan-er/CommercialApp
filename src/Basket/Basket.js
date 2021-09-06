// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


// OTHER IMPORTS \\
import InnerBasket from "./Inner_Basket";

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
            <InnerBasket/>
         }
         
      </Box>
   );
};

export default Basket