import React, { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function Alerts({
  type,
  position,
  x,
  y,
  displayTime,
  title,
  content,
}) {
  // props = position, content, type, display time

  // position prop can have the values:
  // topRight, topLeft, bottomRight, bottomLeft, centerTop, center, centerBottom
  // x = horizontal axis, y = vertical axis - if no value is provided, default is 0
  x = x || 0;
  y = y || 0;
  const getPositionStyles = () => {
    switch (position) {
      case "topRight":
        return { position: "absolute", top: `${y}px`, right: `${x}px` };
      case "topLeft":
        return { position: "absolute", top: `${y}px`, left: `${x}px` };
      case "bottomRight":
        return { position: "absolute", bottom: `${y}px`, right: `${x}px` };
      case "bottomLeft":
        return { position: "absolute", bottom: `${y}px`, left: `${x}px` };
      case "centerTop":
        return {
          position: "fixed",
          top: `${y}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        };
      case "centerBottom":
        return {
          position: "fixed",
          bottom: `${y}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        };
      case "center":
        return {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
        };
      default:
        return {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
        };
    }
  };

  const alertPosition = getPositionStyles();

  // alertContent prop has the title and content
  title = title || "Alert Title";
  content = content || "Please provide content for the alert";
  const alertContent = {
    header: `${title}`,
    body: `${content}`,
  };

  //type prop can have the values:
  // regular, success, warning, error
  const typeStyles = {
    regular: {
      background: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-900",
      icon: "text-blue-500",
      borderRadius: "rounded-b",
      closeIcon:
        "bg-blue-50 text-blue-500 focus:ring-blue-400 p-1.5 hover:bg-blue-200 dark:text-blue-400",
    },
    success: {
      background: "bg-teal-100",
      border: "border-teal-500",
      text: "text-teal-900",
      icon: "text-teal-500",
      borderRadius: "rounded-b",
      closeIcon:
        "bg-teal-50 text-teal-500 focus:ring-teal-400 p-1.5 hover:bg-teal-200 dark:text-teal-400",
    },
    warning: {
      background: "bg-orange-100",
      border: "border-orange-500",
      text: "text-orange-900",
      icon: "text-orange-500",
      borderRadius: "rounded-b",
      closeIcon:
        "bg-orange-50 text-orange-500 focus:ring-orange-400 p-1.5 hover:bg-orange-200 dark:text-orange-400",
    },
    error: {
      background: "bg-red-100",
      border: "border-red-500",
      text: "text-red-900",
      icon: "text-red-500",
      borderRadius: "rounded-b",
      closeIcon:
        "bg-red-50 text-red-500 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:text-red-400",
    },
  };

  const alertStyle = typeStyles[type] || typeStyles.regular;

  // if display time prop is provided, alert will disappear after that time
  // if not provided, alert will stay until user closes it
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (displayTime) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, displayTime);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [displayTime]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${alertStyle.background} ${alertStyle.border} ${alertStyle.borderRadius} ${alertStyle.text} px-4 py-3 shadow-md w-auto m-4`}
      role="alert"
      style={alertPosition}
      data-testid="alert-component"
    >
      <div className="flex-col">
        <div className="flex py-1 justify-evenly">
          <svg
            className={`fill-current h-7 w-7 ${alertStyle.icon} mr-4`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>

          <div className="mx-3">
            <p className="font-bold">{alertContent.header}</p>
            <p className="text-sm">{alertContent.body}</p>
          </div>
          <button
            type="button"
            className={`ms-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2  inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700 ${alertStyle.closeIcon}`}
            data-dismiss-target="#alert-border-1"
            aria-label="Close"
            onClick={handleClose}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

Alerts.prototype = {
  type: PropTypes.oneOf(["regular", "success", "warning", "error"]),
  position: PropTypes.oneOf([
    "topRight",
    "topLeft",
    "bottomRight",
    "bottomLeft",
    "centerTop",
    "center",
    "centerBottom",
  ]),
  x: PropTypes.number,
  y: PropTypes.number,
  displayTime: PropTypes.number,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
