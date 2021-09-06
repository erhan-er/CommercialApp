// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';

// OTHER IMPORTS \\
import { useState } from "react";
import { connect } from "react-redux";



import Item from "./Item";

const useStyles = makeStyles({ 
   container: {
      width: "608px",
      height: "1096px",
      borderRadius: "2px",
      "@media screen and (max-width: 720px)": {
         width: "100%",  
      },
   },
   header: {
      fontFamily: "Open Sans",
      fontWeight: "400",
      fontSize: "20px",
      color: "#6F6F6F",
      marginBottom: "16px",
   },
   button: {
      width: "60px",
      height: "30px",
      marginBottom: "16px",
      fontFamily: "Open Sans",
      borderRadius: "0px",
      boxShadow: "none",
   },
   item_container: {
      display: "flex",
      justifyContent: "center",
      flexFlow: "row wrap",
      padding: "20px",
      background: "#FFFFFF",
      margin: "0 auto",
   },
   pagination: {
      width: "550px",
      margin: "20px 45px 100px",
      
   },
   
});

const theme = createTheme({
   palette: {
      primary: {
         main: "#f2f0fd",
         contrastText: "#1ea4ce",
      },
      secondary: {
         main: "#1ea4ce",
         contrastText: "#f2f0fd",
      }
   },
});

const Items = ({products, filteredArray, handleClickVariant}) => {
   const classes = useStyles();

   const [page, setPage] = useState(1); // PAGE NUMBER
   const [pageSize, setPageSize] = useState(16); // NUMBER OF ITEMS SHOWED ON THE SCREEN
   const [isMug, setIsMug] = useState("mug"); // MUG-SHIRT FILTER

   const handleChange = (event, value) => { // CHANGE THE PAGE NUMBER
      setPage(value);
   };

   const handleMug = () => { // CHANGE THE MUG-SHIRT FILTER TO MUG
      setIsMug("mug");
      setPage(1);
   }

   const handleShirt = () => { // CHANGE THE MUG-SHIRT FILTER TO SHIRT
      setIsMug("shirt");
      setPage(1);
   }

   const renderComponents = () => { 
      if ( products.length === 0 ) // WAIT UNTIL PRODUCTS ARRAY IS READY
         return <CircularProgress color="secondary" />
      else if ( filteredArray.length === 0 ) // SHOW MESSAGE IF THE FILTER DO NOT RETURN AN ITEM
         return (
            <Box className = {classes.item_container} style = {{color: "#FF2400",}}>
               <Box style = {{marginRight: "10px"}}><ErrorIcon style = {{fontSize: "24px",}}/></Box>
               <div style = {{marginTop: "2px", fontFamily: "Open Sans"}}>There are no products matching the filters!</div> 
            </Box>
         );
      else // SHOW THE WHOLE PAGE
         return (
            <Box className = {classes.item_container}>
               { 
                  filteredArray.filter((item) => item.type === isMug).map((product, index) => {
                        
                     if ( index >= ((page - 1) * pageSize) && index < (page * pageSize)) {
                        return (
                           <Item key = {index} {...product} handleClickVariant = {handleClickVariant}/>
                        );
                     }
                     return;
                  })}       
            </Box>
         );
   }
   return (
         <ThemeProvider theme = {theme}>
            <Box className = {classes.container}>
               <Box className = {classes.header}>Products</Box>
               <Box> 
                  <Button className = {classes.button} onClick = {handleMug} color = { ( isMug === "mug")  ? "secondary" : "primary"} variant = "contained">Mug</Button>
                  <Button className = {classes.button} onClick = {handleShirt} color = { ( isMug === "shirt")  ? "secondary" : "primary"} variant = "contained">Shirt</Button>
               </Box>
               
                  { renderComponents() } 
               
               <Box className = {classes.pagination}>
                  <Pagination style = {{marginBottom: "100px"}} size="large" count = {Math.ceil(filteredArray.filter((product) => product.type === isMug).length / pageSize)} page = {page} onChange = {handleChange} color = "secondary" shape = "rounded" showFirstButton showLastButton/>
               </Box>
            </Box>
         </ThemeProvider>
   );
}

const mapStateToProps = state => {
   
   return {products: state.products, filteredArray: state.filteredArray}
}
export default connect(mapStateToProps) (Items)