import { createContext,useContext,useReducer } from "react";
import Reducer from './Reducer'
const initialstate={
    error:false,
    isloading:false,
    user:null,
    mainuser:null
}
export const Context=createContext(initialstate);
export const ContextProvider=({children})=>{
    const [state,dispatch]=useReducer(Reducer,initialstate);
    return (
        <Context.Provider value={{state,dispatch}}>
            {children}
        </Context.Provider>
    )
}