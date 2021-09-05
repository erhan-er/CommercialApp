import { INCREASE, DECREASE, ADD_ITEM, FILTER_SORT, FILTER_BRAND, FILTER_TAG, SHOW_ALL_BRAND, SHOW_ALL_TAG } from "./actions";
import { LOW_TO_HIGH, HIGH_TO_LOW, NEW_TO_OLD, OLD_TO_NEW } from "./actions";

// DO NOT IMMUTE DATA \\

function reducer(state, action) {
   //** SORTING FUNCTION **\\
   function sortOn( arr = [], prop = "", type = 1) {
      arr.sort(
         function(a, b) {
            if (a[prop] < b[prop])
               return -1 * type;
            else if (a[prop] > b[prop])
               return 1 * type;
            else
            return 0;
         }
      );
      return arr;
   };
   //** END OF SORTING FUNCTION **\\

   // DECREASE THE AMOUNT OF THE ITEM
   if ( action.type === DECREASE ) {

      let newTotal = state.total; // GET THE CURRENT TOTAL
      let newProducts = state.products.map((product) => {
         if ( product.id === action.payload.id ) {
            newTotal = newTotal - product.price;
            product = {...product, amount: product.amount - 1}            
         }
         return product;
      });

      let newBasket = newProducts.filter((product) => product.amount > 0)
      
      return {...state, products: newProducts, basket: newBasket, total: newTotal}
   }

   if ( action.type === INCREASE ) {
      
      let newTotal = state.total;
      let newProducts = state.products.map((product) => {
        if ( product.id === action.payload.id ) {
            newTotal = newTotal + product.price;
            product = {...product, amount: product.amount + 1}
         }
         return product;
      });

      let newBasket = state.basket.map((product) => {
         if ( product.id === action.payload.id ) {
            product = {...product, amount: product.amount + 1}
         }
         return product;
      });

      return {...state, products: newProducts, basket: newBasket, total: newTotal};
   }

   // ADD ITEM TO BASKET
   if ( action.type === ADD_ITEM ) {
      let newTotal = state.total; // GET THE CURRENT TOTAL
      let newBasket = [...state.basket]; // CREATE A NEW BASKET ARRAY
      let newProducts = []; // CREATE A NEW PRODUCTS ARRAY

      newProducts = state.products.map((product) => { // FIND THE ADDED ITEM, ADD ITS PRICE TO TOTAL AND PUSH IT TO BASKET ARRAY
         if ( product.id === action.payload.ownProps.id ) {
            newTotal = newTotal + product.price;
            product = {...product, amount: product.amount + 1};
            newBasket.push( product );
         }
         return product;
      });

      // CHECK IF THE NEW PRODUCTS ARRAY IS EMPTY OR NOT
      if ( newProducts.length === 0 )
         newProducts = [...state.products];

      console.log(newBasket);
      return {...state, products: newProducts, basket: newBasket, total: newTotal}
   }

   if ( action.type === FILTER_SORT ) { 
      if ( action.payload.sortType === LOW_TO_HIGH ) {
         let newProducts = [...state.filteredArray];
         return {...state, filteredArray: sortOn(newProducts, "price")}
      }
      if ( action.payload.sortType === HIGH_TO_LOW ) {
         let newProducts = [...state.filteredArray];
         return {...state, filteredArray: sortOn(newProducts, "price", -1)}
      }
      if ( action.payload.sortType === NEW_TO_OLD ) {
         let newProducts = [...state.filteredArray];
         return {...state, filteredArray: sortOn(newProducts, "added")}
      }
      if ( action.payload.sortType === OLD_TO_NEW ) {
         let newProducts = [...state.filteredArray];
         return {...state, filteredArray: sortOn(newProducts, "price", -1)}
      }
   }

   if ( action.type === FILTER_BRAND ) {
      let newCompanies = state.companies.map((company) => { // SET THE COMPANIES' NEW SITUATION
         if ( company.id === action.payload.ownProps.id ) {
            let newChecked = !company.isChecked;
            company = {...company, isChecked: newChecked};
         } 
         return company;
      });
     
      let newCompanyFilteredArray = [];   // FILTER THE PRODUCTS ACCORDING TO BRAND FILTERS

      for ( let i = 0; i < newCompanies.length; i++ ) {
         for ( let j = 0; j < state.products.length; j++ ) {
            if ( newCompanies[i].isChecked ) {
               if ( newCompanies[i].slug === state.products[j].manufacturer ) {
                  newCompanyFilteredArray.push( state.products[j] );
               }
            }
         }
      }
      
      let count = 0; // CHECK THE NUMBER OF TAG FILTERS
      for ( let i = 0; i < state.tags.length; i++ ) {
         if ( state.tags[i].isChecked )
            count = count + 1;
      }
      
      let companyCount = 0; // CHECK THE NUMBER OF COMPANY FILTERS
      for ( let i = 0; i < newCompanies.length; i++ ) {
         if ( newCompanies[i].isChecked )
            companyCount = companyCount + 1;
      }

      if ( companyCount === 0 && count === 0 ) { // IF THE NUMBER OF BOTH BRAND AND TAG FILTERS = 0, THEN SEND PRODUCTS ARRAY
         return {...state, companies: newCompanies, filteredArray: [...state.products]}
      }
      else if ( companyCount === 0 && count > 0 ) { // IF THE NUMBER OF COMPANY FILTERS = 0, THEN FILTER THE PRODCUTS WTIH TAG FILTER 
         let newTagFilteredArray = [];
         for ( let i = 0; i < state.tags.length; i++ ) {
            for ( let j = 0; j < state.products.length; j++ ) {
               for ( let k = 0; k < state.products[j].tags.length; k++ )
               if ( state.tags[i].isChecked ) {
                  if ( state.tags[i].tagName === state.products[j].tags[k] ) {
                     newTagFilteredArray.push( state.products[j] );
                  }
               }
            }
         }
         
         return {...state, companies: newCompanies, filteredArray: newTagFilteredArray}
      }
      else if ( companyCount > 0 && count > 0 ) { // IF THE NUMBER OF BOTH BRAND AND TAG FILTER > 0 , THEN FILTER THE NEWCOMPANYFILTERED ARRAY 
         let newCompanyAndTagFilteredArray = [];

         for ( let i = 0; i < state.tags.length; i++ ) {
            for ( let j = 0; j < newCompanyFilteredArray.length; j++ ) {
               for ( let k = 0; k < newCompanyFilteredArray[j].tags.length; k++ )
               if ( state.tags[i].isChecked ) {
                  if ( state.tags[i].tagName === newCompanyFilteredArray[j].tags[k] ) {
                     newCompanyAndTagFilteredArray.push( newCompanyFilteredArray[j] );
                  }
               }
            }
         }
      
         return {...state, companies: newCompanies, filteredArray: newCompanyAndTagFilteredArray}
      }
      // IF THE NUMBER OF TAG FILTER = 0 AND THE NUMBER OF COMPANY FILTER > 0, THEN SEND THE NEWCOMPANYFILTERED ARRAY 
      return {...state, companies: newCompanies, filteredArray: newCompanyFilteredArray}
      
   }

   if ( action.type === FILTER_TAG ) {
      let newTags = state.tags.map((tag) => { // SET THE TAGS' NEW SITUATION
         if ( tag.tagName === action.payload.ownProps.tagName ) {
            let newChecked = !tag.isChecked;
            tag = {...tag, isChecked: newChecked};
         } 
         return tag;
      });
      
      let newTagFilteredArray = [];
      
      for ( let i = 0; i < newTags.length; i++ ) { // FILTER THE PRODUCTS ACCORDING TO TAG FILTERS
         for ( let j = 0; j < state.products.length; j++ ) {
            for ( let k = 0; k < state.products[j].tags.length; k++ )
            if ( newTags[i].isChecked ) {
               if ( newTags[i].tagName === state.products[j].tags[k] ) {
                  newTagFilteredArray.push( state.products[j] );
               }
            }
         }
      }
      console.log( newTagFilteredArray );
      let count = 0; 
      for ( let i = 0; i < state.companies.length; i++ ) { // CHECK THE NUMBER OF COMPANY FILTERS
         if ( state.companies[i].isChecked )
            count = count + 1;
      }

      let tagCount = 0; // CHECK THE NUMBER OF TAG FILTERS
      for ( let i = 0; i < newTags.length; i++ ) {
         if ( newTags[i].isChecked )
            tagCount = tagCount + 1;
      }

      console.log( "count: " + count );
      console.log( "tagCount: " + tagCount );

      if ( tagCount === 0 && count === 0 ) { // IF THE NUMBER OF BOTH BRAND AND TAG FILTERS = 0, THEN SEND PRODUCTS ARRAY
         return {...state, tags: newTags, filteredArray: [...state.products]}
      }
      else if ( tagCount === 0 && count > 0 ) { // IF THE NUMBER OF TAG FILTERS = 0, THEN FILTER THE PRODCUTS WITH COMPANY FILTER 
         let newCompanyFilteredArray = [];

         for ( let i = 0; i < state.companies.length; i++ ) {
            for ( let j = 0; j < state.products.length; j++ ) {
               if ( state.companies[i].isChecked ) {
                  if ( state.products[j].manufacturer === state.companies[i].slug ) {
                     newCompanyFilteredArray.push( state.products[j] );
                  }
               }
            }
         }

         return {...state, tags: newTags, filteredArray: newCompanyFilteredArray}
      }
      else if ( tagCount > 0 && count > 0 ) { // IF THE NUMBER OF BOTH BRAND AND TAG FILTER > 0 , THEN FILTER THE NEWTAGFILTERED ARRAY 
         let newCompanyAndTagFilteredArray = [];
         
         for ( let i = 0; i < state.companies.length; i++ ) {
            for ( let j = 0; j < newTagFilteredArray.length; j++ ) {
               if ( state.companies[i].isChecked ) {
                  if ( state.companies[i].slug === newTagFilteredArray[j].manufacturer ) {
                     newCompanyAndTagFilteredArray.push( newTagFilteredArray[j] );
                  }
               }
            }
         }
         
         return {...state, tags: newTags, filteredArray: newCompanyAndTagFilteredArray}
      }
      // IF THE NUMBER OF COMPANY FILTER = 0 AND THE NUMBER OF TAG FILTER > 0, THEN SEND THE NEWTAGFILTERED ARRAY 
      return {...state, tags: newTags, filteredArray: newTagFilteredArray}
   }
   
   if ( action.type === SHOW_ALL_BRAND ) {
      let newCompanies = state.companies.map((item) => {
         return {...item, isChecked: false}
      });

      let newFilteredArray = [];

      let count = 0;
      for ( let i = 0; i < state.tags.length; i++ ) {
         if ( state.tags[i].isChecked )
            count = count + 1;
      }

      if ( count > 0 ) {
         for ( let i = 0; i < state.tags.length; i++ ) {
            for ( let j = 0; j < state.products.length; j++ ) {
               for ( let k = 0; k < state.products[j].tags.length; k++ )
               if ( state.tags[i].isChecked ) {
                  if ( state.tags[i].tagName === state.products[j].tags[k] ) {
                     newFilteredArray.push( state.products[j] );
                  }
               }
            }
         }

         return {...state, companies: newCompanies, filteredArray: newFilteredArray}
      }
      
      return {...state, companies: newCompanies, filteredArray: [...state.products]}
   }

   if ( SHOW_ALL_TAG ) {
      let newTags = state.tags.map((item) => {
         return {...item, isChecked: false}
      });

      let newFilteredArray = [];

      let count = 0;
      for ( let i = 0; i < state.companies.length; i++ ) {
         if ( state.companies[i].isChecked )
            count = count + 1;
      }

      if ( count > 0 ) {
         for ( let i = 0; i < state.companies.length; i++ ) {
            for ( let j = 0; j < state.products.length; j++ ) {
               if ( state.companies[i].isChecked ) {
                  if ( state.companies[i].slug === state.products[j].manufacturer ) {
                     newFilteredArray.push( state.products[j] );
                  }
               }
            }
         }

         return {...state, tags: newTags, filteredArray: newFilteredArray}
      }

      return {...state, tags: newTags, filteredArray: [...state.products]}
   }
   return state;
}

export default reducer;