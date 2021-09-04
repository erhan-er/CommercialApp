import { INCREASE, DECREASE, ADD_ITEM, FILTER_SORT, FILTER_BRAND, FILTER_TAG } from "./actions";
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
      console.log(arr);
      return arr;
   };
   //** END OF SORTING FUNCTION **\\

   if ( action.type === DECREASE ) {

      let newTotal = state.total;
      let newProducts = state.products.map((product) => {
         if ( product.id === action.payload.id ) {
            newTotal = newTotal - product.price;
            product = {...product, amount: product.amount - 1}            
         }
         return product;
      });

      if ( newProducts.filter((product) => product.amount > 0 ).length === 0 )
         return {...state, products: newProducts, total: newTotal, isBasketEmpty: true};
      else
         return {...state, products: newProducts, total: newTotal};
   }

   if ( action.type === INCREASE ) {
      
      let newTotal = state.total;
      let newProducts = state.products.map((product) => {
        if ( product.id === action.payload.id ) {
            newTotal = newTotal + product.price;
            product = {...product, amount: product.amount + 1}
            console.log(product);
         }
         return product;
      });
      return {...state, products: newProducts, total: newTotal};
   }

   if ( action.type === ADD_ITEM ) {
      let newTotal = state.total;
      let newProducts = state.products.map((product) => {
         if ( product.id === action.payload.ownProps.id ) {
            newTotal = newTotal + product.price;
            product = {...product, amount: product.amount + 1};
         }
         
         return product;
      });

      return {...state, products: newProducts, total: newTotal, isBasketEmpty: false}
   }

   if ( action.type === FILTER_SORT ) { 
      if ( action.payload.sortType === LOW_TO_HIGH ) {
         let newProducts = [...state.products];
         return {...state, products: sortOn(newProducts, "price")}
      }
      if ( action.payload.sortType === HIGH_TO_LOW ) {
         let newProducts = [...state.products];
         return {...state, products: sortOn(newProducts, "price", -1)}
      }
      if ( action.payload.sortType === NEW_TO_OLD ) {
         let newProducts = [...state.products];
         return {...state, products: sortOn(newProducts, "added")}
      }
      if ( action.payload.sortType === OLD_TO_NEW ) {
         let newProducts = [...state.products];
         return {...state, products: sortOn(newProducts, "price", -1)}
      }
   }

   if ( action.type === FILTER_BRAND ) {
      let newCompanies = state.companies.map((company) => {
         if ( company.id === action.payload.ownProps.id ) {
            let newChecked = !company.isChecked;
            company = {...company, isChecked: newChecked};
         } 
         return company;
      });
     
      let newCompanyFilteredArray = [];

      for ( let i = 0; i < newCompanies.length; i++ ) {
         for ( let j = 0; j < state.products.length; j++ ) {
            if ( newCompanies[i].isChecked ) {
               if ( newCompanies[i].slug === state.products[j].manufacturer ) {
                  newCompanyFilteredArray.push( state.products[j] );
               }
            }
         }
      }
      
      let count = 0;
      for ( let i = 0; i < state.tags.length; i++ ) {
         if ( state.tags[i].isChecked )
            count = count + 1;
      }

      if ( count > 0 ) {
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
      
      return {...state, companies: newCompanies, filteredArray: newCompanyFilteredArray}
      
   }

   if ( action.type === FILTER_TAG ) {
      let newTags = state.tags.map((tag) => {
         if ( tag.tagName === action.payload.ownProps.tagName ) {
            let newChecked = !tag.isChecked;
            tag = {...tag, isChecked: newChecked};
         } 
         return tag;
      });
      
      let newTagFilteredArray = [];
      
      for ( let i = 0; i < state.companies.length; i++ ) {
         for ( let j = 0; j < state.products.length; j++ ) {
            if ( state.companies[i].isChecked ) {
               if ( state.companies[i].slug === state.products[j].manufacturer ) {
                  newTagFilteredArray.push( state.products[j] );
               }
            }
         }
      }

      let count = 0;
      for ( let i = 0; i < state.companies.length; i++ ) {
         if ( state.companies[i].isChecked )
            count = count + 1;
      }

      if ( count > 0 ) {
         let newCompanyAndTagFilteredArray = [];
      
         for ( let i = 0; i < newTags.length; i++ ) {
            for ( let j = 0; j < newTagFilteredArray.length; j++ ) {
               for ( let k = 0; k < newTagFilteredArray[j].tags.length; k++ )
               if ( newTags[i].isChecked ) {
                  if ( newTags[i].tagName === newTagFilteredArray[j].tags[k] ) {
                     newCompanyAndTagFilteredArray.push( newTagFilteredArray[j] );
                  }
               }
            }
         }
         
         return {...state, tags: newTags, filteredArray: newCompanyAndTagFilteredArray}
      }
      
      return {...state, tags: newTags, filteredArray: newTagFilteredArray}
   }
   
   return state;
}

export default reducer;