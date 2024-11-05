import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Chart from './Chart';
import '@testing-library/jest-dom';
import * as echarts from 'echarts';

const mockOptions = {
    title: {
      top: 30,
      left: "center",
      text: "Daily Step Count",
      show: true
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 10000,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 65
    },
    calendar: {
      top: 150,
      left: 30,
      right: 30,
      cellSize: ["auto", 13],
      range: ["2019-01-02", "2020-10-29"],
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { "show": true }
    }
}

const mockData = [
    ["2020-01-04", 1],
    ["2020-01-10", 2],
    ["2020-01-07", 3],
    ["2020-01-03", 4],
    ["2020-01-09", 5]
]

describe('Chart Component', () => {
  beforeEach(()=> {
    jest.spyOn(echarts, 'init').mockImplementation(() => {
        return {
            setOption: jest.fn(),
            resize: jest.fn(),
            dispose: jest.fn(),
            getDom: jest.fn().mockReturnValue({ getContext: jest.fn() })
        };
    });
  });

  afterEach(() => {
    // cleanup();
    jest.clearAllMocks();
  });

  it('renders the chart container', () => {
    render(<Chart options={mockOptions} data={mockData} />);
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeInTheDocument();
  });

  it('renders with options and data props && with the default style', () => {
    render(<Chart options={mockOptions} data={mockData}/>);
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toHaveStyle('height: 100vh');
    expect(chartContainer).toHaveStyle('width: 100%');
  });

  it('throws error when no options are provided', () => {
    const consoleSpy = jest.spyOn(console,'error').mockImplementation(() => {});
    render(<Chart options={null} data={mockData}/>);
    expect(consoleSpy).toHaveBeenCalledWith('Validation logic: ', 'No options');
    consoleSpy.mockRestore();
  });

  it('validates date range correctly', () => {
    const invalidOptions = {
        ...mockOptions,
        calendar: {
            ...mockOptions.calendar,
            range: ['invalid-date', '2020-10-29']
        }
    };
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Chart options={invalidOptions} data={mockData}/>);
    expect(consoleSpy).toHaveBeenCalledWith('Validation logic: ', 'Invalid date format. Please use YYYY-MM-DD format.');
    consoleSpy.mockRestore();
});

//   it('initialises echart and sets options config', () => {
//     const chartInstanceMock = echarts.init.mock.results[0].value;
//     render(<Chart options={mockOptions} data={mockData}/>);
//     expect(echarts.init).toHaveBeenCalled(1);
//     expect(chartInstanceMock.setOption).toHaveBeenCalledWith(expect.objectContaining({
//         series: [{
//             type: 'heatmap',
//             coordinateSystem: 'calendar',
//             data: mockData
//         }],
       
//     }),
// true
// );
//   });

// it('disposes chart on unmount', ()=> {
//     const chartInstanceMock = echarts.init.mock.results[0].value;
//     const {unmount} = render(<Chart options={mockOptions} data={mockData}/>);
//     unmount();
//     expect(chartInstanceMock.dispose).toHaveBeenCalledTimes(1);
// })


});


