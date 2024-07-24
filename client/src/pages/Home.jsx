import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts?limit = 6");
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl fond-bold lg:text-6xl text-center">
          Welcome to my Blog
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 text-center">
          Here you'll find a veraity of articles and news on topics such as
          Food, Music, Sports and lot more.
        </p>
        <Link
          to="/search"
          className=" text-center text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="max-w-5xl mx-auto w-full p-3 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="max-w-5xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 ">
            <h2 className="text-2xl font-semibold text-center ">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <div className="w-full sm:w-auto">
                  <PostCard key={post._id} post={post} />
                </div>
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
