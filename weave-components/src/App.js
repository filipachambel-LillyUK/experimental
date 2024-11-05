import logo from './logo.svg';
import './App.css';
import Chart from './Chart/Chart.jsx';
import json from './Chart/chartConfig.json';
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
import sampleData from './Chart/sample_bot_data.json';

export default function App() {
  const [data, setData] = useState([]);
  let options = json.option;
  // const [options, setOptions] = useState(null);

  //data by ID
  // useEffect(() => {
  //   const formattedData = sampleData.map(item => [
  //     item.created_date, 
  //     item.id            
  //   ]);
  //   setData(formattedData);
  // }, []);

  //count data by day
  useEffect(() => {
    const dateCounts = sampleData.reduce((acc, item) => {
      const date = new Date(item.created_date).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const formattedData = Object.entries(dateCounts).map(([date, count]) => [date, count]);
  
    setData(formattedData);
  }, []);

  return (
    <Provider store={store}>
    <div className="App" data-testid='app-component'>
   
    <Router>
         {/* <Breadcrumbs paths={routes}/> */}
         {/* <Alerts title="New title" content="New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content New content" position="topRight" type="warning"/> */}
        
          <Chart options={options} data={data}/>
       
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

