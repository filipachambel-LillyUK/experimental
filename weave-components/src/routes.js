import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";

const routes = [
    {
        path: '/',
        exact: true,
        component: <Homepage/>,
        label: 'Homepage'
    },
    {
        path: '/dashboard',
        exact: true,
        component: <Dashboard/>,
        label: 'Dashboard'
    }
];



export default routes;