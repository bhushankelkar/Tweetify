
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/pages/Home';

import Footer from './components/Footer';
import LogIn from './components/pages/LogIn';
import Dashboard from './components/pages/ClientDashboard';
import Service1 from './components/pages/Service1';
import ClientMainPage from './components/pages/ClientMainPage';
import ClientCompare from './components/pages/ClientComparison';
import Demo from './components/pages/DemoModel';
import AddProduct from './components/pages/AddProduct';
import SignUp from './components/pages/SignUp';
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
    
        <Route path="/login" component={LogIn}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/service1" component={Service1}/>
        <Route path="/mainpage" component={ClientMainPage}/>
        <Route path="/compare" component={ClientCompare}/>
        <Route path="/demo" component={Demo}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/addproduct" component={AddProduct}/>
      </Switch>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
