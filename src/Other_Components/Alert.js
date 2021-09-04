import { useEffect } from "react";
import { connect } from "react-redux";
import { DELETE_ALERT } from "../Reducer/actions";
import AlertUI from '@material-ui/lab/Alert';

const Alert = ({alert, dispatch}) => {
   //const [alert, setAlert] = useState();

   const removeAlert = () => {
      console.log("removed");
      dispatch({type: DELETE_ALERT});
   }

   useEffect(() => {
      const timeout = setTimeout(() => {
         removeAlert();
      },3000)
      return () => clearTimeout(timeout);
   }, []);
   return (
      <AlertUI severity = "success" >Added to Basket</AlertUI>
   );
}

const mapStateToProps = state => {   
   return {alert: state.alert}
}

export default connect(mapStateToProps) (Alert)