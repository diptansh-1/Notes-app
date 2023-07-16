import React from "react";

const Search = ({onChange}) => {
  return (
    <>
      <div className="mt-12 md:ml-[13px] md:mt-10 justify-self-end md:w-[50%]">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-40 md:w-full p-4 pl-10 text-sm text-gray-900 rounded-lg focus:border-none outline-gray-100"
              placeholder="Search"
              onChange={onChange}
              required
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
