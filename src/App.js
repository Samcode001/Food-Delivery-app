import {
  BrowserRouter as Router,
  Routes, // The switch is updated into Routes now
  Route,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./context/ContextReducer";
import MyOrder from "./components/Myorder";
import OrderSuccess from './components/OrderSuccess.jsx'
import { RecoilRoot } from "recoil";
import Food_category from "./components/Food_category.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <RecoilRoot>
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/category" element={<Food_category />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route exact path="/myorder" element={<MyOrder />}></Route>
              <Route exact path="/paymentsuccess" element={<OrderSuccess />}></Route>
            </Routes>
          </Router>
        </RecoilRoot>
      </CartProvider>
    </>
  );
}

export default App;
