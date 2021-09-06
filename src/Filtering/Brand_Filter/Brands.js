// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

// OTHER IMPORTS \\
import { useState } from 'react';
import clsx from 'clsx';
import Brand from "./Brand";
import { connect } from "react-redux";
import { SHOW_ALL_BRAND } from "../../Reducer/actions";

const useStyle = makeStyles({
   //Headers
   header: {
      fontFamily: "Open Sans",
      fontSize: "13px",
      color: "#697488",
      marginBottom: "12px",
   },

   //Brands Box
   outer_box_brands: {
      width: "296px",
      height: "274px",
      marginBottom: "24px",
      "@media screen and (max-width: 1080px)": {
         width: "40%",
      },
   },
   inner_box_brands: {
      width: "296px",
      height: "244px",
      borderRadius: "2px",
      boxShadow: "0px 6px 24px rgba(93, 62, 188, .04)",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
   },
   searchbar: {
      fontFamily: "Open Sans",
      height: "44px",
      width: "244px",
      border: "2px solid #E0E0E0",
      borderRadius: "2px",
      marginTop: "24px",
      marginBottom: "10px",
      marginLeft: "24px",
   },
   scrollbar: {
      width: "248px",
      maxHeight: "142px",
      overflowY: "scroll",
      margin: "0 auto",
      fontFamily: "Open Sans",
      fontSize: "13px",
      color: "#697488",
   },
   "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#E0E0E0",
   },
});
const Brands = ({companies, companyCount, products, dispatch}) => {
   const classes = useStyle();
   
   const { search } = window.location;
   const query = new URLSearchParams(search).get("brandSearch");
   const [searchQuery, setSearchQuery] = useState(query || "");
   const [allChecked, setAllChecked] = useState(true);

   const filterBrands = ( companies, query ) => {
      if (!query) {
         return companies;
      }

      return companies.filter((company, index) => {
         const companyName = company.name.toLowerCase();
         return companyName.includes(query.toLowerCase());
      });
   }

   const filteredCompanies = filterBrands( companies, searchQuery );
   
   const renderComponent = () => { // WAIT UNTIL COMPANYCOUNT IS READY
      if ( companyCount.length === 0 )
         return <CircularProgress color="primary" />
      else {
         return (
            <Box className = {classes.inner_box_brands}>
               <input value = {searchQuery} onInput = {e => {setSearchQuery(e.target.value)}} type="text" id = "brandSearch" name = "brandSearch" placeholder = "Search Brand" className = {classes.searchbar}/>
               <Box className = {clsx(classes.scrollbar, classes['*'])}>
                  <FormGroup >
                     <FormControlLabel control = {<Checkbox checked = {allChecked} onChange = {() => {dispatch({type: SHOW_ALL_BRAND}); setAllChecked(!allChecked)}} color = "primary"/>} label = { "All (" + products.length + ")"} />
                     {filteredCompanies.map((company, index) => {
                        return (
                           <Brand key = {index} {...company} allChecked = {allChecked} setAllChecked = {setAllChecked}/>
                        );
                     })} 
                  </FormGroup>
               </Box>
            </Box>
            
         );
      }
   }
   return (
      <Box className = {classes.outer_box_brands}>
         <div className = {classes.header}>Brands</div>
            { renderComponent() }
      </Box>
   );
}

const mapStateToProps = state => {
   
   return {companies: state.companies, companyCount: state.companyCount, products: state.products}
}

export default connect(mapStateToProps) (Brands)