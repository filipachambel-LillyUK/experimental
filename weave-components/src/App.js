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
import Alerts from './Alert/Alerts';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const year = json.year;
  const endYearOffset = 3;
  const date = +echarts.time.parse(year + '-01-01');
  const end = +echarts.time.parse(+year + endYearOffset + '-01-01');
  const dayTime = 3600 * 24 * 1000;

  const options = json.option;

  // for (let time = date; time < end; time += dayTime) {
  //   data.push([
  //     echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
  //     Math.floor(Math.random() * 10000)
  //   ]);
  // }

  useEffect(() => {
    const generatedData = [];
    for (let time = date; time < end; time += dayTime) {
      generatedData.push([
        echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
        Math.floor(Math.random() * 10000),
      ]);
    }
    setData(generatedData);
  }, [date, end, dayTime]);

  return (
    <Provider store={store}>
    <div className="App" data-testid='app-component'>
   
    <Router>
         {/* <Breadcrumbs paths={routes}/> */}
         {/* <Alerts title="New title" content="New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content" position="topRight" type="warning"/> */}
      <Chart options={options}/>
      <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component}/>
      ))}
      </Routes>
    </Router>
    </div>
    </Provider>
  );
}

