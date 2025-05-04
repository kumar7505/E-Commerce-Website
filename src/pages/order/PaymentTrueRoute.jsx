import { useContext } from "react";
import myContext from "../../context/data/myContext";
import { Navigate } from "react-router-dom";


export const PaymentTrueRoute = ({children}) => {
    const {payment} = useContext(myContext);
    return children
  }