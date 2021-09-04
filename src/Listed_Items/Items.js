import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Pagination from '@material-ui/lab/Pagination';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";

import Item from "./Item";

const useStyles = makeStyles({ 
   container: {
      width: "608px",
      height: "1096px",
      borderRadius: "2px",
      
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
      marginRight: "8px",
      marginBottom: "16px",
   },
   item_container: {
      display: "flex",
      flexFlow: "row wrap",
      padding: "20px",
      background: "#FFFFFF",
      margin: "0 auto",
      //justifyContent: "space-between",
   },
   pagination: {
      width: "550px",
      margin: "20px 45px 100px",
      
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

const Items = ({products, filteredArray, handleClickVariant}) => {
   const classes = useStyles();

   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(16);
   const [isMug, setIsMug] = useState("mug");

   const handleChange = (event, value) => {
      setPage(value);
   };

   const handleMug = () => {
      setIsMug("mug");
      setPage(1);
   }

   const handleShirt = () => {
      setIsMug("shirt");
      setPage(1);
   }

   return (
         <ThemeProvider theme = {theme}>
            <Box className = {classes.container}>
               <Box className = {classes.header}>Products</Box>
               <Box>
                  <Button className = {classes.button} onClick = {handleMug} color = "primary" variant = "contained">Mug</Button>
                  <Button className = {classes.button} onClick = {handleShirt} color = "primary" variant = "contained">Shirt</Button>
               </Box>
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
               <Box className = {classes.pagination}>
                  <Pagination style = {{marginBottom: "100px"}} size="large" count = {Math.ceil(filteredArray.filter((product) => product.type === isMug).length / pageSize)} page = {page} onChange = {handleChange} color = "primary" shape = "rounded" showFirstButton showLastButton/>
               </Box>
            </Box>
         </ThemeProvider>
   );
}

const mapStateToProps = state => {
   
   return {products: state.products, filteredArray: state.filteredArray}
}
export default connect(mapStateToProps) (Items)