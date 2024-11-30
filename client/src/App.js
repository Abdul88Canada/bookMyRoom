import logo from './logo.svg';
import './App.css';
//import './assets/css/styles.css';
import Index from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <Index />
    </div>
  );
}

export default App;
