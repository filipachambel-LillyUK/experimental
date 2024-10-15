import logo from './logo.svg';
import './App.css';
import Chart from './Chart';
import json from './chartConfig.json';
import * as echarts from "echarts";

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
      <Chart options={options} data={data}/>
    </div>
  );
}

