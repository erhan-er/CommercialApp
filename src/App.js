// MATERIAL UI IMPORTS \\
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { SnackbarProvider, useSnackbar } from 'notistack';

// OTHER IMPORTS \\
import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Navbar from "./Navbar/Navbar";
import Items from "./Listed_Items/Items";
import Filtering from "./Filtering/Filtering";
import Basket from "./Basket/Basket";
import reducer from "./Reducer/reducer";

document.body.style = "background: #E5E5E5;";
const useStyles = makeStyles({
  content: {
    width: "100%",
    margin: "0 auto",
    marginTop: "38.36px",
    background: "#E5E5E5",
  },
  box: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0px",

    "@media screen and (max-width: 1440px)": {
      justifyContent: "space-evenly",
    },
    "@media screen and (max-width: 1280px)": {
      flexDirection: "row",
    },
    "@media screen and (max-width: 1080px)": {
      display: "block"
    }
  },
});

function App() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [tags, setTags] = useState([]);
  const [companyCount, setCompanyCount] = useState([]);
  const [tagCount, setTagCount] = useState([]);
  
  // initial store
  const initialStore = {
    total: 0,
    products: products,
    companies: companies,
    tags: tags,
    companyCount: companyCount,
    tagCount: tagCount,
    filteredArray: [...products],
    basket: [],
  };
  

  const store = createStore(reducer, initialStore);

  //** SORTING FUNCTION **\\
  function sortOn( arr, prop) {
    arr.sort(
        function(a, b) {
          if (a[prop] < b[prop])
              return -1;
          else if (a[prop] > b[prop])
              return 1;
          else
            return 0;
        }
    );
  };
  //** END OF SORTING FUNCTION **\\


  //*** GET DATA FROM API ***\\
  //*** GET PRODUCTS ***\\
  const getProducts = () => {
    axios.get("https://getirserver.herokuapp.com/api/products").then((res) => {
      const productArr = res.data.map((product, index) => {
        return {
          id: product.added,
          tags: product.tags, 
          price: product.price,
          name: product.name, 
          description: product.description,
          slug: product.slug,
          added: product.added,
          manufacturer: product.manufacturer,
          type: product.itemType,
          amount: 0,
        };
      });

      sortOn(productArr, "name"); // SORT PRODUCTS BY THEIR NAME
      
      // GET TAGS \\
      let tagArr = []; 
      productArr.map((product, index) => {
        product.tags.map((tag, index) => {
          tagArr.push(tag);
        });  
      });
      
      let uniqueTags = [...new Set(tagArr)]; // DELETE THE DUPLICATE TAGS
      uniqueTags.sort(); // SORT TAGS BY THEIR NAME
      let newTag = uniqueTags.map((tag, index) => { return { tagName: tag, isChecked: false, index: index }});

      setTagCount( new Array(uniqueTags.length).fill(0));

      setProducts(productArr); 
      setTags(newTag);
    });
  };

  //*** GET COMPANIES ***\\
  const getCompanies = () => {
    axios.get("https://getirserver.herokuapp.com/api/companies").then((res) => {
      setCompanyCount( new Array(res.data.length).fill(0));
      const companyArr = res.data.map((company, index) => {
        return {
          id: company.account,
          slug: company.slug,
          name: company.name,
          address: company.address,
          city: company.city,
          state: company.state,
          zip: company.zip,
          account: company.account,
          contact: company.contact,
          isChecked: false,
        }
      });

      sortOn(companyArr, "name"); // SORT COMPANIES BY THEIR NAME

      let newCompanies = companyArr.map((company, index) => {
        return {...company, index: index}
      });

      setCompanies(newCompanies);
    });
  };

  //*** END OF GET DATA FROM API ***\\

  useEffect(() => {
    getProducts();
    getCompanies(); 
  },[]);
  
  useEffect(() => {
    let counts = new Array(companyCount.length).fill(0);

    for ( let i = 0; i < products.length; i++ ) {
      for ( let j = 0; j < companies.length; j++ ) {
        if ( products[i].manufacturer === companies[j].slug ) {
          let newNumber = counts[j];
          newNumber = newNumber + 1;
          counts[j] = newNumber; 
        }
      }
    }
    
    setCompanyCount(counts);
  }, [companies, products]);

  useEffect(() => {
    let counts = new Array(tags.length).fill(0);

    for ( let i = 0; i < products.length; i++ ) {
      for ( let j = 0; j < products[i].tags.length; j++ ) {
        for ( let k = 0; k < tags.length; k++ ) {
          if ( products[i].tags[j] === tags[k].tagName ) {
            let newNumber = counts[k];
            newNumber = newNumber + 1;
            counts[k] = newNumber;
          }
        }
      }
    }
    
    setTagCount(counts);
  }, [tags, products]);
  
  const handleClickVariant = () => {
    let variant = "success"
    enqueueSnackbar('Added to Basket', { variant });
  };

  return (
        <Provider store = {store}>
          <Box>
            <Navbar/>
            <Box className = {classes.content} >
              <Box className = {classes.box}>
                <Filtering style = {{zIndex: "-1"}}/>
                <Items handleClickVariant = {handleClickVariant} style = {{zIndex: "-1"}}/>
                <Basket/>
              </Box>
            </Box>
          </Box>
        </Provider>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider anchorOrigin = {{ 
      vertical: "bottom", horizontal: "right", }} maxSnack={3}>
      <App />
    </SnackbarProvider>
  );
}
