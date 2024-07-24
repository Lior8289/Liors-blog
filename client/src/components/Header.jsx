import React, { useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  Navbar,
  TextInput,
  Modal,
  Button as FlowbiteButton,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Lior's
          </span>
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <FlowbiteButton
          className="w-12 h-10 lg:hidden"
          color="gray"
          pill
          onClick={() => navigate("/search")}
        >
          <AiOutlineSearch />
        </FlowbiteButton>
        <div className="flex gap-2 md:order-2">
          <FlowbiteButton
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </FlowbiteButton>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem>Dashboard</DropdownItem>
              </Link>
              <Dropdown.Divider />
              <DropdownItem onClick={() => setShowLogoutModal(true)}>
                Sign Out
              </DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <FlowbiteButton gradientDuoTone="purpleToBlue" outline>
                Sign In
              </FlowbiteButton>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
          <Navbar.Link
            as={"div"}
            className="sm:hidden"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        popup
        size="md"
      >
        <Modal.Body className="dark:bg-slate-700">
          <div className="text-center">
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 mt-5">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <FlowbiteButton
                color="failure"
                onClick={() => {
                  setShowLogoutModal(false);
                  handleSignout();
                }}
              >
                Yes, I'm sure
              </FlowbiteButton>
              <FlowbiteButton
                color="gray"
                onClick={() => setShowLogoutModal(false)}
              >
                No, cancel
              </FlowbiteButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
