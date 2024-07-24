import { Button, Select, Sidebar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "all", // Changed default category to "all"
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
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl || "all", // Set category to "all" if categoryFromUrl is null
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
    setShowMore(data.posts.length === 9);
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
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sideBarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sideBarData.category}
              id="category"
            >
              <option value="all">All</option>
              <option value="Sport">Sport</option>
              <option value="Food">Food</option>
              <option value="Music">Music</option>
              <option value="General">General</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply filters
          </Button>
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
