import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Chart from './Chart';
import '@testing-library/jest-dom';
import { createCanvas } from 'canvas';

describe('Chart Component', () => {
  const validOptions = {
    title: {
      text: 'Heatmap',
      top: 'center',
      left: 'center',
      show: true,
    },
    tooltip: {},
    visualMap: {
      type: 'piecewise',
      orient: 'horizontal',
    },
    calendar: {
      cellSize: [20, 20],
      range: ['2023-01-01', '2023-12-31'],
    },
  };

  const validData = [
    ['2023-01-01', 100],
    ['2023-01-02', 200],
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders the chart container', () => {
    HTMLCanvasElement.prototype.getContext = jest.fn();
    render(<Chart options={validOptions} data={validData} />);
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeInTheDocument();
  });

//   it('validates the options object correctly', () => {
//     HTMLCanvasElement.prototype.getContext = jest.fn();
//     const invalidOptions = {
//       ...validOptions,
//       title: { ...validOptions.title, top: 'invalidTopValue' }, // invalid value
//     };
//     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
//     render(<Chart options={invalidOptions} data={validData} />);
//     expect(consoleErrorSpy).toHaveBeenCalledWith("Validation logic: ", "Title top should be a number, string or percentage.");
    
//     consoleErrorSpy.mockRestore();
//   });

//   it('throws an error if the tooltip is not an empty object', () => {
//     const invalidTooltipOptions = {
//       ...validOptions,
//       tooltip: { show: true }, // Tooltip should be empty
//     };
//     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
//     render(<Chart options={invalidTooltipOptions} data={validData} />);
//     expect(consoleErrorSpy).toHaveBeenCalledWith("Validation logic: ", "Tooltip should be an empty object.");
    
//     consoleErrorSpy.mockRestore();
//   });

//   it('throws an error if the visualMap type is incorrect', () => {
//     const invalidVisualMapOptions = {
//       ...validOptions,
//       visualMap: { type: 'invalidType' }, // Invalid visualMap type
//     };
//     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
//     render(<Chart options={invalidVisualMapOptions} data={validData} />);
//     expect(consoleErrorSpy).toHaveBeenCalledWith("Validation logic", "VisualMap type should be either 'piecewise' or 'continuous'.");
    
//     consoleErrorSpy.mockRestore();
//   });

//   it('handles ECharts initialization and disposal correctly', () => {
//     const { rerender, unmount } = render(<Chart options={validOptions} data={validData} />);
//     const disposeSpy = jest.fn();
    
//     // Mock ECharts init and dispose methods
//     jest.spyOn(echarts, 'init').mockReturnValue({
//       setOption: jest.fn(),
//       dispose: disposeSpy,
//     });

//     // Test re-render with updated props
//     rerender(<Chart options={validOptions} data={[['2023-01-03', 300]]} />);
//     expect(disposeSpy).not.toHaveBeenCalled();

//     // Test cleanup
//     unmount();
//     expect(disposeSpy).toHaveBeenCalled();
//   });

//   it('logs an error when range dates are in the incorrect format', () => {
//     const invalidRangeOptions = {
//       ...validOptions,
//       calendar: { ...validOptions.calendar, range: ['2023-01-01', 'invalid-date'] },
//     };
//     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
//     render(<Chart options={invalidRangeOptions} data={validData} />);
//     expect(consoleErrorSpy).toHaveBeenCalledWith("Validation logic", "Invalid date format. Please use YYYY-MM-DD format.");
    
//     consoleErrorSpy.mockRestore();
//   });
});
