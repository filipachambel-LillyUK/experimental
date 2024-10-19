//Heatmap Chart component - takes as inputs data 
//from App.js and options from json (chartConfig.json)

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function Chart({ options, data }) {
  const chartRef = useRef(null); 


  useEffect(() => {
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

