import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes, // The switch is updated into Routes now
  Route
} from "react-router-dom";
import Login from './screens/Login';
// These below import are only for working the carousel beacuse the bootstrap is wroking with some javascript that we dont have.
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>
    <Router>
      {/* <Home/>; */}
     <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/createuser' element={<SignUp/>}></Route>
     </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
