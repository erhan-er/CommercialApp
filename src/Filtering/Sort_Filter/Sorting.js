// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// OTHER IMPORTS \\
import { connect } from "react-redux";
import { FILTER_SORT } from "../../Reducer/actions";
import { LOW_TO_HIGH, HIGH_TO_LOW, NEW_TO_OLD, OLD_TO_NEW } from "../../Reducer/actions";

const useStyle = makeStyles({
   //Headers
   header: {
      fontFamily: "Open Sans",
      fontSize: "13px",
      color: "#697488",
      marginBottom: "12px",
   },

   //Sorting Box
   outer_box_sorting: {
      width: "296px",
      height: "274px",
      marginBottom: "24px",
      "@media screen and (max-width: 1080px)": {
         width: "40%",
      },
   },
   inner_box_sorting: {
      width: "296px",
      height: "244px",
      borderRadius: "2px",
      boxShadow: "0px 6px 24px rgba(93, 62, 188, .04)",
      background: "#fff",
      alignItems: "center",
   },
   sorting_radio: {      
      paddingTop: "35px",
      paddingLeft: "24px",
   },
   sorting_radio_label: {
      fontSize: "14px",
      fontFamily: "Open Sans",
      color: "#525252",
   },
});

const Sorting = ({dispatch}) => {
   const classes = useStyle();
   
   return (
      <Box className = {classes.outer_box_sorting}>
         <div className = {classes.header}>Sorting</div>
         <Box className = {classes.inner_box_sorting}>
            <FormControl component="fieldset" className = {classes.sorting_radio}>
               <RadioGroup aria-label="sorting" name="sorting">
                  <FormControlLabel classes = {{label: classes.sorting_radio_label}} onChange = {() => dispatch({type: FILTER_SORT, payload: {sortType: LOW_TO_HIGH}})} value="Price low to high" control={<Radio />} label="Price low to high" />
                  <FormControlLabel classes = {{label: classes.sorting_radio_label}} onChange = {() => dispatch({type: FILTER_SORT, payload: {sortType: HIGH_TO_LOW}})} value="Price high to low" control={<Radio />} label="Price high to low" />
                  <FormControlLabel classes = {{label: classes.sorting_radio_label}} onChange = {() => dispatch({type: FILTER_SORT, payload: {sortType: NEW_TO_OLD}})} value="New to old" control={<Radio />} label="New to old" />
                  <FormControlLabel classes = {{label: classes.sorting_radio_label}} onChange = {() => dispatch({type: FILTER_SORT, payload: {sortType: OLD_TO_NEW}})} value="Old to new" control={<Radio />} label="Old to new" />
                  </RadioGroup>
            </FormControl>
         </Box>
      </Box>
   );
}

const mapStateToProps = state => {
   return {}
}

export default connect(mapStateToProps) (Sorting)