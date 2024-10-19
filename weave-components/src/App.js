import logo from './logo.svg';
import './App.css';
import Chart from './Chart';
import json from './chartConfig.json';
import * as echarts from "echarts";
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes';

export default function App() {
  const year = 2016;
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + 1 + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  const options = json.option;
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return (
    <div className="App">
   
    <Router>
         <Breadcrumbs paths={routes}/>
      {/* <Chart options={options} data={data}/> */}
      <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component}/>
      ))}
      </Routes>
    </Router>
    </div>
  );
}

