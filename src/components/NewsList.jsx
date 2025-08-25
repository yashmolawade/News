import React from "react";

const NewsList = ({
  news,
  loading,
  error,
  darkMode,
  bookmarks,
  toggleBookmark,
  loadMore,
  hasMore,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && news.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center py-12 ${
          darkMode ? "text-red-400" : "text-red-600"
        }`}
      >
        <svg
          className="mx-auto h-12 w-12 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">Error Loading News</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (news.length === 0 && !loading) {
    return (
      <div
        className={`text-center py-12 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <svg
          className="mx-auto h-12 w-12 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">No News Found</h3>
        <p className="text-sm">
          Try adjusting your search criteria or browse different categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => {
          const isBookmarked = bookmarks.some(
            (bookmark) => bookmark.url === article.url
          );

          return (
            <article
              key={`${article.url}-${index}`}
              className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    article.urlToImage ? "hidden" : "flex"
                  } ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                >
                  <svg
                    className={`w-12 h-12 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <button
                  onClick={() => toggleBookmark(article)}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                    isBookmarked
                      ? "bg-red-500 text-white"
                      : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                  title={
                    isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill={isBookmarked ? "currentColor" : "none"}
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
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {article.source?.name || "Unknown Source"}
                  </span>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {formatDate(article.publishedAt)}
                  </span>
                </div>

                <h3
                  className={`text-lg font-semibold mb-2 line-clamp-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {article.title}
                </h3>

                <p
                  className={`text-sm mb-4 line-clamp-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {article.description || "No description available."}
                </p>

                {article.author && (
                  <p
                    className={`text-xs mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    By {article.author}
                  </p>
                )}

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : darkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              "Load More News"
            )}
          </button>
        </div>
      )}

      {loading && news.length > 0 && (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default NewsList;
