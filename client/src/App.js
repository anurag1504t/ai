import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import Navbar from './Components/navbar';
import Dashboard from './Components/dashboard';
import Stats from './Components/stats';
import StatsStudents from './Components/statsstudent';
import College from './Components/college';
import Students from './Components/students';
const Routing = () => {
    return ( 
        <Switch>
            <Route path='/dashboard'>
                <Dashboard />
            </Route>
            <Route path='/cstat/:userid'>
                <Stats />
            </Route>
            <Route path='/sstat/:userid'>
                <StatsStudents />
            </Route>
            <Route path='/college/:userid'>
                <College />
            </Route>
            <Route path='/students/:userid'>
                <Students />
            </Route>
            <Redirect to="/dashboard" />
        </Switch>
    )
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routing />
            </BrowserRouter>
        </div>
    );
}

export default App;
