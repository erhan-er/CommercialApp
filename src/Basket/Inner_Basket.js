// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

// OTHER IMPORTS \\
import { connect } from "react-redux";
import { DECREASE, INCREASE, DELETE_ITEM, DELETE_ALL } from "../Reducer/actions";
import clsx  from "clsx";

const useStyle = makeStyles({
   box: {
      width: "400px",
      background: "#FFF",
      borderRadius: "2px",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "center",
      margin: "0 auto",
      border: "8px solid #1EA4CE",
   },
   scrollbar: {
      marginTop: "10px",
      width: "90%",
      maxHeight: "500px",
      overflowY: "scroll",
      margin: "0 auto",
   },
   "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#E0E0E0",
   },
   item_box: {
      position: "relative",
      width: "100%",
      borderBottom: "1px solid #F4F4F4",
      display: "flex",
      flexDirection: "row",
      minHeight: "100px",
      margin: "0 auto",
   },
   empty_basket: {
      color: "rgb(255, 152, 0)",
      textAlign: "left",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      height: "50px",
      width: "100%",
   },
   description: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "50%",
   },
   item_name: {
      display: "flex",
      color: "#191919",
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing: "0.16px",
      fontWeight: "400",
      fontFamily: "Open Sans",
      marginBottom: "4px",
   },
   item_price: {
      display: "flex",
      color: "#1EA4CE",
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing: "0.16px",
      fontWeight: "600",
      fontFamily: "Open Sans",
   },
   button_box: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   button_group: {
      marginTop: "6.5px",
      position: "absolute",
      right: "50px",
      alignItems: "center",
   },
   button: {
      width: "32px",
      height: "32.7px",
   },
   delete_button: {
      marginTop: "6.5px",
      position: "absolute",
      right: "5px",
      color: "#ff0000"
   },
   total_outer_box: {
      position: "relative",
      minHeight: "80px",
      width: "100%",
      marginBottom: "10px",
   },
   total_inner_box: {
      position: "absolute",
      right: "16px",
      bottom: "4.35px",
      minWidth: "100px",
      height: "50px",
      border: "2px solid #1EA4CE",
      borderRadius: "2px",
      display: "flex",
      alignItems: "center",
   },
   total: {
      color: "#1EA4CE",
      fontFamily: "Open Sans",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "16px",
      margin: "0 auto",
   },
   clear_all: {
      position: "absolute",
      width: "150px",
      height: "50px",
      left: "16px",
      bottom: "4.35px",
      color: "white",
      background: "#FF3232"
   }
});

const Inner_Basket = ({products, basket, total, dispatch}) => {
   const classes = useStyle();

   const showBasket = () => {
      if ( basket.length === 0 ) { // IF BASKET IS EMPTY, SHOW MESSAGE
         return (
            <Box className = {classes.box}>
               <Box className = {classes.empty_basket}> 
                  <Box style = {{marginRight: "10px", marginTop: "6px",}}><ErrorIcon style = {{fontSize: "30px",}}/></Box>
                  <p style = {{fontSize: "18px", fontFamily: "Open Sans"}}>Basket is empty</p>
               </Box>
            </Box>
         );
         
      }
      else {
         return (
            <Box className = {classes.box}> 
               <Box className = {clsx(classes.scrollbar, classes['*'])}>
               {
               basket.map((product, index) => {
                  return (
                        <Box className = {classes.item_box} key = {index}>
                           <Box className = {classes.description}>
                              <p className = {classes.item_name}>{product.name}</p>
                              <p className = {classes.item_price}>₺ {product.price}</p>
                           </Box>
                           <Box className = {classes.button_box}>
                              <ButtonGroup className = {classes.button_group} variant = "text">
                                 <Button className = {classes.button} onClick = {() => dispatch({type: DECREASE, payload: {id: product.id}})}><RemoveIcon/></Button>
                                 <Button className = {classes.button} style = {{background: "#1EA4CE", color: "#fff", border: "0px"}} variant = "contained" disabled>{product.amount}</Button>
                                 <Button className = {classes.button} onClick = {() => dispatch({type: INCREASE, payload: {id: product.id}})}><AddIcon/></Button>
                              </ButtonGroup>
                              <IconButton aria-label="delete" className={classes.delete_button} onClick = {() => {dispatch({type: DELETE_ITEM, payload: {id: product.id}})}}>
                                 <DeleteIcon fontSize="small"/>
                              </IconButton>
                           </Box>
                        </Box>
                  );
               })}
               </Box>
               <Box className = {classes.total_outer_box}>
                  <Box className = {classes.total_inner_box}>
                     <p className = {classes.total}>₺ {(total.toFixed(2) === "-0.00" ?  "0.00" : total.toFixed(2))}</p>
                  </Box>
                  <Button className = {classes.clear_all} variant="contained"  startIcon={<DeleteIcon />} onClick = {() => dispatch({type: DELETE_ALL})}>
                     Clear All
                  </Button>
               </Box>
               
            </Box> 
         );
      }
   }

   return (
      showBasket()
   );
}

const mapStateToProps = state => {
   return {products: state.products, basket: state.basket, total: state.total}
}

export default connect(mapStateToProps) (Inner_Basket)