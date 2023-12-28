
 const  Reducer=(state,action)=>{
    switch(action.type){
        case "loginmain":return {
            error:false,

            isfetching:false,
            mainuser:action.payload
        }
        case "loginstart":return {
            user:null,
            error:false,
            isfetching:true,
        }
        case "loginsuccess":return {
            user:action.payload,
            error:false,

            isfetching:false
        }
        case "loginfailure":return {
            user:null,
            error:true,
            isfetching:false
        }
        default:return state;
    }
}
export default Reducer;