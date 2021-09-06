// MATERIAL UI IMPORTS \\
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// OTHER IMPORTS \\
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import  { FILTER_BRAND } from "../../Reducer/actions"

const Brand = ({id, slug, name, address, city, state, zip, account, contact, isChecked, index, filter, companyCount, allChecked, setAllChecked}) => {

   const [isCheckedState, setIsCheckedState] = useState(false);

   const handleChange = () => {
      setAllChecked(false);
   }
   
   useEffect(() => { // IF ALL CHECKED, THEN UNCHECK OTHER FILTERS
      if ( allChecked )
         setIsCheckedState(false);
   },[allChecked]);

   return (
      <FormControlLabel 
         control = {<Checkbox 
                        checked = {isChecked} 
                        onChange = {() => {filter(); handleChange()}} color="primary"/>} 
         label = { slug + " (" + companyCount[index] + ")"}/>
   );
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return { filter: () => dispatch({type: FILTER_BRAND, payload: { ownProps }})}
}

const mapStateToProps = state => {
   return { companyCount: state.companyCount }
}
export default connect(mapStateToProps, mapDispatchToProps) (Brand)