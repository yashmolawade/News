import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import Bookmarks from "./components/Bookmarks";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const API_KEY = "6052142caf56426592e98269d989eaee";
  const BASE_URL = "https://newsapi.org/v2";

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("newsBookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("newsBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const fetchNews = async (resetPage = true) => {
    setLoading(true);
    setError(null);

    try {
      let url = "";

      if (searchQuery) {
        url = `${BASE_URL}/everything?q=${encodeURIComponent(
          searchQuery
        )}&sortBy=${sortBy}&pageSize=20&page=${
          resetPage ? 1 : page
        }&apiKey=${API_KEY}`;
      } else {
        url = `${BASE_URL}/top-headlines?country=${selectedCountry}&category=${selectedCategory}&pageSize=20&page=${
          resetPage ? 1 : page
        }&apiKey=${API_KEY}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.message || "Failed to fetch news");
      }

      if (resetPage) {
        setNews(data.articles || []);
        setPage(1);
      } else {
        setNews((prev) => [...prev, ...(data.articles || [])]);
      }
    } catch (err) {
      setError(err.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(true);
  }, [selectedCategory, selectedCountry, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(true);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
    fetchNews(false);
  };

  const toggleBookmark = (article) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.url === article.url
    );

    if (isBookmarked) {
      setBookmarks((prev) =>
        prev.filter((bookmark) => bookmark.url !== article.url)
      );
    } else {
      setBookmarks((prev) => [...prev, article]);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleBookmarksView = () => {
    setShowBookmarks(!showBookmarks);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        sortBy={sortBy}
        setSortBy={setSortBy}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onSearch={handleSearch}
        bookmarksCount={bookmarks.length}
        onBookmarksClick={toggleBookmarksView}
      />

      <main className="container mx-auto px-4 py-8">
        {showBookmarks ? (
          <Bookmarks
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            darkMode={darkMode}
            onBackToNews={toggleBookmarksView}
          />
        ) : (
          <NewsList
            news={news}
            loading={loading}
            error={error}
            darkMode={darkMode}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            loadMore={loadMore}
            hasMore={news.length > 0 && news.length >= 20}
          />
        )}
      </main>
    </div>
  );
};

export default App;
