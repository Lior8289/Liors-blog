import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "all", // Default category set to "all"
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "all",
      });
    }
    fetchPosts();
  }, [location.search]);

  const fetchPosts = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
    setShowMore(data.posts.length === 10);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSideBarData({ ...sideBarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    if (sideBarData.category !== "all") {
      urlParams.set("category", sideBarData.category);
    }

    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sort);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Search Term */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="searchTerm" className="font-semibold">
              Search Term
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sideBarData.searchTerm}
              onChange={handleChange}
              className="col-span-2 w-full"
            />
          </div>

          {/* Sort */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="sort" className="font-semibold">
              Sort
            </label>
            <Select
              id="sort"
              value={sideBarData.sort}
              onChange={handleChange}
              className="col-span-2 w-full"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          {/* Category */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <Select
              id="category"
              value={sideBarData.category}
              onChange={handleChange}
              className="col-span-2 w-full"
            >
              <option value="all">All</option>
              <option value="Sport">Sport</option>
              <option value="Food">Food</option>
              <option value="Music">Music</option>
              <option value="General">General</option>
            </Select>
          </div>

          {/* Apply Filters Button */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <span></span>
            <Button
              type="submit"
              outline
              gradientDuoTone="purpleToPink"
              className="col-span-2"
            >
              Apply filters
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              className="text-teal-500 text-lg hover:underline"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
