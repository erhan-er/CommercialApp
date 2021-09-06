// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

// OTHER IMPORTS \\
import { useState } from "react";
import clsx from 'clsx';
import Tag from "./Tag";
import { connect } from "react-redux";
import { SHOW_ALL_TAG } from "../../Reducer/actions";

const useStyle = makeStyles({
   //Headers
   header: {
      fontFamily: "Open Sans",
      fontSize: "13px",
      color: "#697488",
      marginBottom: "12px",
   },

   //Tags Box
   outer_box_tags: {
      width: "296px",
      height: "274px",
      "@media screen and (max-width: 1080px)": {
         width: "40%",
      },
      "@media screen and (max-width: 720px)": {
         width: "100%"
      },
   },
   inner_box_tags: {
      width: "296px",
      height: "244px",
      borderRadius: "2px",
      boxShadow: "0px 6px 24px rgba(93, 62, 188, .04)",
      background: "#fff",
      "@media screen and (max-width: 720px)": {
         width: "100%"
      },
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
      "@media screen and (max-width: 720px)": {
         width: "90%"
      },
   },
   scrollbar: {
      width: "248px",
      maxHeight: "142px",
      overflowY: "scroll",
      margin: "0 auto",
      fontFamily: "Open Sans",
      fontSize: "13px",
      color: "#697488",
      "@media screen and (max-width: 720px)": {
         width: "90%"
      },
   },
   "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#E0E0E0",
   },
});

const Tags = ({tags, tagCount, products, dispatch}) => {
   const classes = useStyle();
   const { search } = window.location;
   const query = new URLSearchParams(search).get("tagSearch");
   const [searchQuery, setSearchQuery] = useState(query || "");
   const [allChecked, setAllChecked] = useState(true);
   
   const filterTags = ( tags, query ) => {
      if (!query) {
         return tags;
      }

      return tags.filter((tag, index) => {
         const tagName = tag.tagName.toLowerCase();
         return tagName.includes(query.toLowerCase());
      });
   }

   const filteredTags = filterTags( tags, searchQuery );
   
   const renderComponent = () => {
      if ( tagCount.length === 0 ) { // WAIT UNTIL TAGCOUNT IS READY
         return <CircularProgress color="primary" />
      }
      else {
         return (
            <Box className = {classes.inner_box_tags}>
               <input value = {searchQuery} onInput = {e => {setSearchQuery(e.target.value)}} type="text" id = "tagSearch" placeholder = "Search Tag" className = {classes.searchbar}/>
               <Box className = {clsx(classes.scrollbar, classes['*'])}>
                  <FormGroup>
                     <FormControlLabel control = {<Checkbox checked = {allChecked} onChange = {() => {dispatch({type: SHOW_ALL_TAG}); setAllChecked(!allChecked)}} color = "primary"/>} label = { "All (" + products.length + ")"}/>
                     { filteredTags.map((tag, index) => {
                        return (
                           <Tag key = {index} {...tag} allChecked = {allChecked} setAllChecked = {setAllChecked}/>
                        );
                     })}
                  </FormGroup>
               </Box>
            </Box> 
         );
      }
   }
   return (
      <Box className = {classes.outer_box_tags}>
         <div className = {classes.header}>Tags</div>
         
            { renderComponent() }
         
      </Box>
   );
}

const mapStateToProps = state => {
   
   return {tags: state.tags, tagCount: state.tagCount, products: state.products}
}

export default connect(mapStateToProps) (Tags)