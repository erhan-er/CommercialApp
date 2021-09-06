// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";

// OTHER IMPORTS \\
import { useState } from "react"
import BasketIcon from "./img/basket.png";
import Market from "./img/Logo.png";
import { connect } from "react-redux";
import InnerBasket from "../Basket/Inner_Basket";

const useStyles = makeStyles({
   navbar: {
      position: "relative",
      width: "100%",
      background: "#1EA4CE",
      height: "76.64px",
      boxShadow: "none",
      marginBottom: "0px",
      display: "flex",
      justifyContent: "center",
   },

   market: {
      height: "41px",
      paddingTop: "17.8px",
      "@media screen and ( max-width: 640px)": {
         position: "absolute",
         left: "10px",
      }
   },

   basket: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "129px",
      height: "76px",
      background: "rgb(20, 117, 148)",
      right: "100px",
      borderRadius: "0px",
      "&:hover" : {
         background: "rgb(20, 100, 120)",
      },
      "@media screen and ( max-width: 640px)": {
         right: "20px",
      }
   },

   total: {
      color: "white",
      fontSize: "13px",
      paddingLeft: "7px",
      marginTop: "5px",
   },

   show_basket: {
      display: "none",
      "@media screen and ( max-width: 1440px)": {
         position: "absolute",
         display: "block",
         right: "100px",
         top: "100px",
      },
      "@media screen and ( max-width: 640px)": {
         right: "10px",
      }
   }
});

const Navbar = ({total}) =>{
   const classes = useStyles();
   
   const [showBasket, setShowBasket] = useState(false);

   const handleBasket = () => {
      setShowBasket(!showBasket);
   }

   return (
      <Box className = {classes.navbar}>
         <img className = {classes.market} src={Market} alt="Market" />
         <Button onClick = {() => handleBasket()} className = {classes.basket}> 
            <img src={BasketIcon} />
            <div className = {classes.total}>₺ {(total.toFixed(2) === "-0.00" ? "0.00" : total.toFixed(2))}</div> 
         </Button>
         { showBasket ?  ( <Box className = {classes.show_basket} style = {{zIndex: "1"}}><InnerBasket/></Box>) : <Box/>}
      </Box>
   );

}

const mapStateToProps = state => {
   
   return {total: state.total}
}
export default connect(mapStateToProps) (Navbar)