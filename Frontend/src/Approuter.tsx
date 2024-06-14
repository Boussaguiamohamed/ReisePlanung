import { BrowserRouter as Router, Route,Routes, RouteProps} from 'react-router-dom';
import { Detailspage } from './pages/DetailsPage';
import { ReisePage } from './pages/ReisePage';
import { ReisezielPage } from './pages/ReisezielPage';
import { Countriespage } from './pages/Countriespage' ;
import { HomePage } from './pages/HomePage';
import { ReisesuchenPage } from './pages/ReisensuchenPage';
import { Addreiseziel } from './pages/Addreiseziel';



export type RouteConfig = RouteProps;

export const RouteConfig = [
    {
        path:'/',
        element: <HomePage/>

    },
    {
        path: '/details',
        element: <Detailspage/>
    },
    {
        path: '/reise',
        element: <ReisePage/>
    },
    {
        path: '/reiseziel',
        element: <ReisezielPage/>
    },
    {
        path:'/countries',
        element: <Countriespage/>
    },
    {
        path: '/reisesuchen',
        element: <ReisesuchenPage/>
    
    },
    {
        path: '/addreiseziel',
        element: <Addreiseziel/>
    
    },



];

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element= {<HomePage/>}></Route>
                <Route path="/details" element= {<Detailspage/>} ></Route>
                <Route path="/reisesuchen" element= {<ReisesuchenPage/>}></Route>
                <Route path="/reise" element= {<ReisePage/>}></Route>
                <Route path="/reiseziel" element= {<ReisezielPage/>}></Route>
                <Route path="/countries" element= {<Countriespage/>}></Route>
                <Route path="/addreiseziel" element= {<Addreiseziel/>}></Route>
                
            </Routes>
        </Router>
    )
}