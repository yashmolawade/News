import React, { useState } from "react";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCountry,
  setSelectedCountry,
  sortBy,
  setSortBy,
  darkMode,
  toggleDarkMode,
  onSearch,
  bookmarksCount,
  onBookmarksClick,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const categories = [
    { id: "general", name: "General" },
    { id: "business", name: "Business" },
    { id: "sports", name: "Sports" },
    { id: "technology", name: "Technology" },
    { id: "health", name: "Health" },
    { id: "entertainment", name: "Entertainment" },
    { id: "science", name: "Science" },
  ];

  const countries = [
    { code: "us", name: "United States" },
    { code: "in", name: "India" },
    { code: "uk", name: "United Kingdom" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
  ];

  const sortOptions = [
    { value: "publishedAt", label: "Published Date" },
    { value: "relevancy", label: "Relevancy" },
    { value: "popularity", label: "Popularity" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b shadow-sm`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              NewsHub
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={onSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className={`w-full px-4 py-2 pl-10 pr-4 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg
                    className={`w-4 h-4 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={onBookmarksClick}
              className={`p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title="Bookmarks"
            >
              <div className="relative">
                <svg
                  className={`w-6 h-6 ${
                    darkMode ? "text-white" : "text-gray-700"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {bookmarksCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {bookmarksCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg"
            >
              <svg
                className={`w-6 h-6 ${
                  darkMode ? "text-white" : "text-gray-700"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <form onSubmit={onSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className={`w-full px-4 py-2 pl-10 pr-4 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  className={`w-4 h-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {showMobileMenu && (
          <div className="md:hidden pb-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto space-x-4 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
