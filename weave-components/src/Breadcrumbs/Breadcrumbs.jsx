import React, { isValidElement } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumbs = ({ paths }) => {
  const currentLocation = useLocation();

  const isValidPath = (path) => {
    return (
    path &&
      typeof path.path === "string" &&
      typeof path.exact === "boolean" &&
      isValidElement(path.component) &&
      typeof path.label === "string"
    );
  }

  const hasDuplicatePathsOrComponents = () => {
    const pathSet = new Set();
    const componentTypeSet = new Set();
  
    return paths.some((path) => {
      const componentType = path.component.type; // Compare by component type
  
      if (pathSet.has(path.path) || componentTypeSet.has(componentType)) {
        return true;
      }
      pathSet.add(path.path);
      componentTypeSet.add(componentType);
      return false;
    });
  };
  

    if (!paths || paths.length === 0 || !paths.every(isValidPath) || hasDuplicatePathsOrComponents()) {
        console.error("Invalid paths prop");
        return null;
    }
    return (
      <div className="p-4 flex">
        <nav aria-label="breadcrumb">
          <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
            {paths.map((path, index) => (
              <div className="flex" key={index}>
                {index > 0 && (
                  <li>
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </li>
                )}
                <li
                  key={index}
                  className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800 px-2"
                  aria-current="page"
                >
                  <Link
                    to={path.path}
                    className={`${
                      currentLocation.pathname === path.path
                        ? "flex cursor-pointer items-center text-sm text-slate-800"
                        : "flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800"
                    }`}
                  >
                    {path.label}
                  </Link>
                </li>
              </div>
            ))}
          </ol>
        </nav>
      </div>
    );
};

Breadcrumbs.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool,
      component: PropTypes.element.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumbs;
