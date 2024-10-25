import { render, screen, waitFor, act } from '@testing-library/react';
import Alerts from "./Alerts"

test('render the alert component', ()=>{
    render(<Alerts/>);
    const alertElement = screen.getByTestId('alert-component');
    expect(alertElement).toBeInTheDocument();

})

test('disappears after the displayTime is reached', async()=>{

jest.useFakeTimers();
render(<Alerts displayTime={3000} title="Timed Alert"/>);
expect(screen.queryByText('Timed Alert')).toBeInTheDocument();
act(() => {
    jest.advanceTimersByTime(4000);
  });
jest.runOnlyPendingTimers();
await waitFor(() => {
    expect(screen.queryByText('Timed Alert')).not.toBeInTheDocument();
  });
jest.useRealTimers();
})