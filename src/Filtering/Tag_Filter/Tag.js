import { useState } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";

import { FILTER_TAG } from "../../Reducer/actions";

const Tag = ({tagName, isChecked, index, tagCount, filter}) => {
   const [isCheckedState, setIsCheckedState] = useState(isChecked);

   return (
      <FormControlLabel  
      control = {<Checkbox 
                     checked = {isCheckedState}
                     onChange = {
                        () => {setIsCheckedState(!isCheckedState); filter()}
                     }/>} 
      label = {tagName + " (" + tagCount[index] + ")"}/>
   );

}

const mapDispatchToProps = (dispatch, ownProps) => {
   return { filter: () => dispatch({type: FILTER_TAG, payload: { ownProps }})}
}

const mapStateToProps = state => {
   return { tagCount: state.tagCount }
}
export default connect(mapStateToProps, mapDispatchToProps) (Tag)