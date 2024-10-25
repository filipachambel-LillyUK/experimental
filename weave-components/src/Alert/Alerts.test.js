import { render, screen, waitFor, act } from "@testing-library/react";
import Alerts from "./Alerts";

describe("Alerts component", () => {
  //renders with and without props
  test("renders with default values for missing props", () => {
    render(<Alerts />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toBeInTheDocument();
    //default title and content
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide content for the alert")
    ).toBeInTheDocument();
    //default type regular
    const iconElement = screen.getByTestId("alert-icon");
    const closeElement = screen.getByTestId("alert-close-button");

    expect(alertElement).toHaveClass("bg-blue-100");
    expect(alertElement).toHaveClass("border-blue-500");
    expect(alertElement).toHaveClass("text-blue-900");
    expect(alertElement).toHaveClass("rounded-b");
    expect(iconElement).toHaveClass("text-blue-500");
    expect(closeElement).toHaveClass(
      "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:text-blue-400"
    );

    //position center by default
    expect(alertElement).toHaveStyle({
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 50,
    });
  });

  //renders with title and content props
  test("renders with title and content", () => {
    render(<Alerts title="New title" content="New content" />);
    expect(screen.getByText("New title")).toBeInTheDocument();
    expect(screen.getByText("New content")).toBeInTheDocument();
  });

  //renders with position prop

  //renders styles based on type prop
  test("renders correct styles when type success prop is given", () => {
    render(<Alerts type="success" />);
    const alertElement = screen.getByTestId("alert-component");
    const iconElement = screen.getByTestId("alert-icon");
    const closeElement = screen.getByTestId("alert-close-button");

    expect(alertElement).toHaveClass("bg-teal-100");
    expect(alertElement).toHaveClass("border-teal-500");
    expect(alertElement).toHaveClass("text-teal-900");
    expect(alertElement).toHaveClass("rounded-b");
    expect(iconElement).toHaveClass("text-teal-500");
    expect(closeElement).toHaveClass(
      "bg-teal-50 text-teal-500 focus:ring-teal-400 hover:bg-teal-200 dark:text-teal-400"
    );
  });

  test("renders correct styles when type warning prop is given", () => {
    render(<Alerts type="warning" />);
    const alertElement = screen.getByTestId("alert-component");
    const iconElement = screen.getByTestId("alert-icon");
    const closeElement = screen.getByTestId("alert-close-button");

    expect(alertElement).toHaveClass("bg-orange-100");
    expect(alertElement).toHaveClass("border-orange-500");
    expect(alertElement).toHaveClass("text-orange-900");
    expect(alertElement).toHaveClass("rounded-b");
    expect(iconElement).toHaveClass("text-orange-500");
    expect(closeElement).toHaveClass(
      "bg-orange-50 text-orange-500 focus:ring-orange-400 hover:bg-orange-200 dark:text-orange-400"
    );
  });

  test("renders correct styles when type error prop is given", () => {
    render(<Alerts type="error" />);
    const alertElement = screen.getByTestId("alert-component");
    const iconElement = screen.getByTestId("alert-icon");
    const closeElement = screen.getByTestId("alert-close-button");

    expect(alertElement).toHaveClass("bg-red-100");
    expect(alertElement).toHaveClass("border-red-500");
    expect(alertElement).toHaveClass("text-red-900");
    expect(alertElement).toHaveClass("rounded-b");
    expect(iconElement).toHaveClass("text-red-500");
    expect(closeElement).toHaveClass(
      "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:text-red-400"
    );
  });

  //renders correct styles depending on the position prop
  test("renders with correct position prop topRight", () => {
    render(<Alerts position="topRight" />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "absolute",
      top: `0px`,
      right: `0px`,
    });
  });

  test("renders with correct position prop topLeft", () => {
    render(<Alerts position="topLeft" />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "absolute",
      top: `0px`,
      left: `0px`,
    });
  });

  test("renders with correct position prop bottomRight", () => {
    render(<Alerts position="bottomRight" />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "absolute",
      bottom: `0px`,
      right: `0px`,
    });
  });

  test("renders with correct position prop bottomLeft", () => {
    render(<Alerts position="bottomLeft" />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "absolute",
      bottom: `0px`,
      left: `0px`,
    });
  });

  test("renders with correct position prop centerTop", () => {
    render(<Alerts position="centerTop" />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "fixed",
      top: `0px`,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
    });
  });

  test("renders with correct position prop centerTop", () => {
    render(<Alerts position="centerBottom" />);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "fixed",
      bottom: `0px`,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
    });
  });

  test("renders with correct position prop and specific x or y", () => {
    render(<Alerts position="centerBottom" y={20}/>);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "fixed",
      bottom: `20px`,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 50,
    });
  });

  test("renders with correct position prop and specific x or y", () => {
    render(<Alerts position="topRight" y={20} x={20}/>);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "absolute",
      top: `20px`,
      right: "20px",
    });
  });

  //invalid position prop renders with center default position
  test("renders with center default position if the value of position is invalid", () => {
    render(<Alerts position="topright" y={20} x={20}/>);
    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toHaveStyle({
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 50,
    });
  });

  //disappears after the displayTime is reached
  test("disappears after the displayTime is reached", async () => {
    jest.useFakeTimers();
    render(<Alerts displayTime={3000} title="Timed Alert" />);
    expect(screen.queryByText("Timed Alert")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(screen.queryByText("Timed Alert")).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });

  //disappears when close button is clicked
  test("disappears when close button is clicked", async () => {
    render(<Alerts title="Close Alert" />);
    expect(screen.queryByText("Close Alert")).toBeInTheDocument();
    const closeElement = screen.getByTestId("alert-close-button");
    act(() => {
      closeElement.click();
    });
    await waitFor(() => {
      expect(screen.queryByText("Close Alert")).not.toBeInTheDocument();
    });
  });
});


