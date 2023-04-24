import React, { createContext, useContext,useReducer } from 'react'

const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer=(state,action)=>{
switch (action.type) {
    case "ADD":
        return[...state,{ // in here we are using the spread operator(copying & merging).without hampering hte state i.e the data we are adding new data in database in form of object.
            id:action.id,
            name:action.name,
            qty:action.qty,
            size:action.size,
            price:action.price
        }]
        case 'REMOVE':
            let newArr=[...state]  // In here we can't chnage the state beacause it will hamper the other case so in here we take a temporary var then return with that var
            newArr.splice(action.index,1) // we are popping the element which present at index . The state is not changed but we are just giving an updated value os state data
            return newArr;

        // The Add and Remove functionality is same as it is in here in all the related apps but the Update functionality it's very specific that what app we are working on   

        case "UPDATE":
            let arr=[...state]
            arr.find((food,index)=>{
                if(food.id===action.id){
                    console.log(food.qty,parseInt(action.qty),action.price+food.price)
                    arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
                }
                return arr;
            })
          return arr;
       
          case "DROP":
            let emptyArray=[];
            return emptyArray;

    default:
        console.log("Error in Reducer");
        break;
}
}

export const CartProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, []) // Initial state is empty array
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext);
