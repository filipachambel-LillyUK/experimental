//Heatmap Chart component - takes as inputs data 
//from App.js and options from json (chartConfig.json)

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import PropTypes from "prop-types";

export default function Chart({ options }) {
  const chartRef = useRef(null); 
  const [data, setData] = useState([]);

  const validateRange = () => {
    try {
      const range = options?.calendar?.range;
      if(!Array.isArray(range) || range.length !== 2) {
        throw new Error("Range should be an array with 2 date strings: e.g.: ['2017-01-02', '2024-10-29'] ");
      }

      const [startDate, endDate] = range;
      if(typeof startDate !== 'string' || typeof endDate !== 'string') {
        throw new Error("Start date and end date should be strings in YYYY-MM-DD format.");
      }

      
      const start = +echarts.time.parse(startDate);
      const end = +echarts.time.parse(endDate);

      if(isNaN(start) || isNaN(end)) {
        throw new Error("Invalid date format. Please use YYYY-MM-DD format.");
      }

      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();

      if(start > end){
        throw new Error("Start date should be before the end date.");
      }

      const endYearOffset = endYear - startYear;
      return { start, end, endYearOffset, startYear };
    } catch (error) {
      console.error(error.message);
      return null;      
    }
  }

  useEffect(() => {
    const dateRange = validateRange();
    if(!dateRange) return;
    
    const { start, end, endYearOffset } = dateRange;
    const dayTime = 3600 * 24 * 1000;

    const generateData = async () => {
      const generatedData = [];
      for (let time = start; time < end; time += dayTime) {
        generatedData.push([
          echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
          Math.floor(Math.random() * 10000),
        ]);
      }
      setData(generatedData);
    };
  
    generateData();
  }, [options]);

 

  useEffect(() => {
    if(!data.length) return;
    const chartInstance = echarts.init(chartRef.current); 

    const chartOptions = {
      ...options, 
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: data || [], 
        },
      ],
    };

    chartInstance.setOption(chartOptions);

    return () => {
      chartInstance.dispose();
    };
  }, [options, data]);

  return (
    <div
      ref={chartRef}
      style={{ height: "400px", width: "100%" }}
    />
  );
};

Chart.propTypes = {
  options: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};