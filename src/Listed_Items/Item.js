// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";

// OTHER IMPORTS \\
import { connect } from "react-redux";
import Image from "./img/ayi.png";
import { ADD_ITEM } from "../Reducer/actions";

const useStyle = makeStyles({
   items: {
      position: "relative",
      minHeight: "225px",
      width: "124px",
      marginBottom: "22px",
      fontFamily: "Open Sans",
      
   },
   img_box: {
      height: "124px",
      width: "124px",
      border: "1.18px solid #F3F0FE",
      borderRadius: "12px",
      background: "#FEFEFE",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   img: {
      width: "92px",
      height: "92px",
      margin: "0 auto",
   },
   price: {
      width: "124px",
      paddingTop: "8px",
      fontSize: "14px",
      color: "#1EA4CE",
   },
   description: {
      width: "124px",
      fontSize: "14px",
      color: "#191919",
      marginBottom: "8px",
   },
   item_button: {
      position: "absolute",
      bottom: "5px",
      width: "124px",
      height: "22px",
      borderRadius: "2px",
      fontSize: "12px",
   },
});

const theme = createTheme({
   palette: {
      primary: {
         main: "#1EA4CE",
         contrastText: "#FFFFFF",
      }
   },
});

const Item = ({id, tags, price, name, description, slug, added, manufacturer, type, amount, add, handleClickVariant}) => {
   const classes = useStyle();

   return (
      <ThemeProvider theme = {theme}>
         <Box>
            <Box className = {classes.items}>
               <Box className = {classes.img_box}>
                  <img src={Image} alt="" className = {classes.img}/>
               </Box>
               <Box className = {classes.price}>₺ {price}</Box>
               <Box className = {classes.description}>{name}</Box>
               <Button className = {classes.item_button} onClick = {() => {add(); handleClickVariant();}} variant = "contained" color = "primary">Add</Button>
            </Box>
         </Box>
      </ThemeProvider>
   );
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return { add: () => dispatch({type: ADD_ITEM, payload: { ownProps }})}
}

export default connect(null, mapDispatchToProps) (Item)