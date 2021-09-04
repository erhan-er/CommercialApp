import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BasketIcon from "./img/basket.png";
import Market from "./img/Logo.png";
import { connect } from "react-redux";

const useStyles = makeStyles({
   navbar: {
      width: "100%",
      background: "#1EA4CE",
      height: "76.64px",
      boxShadow: "none",
      marginBottom: "0px",
      display: "flex",
      justifyContent: "center",
      position: "relative",
   },

   market: {
      height: "41px",
      paddingTop: "17.8px",
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
   },

   total: {
      color: "white",
      fontSize: "13px",
      paddingLeft: "8px",
   },
});

const Navbar = ({total}) =>{
   const classes = useStyles();

   return (
      <Box className = {classes.navbar}>
         <img className = {classes.market} src={Market} alt="Market" />
         <Box className = {classes.basket}>
            <img src={BasketIcon} alt="BasketIcon" />
            <div className = {classes.total}>₺ {total.toFixed(2)}</div>
         </Box>
      </Box>
   );

}

const mapStateToProps = state => {
   
   return {total: state.total}
}
export default connect(mapStateToProps) (Navbar)