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

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route exact path="/myorder" element={<MyOrder />}></Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
