//Heatmap Chart component - takes as inputs data
//from App.js and options from json (chartConfig.json)

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import PropTypes from "prop-types";

export default function Chart({ options, data }) {
  const [error, setError] = useState(null);

  const validateRange = useCallback(() => {
    try {
      const title = options?.title || {};
      const tooltip = options?.tooltip || {};
      const visualMap = options?.visualMap || {};
      const calendar = options?.calendar || {};

      //Title validation
      if (
        title.top &&
        !/^(\d+(\.\d+)?(px|%)?|top|middle|bottom)$/.test(title.top)
      ) {
        console.error("Validation logic: ","Title top should be a number, string or percentage.");
      }
      if (
        title.left &&
        !/^(\d+(\.\d+)?(px|%)?|left|center|right)$/.test(title.left)
      ) {
        console.error("Validation logic: ","Title left should be a number, string or percentage.");
      }
      if (title.text && typeof title.text !== "string") {
        console.error("Validation logic: ","Title text should be a string.");
      }
      if (title.show && typeof title.show !== "boolean") {
        console.error("Validation logic: ","Title show should be a boolean.");
      }

      //Tooltip validation TODO: Add content to tooltip
      if (Object.keys(tooltip).length !== 0) {
        console.error('Validation logic: ', "Tooltip should be an empty object.");
      }

      //VisualMap validation
      if (
        visualMap.type &&
        !["piecewise", "continuous"].includes(visualMap.type)
      ) {
        console.error("Validation logic: ",
          "VisualMap type should be either 'piecewise' or 'continuous'."
        );
        console.error("Validation logic: ",
          "VisualMap type should be either 'piecewise' or 'continuous'."
        );
      }
      if (
        visualMap.orient &&
        !["horizontal", "vertical"].includes(visualMap.orient)
      ) {
        console.error("Validation logic: ",
          "VisualMap orient should be either 'horizontal' or 'vertical'."
        );
      }

      //Calendar validation
      const cellSize = calendar?.cellSize;
      if (
        cellSize &&
        !(
          typeof cellSize === "number" ||
          (Array.isArray(cellSize) && cellSize.length === 2)
        )
      ) {
        console.error("Validation logic: ",
          "Cell size should be a number or an array with two values."
        );
      }

      const range = calendar?.range;

      if (!Array.isArray(range) || range.length !== 2) {
        console.error("Validation logic: ","Range should be an array with 2 date strings: e.g.: ['2017-01-02', '2024-10-29'] "
        );
      }

      const [startDate, endDate] = range;
      if (typeof startDate !== "string" || typeof endDate !== "string") {
        console.error("Validation logic: ","Start date and end date should be strings in YYYY-MM-DD format."
        );
      }

      const start = +echarts.time.parse(startDate);
      const end = +echarts.time.parse(endDate);

      if (isNaN(start) || isNaN(end)) {
        console.error('Validation logic: ', 'Invalid date format. Please use YYYY-MM-DD format.');
      }

      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();

      if (start > end) {
        console.error("Validation logic: ","Start date should be before the end date.");
      }

      const endYearOffset = endYear - startYear;
      return { start, end, endYearOffset, startYear };
    } catch (error) {
      console.error("Validation logic: ", error.message);
      return null;
    }
  }, [options]);

  useEffect(() => {
    if (!options) {
      console.error('Validation logic: ', 'No options')
      setError("EChart requires an option config prop to render.");
      return;
    } else if(!data){
      console.error("Please input data prop.")
    }
    validateRange();

    var chartInstance = echarts.init(
      document.getElementById("chart-container"),
      null,
      {
        renderer: "canvas",
        useDirtyRect: true,
      }
    );

    try {
      const chartOptions = {
        ...options,
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: data || [],
          },
        ],
      };

      chartInstance.setOption(chartOptions, true); //true param needed for the chart to re-render when options or data are changed
      
    } catch (error) {
      setError("Chart not rendering");
      console.error("Chart not rendering");
    }

    window.addEventListener("resize", chartInstance.resize);
      return () => {
        if (chartInstance && typeof chartInstance.dispose === "function") {
          chartInstance.dispose();
        }
      };
  }, [options, data]);

  return (
    <div>
      {options ? (
        <div
          id="chart-container"
          style={{ height: "100vh", width: "100%" }}
          data-testid="chart-container"
        />
      ) : (
        <>{error}</>
      )}
    </div>
  );
}

Chart.propTypes = {
  options: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};
