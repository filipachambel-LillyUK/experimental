import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../routes';

const Breadcrumbs = ({paths}) => {
  return (
    <div className="p-4 flex">
      <nav aria-label="breadcrumb">
        <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
          {paths.map((path, index) => (
            <div className='flex' key={index}>
                {index > 0 && (
                    <li>
                 <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd">
                    </path>
                </svg>
            </li>
                )}
            <li
              key={index}
              className='flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800 px-2'
              aria-current="page"
            >
              <Link to={path.path} className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
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

export default Breadcrumbs;
