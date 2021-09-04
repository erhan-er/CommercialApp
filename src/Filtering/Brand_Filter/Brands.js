import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

//------CHECKBOX IMPORTS------\\
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
//---END OF CHECKBOX IMPORTS---\\

import Brand from "./Brand";
import SearchBar from './SearchBar';

import { connect } from "react-redux";

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
   scrollbar: {
      width: "248px",
      maxHeight: "142px",
      overflowY: "scroll",
      margin: "0 auto",
   },
   "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#E0E0E0",
   },
});
const Brands = ({companies, companyCount, products}) => {
   const classes = useStyle();
   
   const { search } = window.location;
   const query = new URLSearchParams(search).get("brandSearch");
   const [searchQuery, setSearchQuery] = useState(query || "");


   const filterBrands = ( companies, query ) => {
      if (!query) {
         return companies;
      }

      return companies.filter((company) => {
         const companyName = company.name.toLowerCase();
         return companyName.includes(query);
      });
   }

   const filteredCompanies = filterBrands( companies, searchQuery );
   
   return (
      <Box className = {classes.outer_box_brands}>
         <div className = {classes.header}>Brands</div>
         <Box className = {classes.inner_box_brands}>
            <SearchBar searchQuery = {searchQuery} setSearchQuery = {setSearchQuery}/>
            <Box className = {clsx(classes.scrollbar, classes['*'])}>
               <FormGroup >
                  <FormControlLabel control = {<Checkbox defaultChecked color = "primary"/>} label = { "All (" + products.length + ")"} />
                  {filteredCompanies.map((company, index) => {
                     return (
                        <Brand key = {index} {...company} index = {index} />
                     );
                  })} 
               </FormGroup>
            </Box>
         </Box>
      </Box>
   );
}

const mapStateToProps = state => {
   
   return {companies: state.companies, companyCount: state.companyCount, products: state.products}
}

export default connect(mapStateToProps) (Brands)