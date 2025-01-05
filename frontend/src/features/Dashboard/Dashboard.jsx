import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { post, secureGet, securePost } from "../../HttpService/APIService";
import { useDebounce } from "use-debounce";
import { TailSpin } from "react-loader-spinner";
import RohitImage from "../../../public/Rohit.png";
import { toast } from "react-toastify";
import Modal from "../../components/common/Modal";

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth0();
  const [chat, setChat] = useState([]);
  const [user1, setUser1] = useState([]);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [loggedInId, setLoggedInId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [value] = useDebounce(searchUser, 800);
  const [selectName, setSelectName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  //fetching chats API call
  const fetchChats = () => {
    secureGet(`/chat`)
      .then((res) => {
        res.data.chats[0].isSelected = true;
        setChat(res.data.chats);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetching user API call
  const fetchUserByName = () => {
    secureGet(`/user?search=${searchUser}`)
      .then((res) => {
        setUser1(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //creating new chat
  const createChat = (userId) => {
    console.log(userId);
    post(`/chat`, { userId })
      .then((result) => {
        console.log(result);
        inputRef.current.value = "";
        setSearchUser("");
        fetchChats();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectChat = (index) => {
    console.log(index);
    chat[index].isSelected = true;
    setChat(chat);
  };

  const handleDecline = ()=>{
    setIsModalOpen(false);
  }

  //fetching chats
  useEffect(() => {
    setLoggedInId(JSON.parse(localStorage.getItem("user"))._id);
    fetchChats();
  }, []);

  //fetching users
  useEffect(() => {
    fetchUserByName();
  }, [value]);

  //Toggling chat list dropdownMenu
  // useEffect(() => {
  //   document.addEventListener("mousedown", (event) => {
  //     if (!dropdownRef.current.contains(event.target)) {
  //       setDropdownStatus(false);
  //     }
  //   });
  // }, []);

  //Logout current user
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("User logout successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="flex w-screen h-screen bg-sky-300 content-center items-center">
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
              </div>
              <div className="flex flex-col mt-8">
                <form className="max-w-md mx-auto">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                      className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search user"
                      required
                      onKeyUp={(event) => setSearchUser(event.target.value)}
                      ref={inputRef}
                    />
                  </div>
                </form>

                <div className="flex justify-between items-center my-2 px-2 relative">
                  <p className="text-3xl">Chats</p>

                  <button
                    onClick={() => setDropdownStatus(!dropdownStatus)}
                    id="dropdownMenuIconButton"
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                    type="button"
                    ref={dropdownRef}
                  >
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 4 15"
                    >
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>

                  <div
                    id="dropdownDots"
                    onClick={() => setDropdownStatus(false)}
                    className={`${
                      !dropdownStatus ? "hidden" : ""
                    } absolute z-10 top-10 right-2  bg-white divide-y divide-gray-100 rounded-lg fixed shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                  >
                    <ul
                      className="py-2 cursor-pointer text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <a
                          onClick={() => setIsModalOpen(true)}
                          className="block text-gray-600 hover:text-gray-600 text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          New group
                        </a>
                      </li>
                      <li>
                        <a className="block text-gray-600 hover:text-gray-600 text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Starred messages
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={logOut}
                          className="block text-gray-600 hover:text-gray-600 text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Log out
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>
                {searchUser !== value ? (
                  <div className="mx-auto mt-5">
                    <TailSpin
                      visible={true}
                      height="40"
                      width="40"
                      color="#4fa94d"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : searchUser == "" ? (
                  chat.map((data, i) => {
                    const isGroupChat = data.isGroupChat;
                    const displayName =
                    !isGroupChat && data.users[0]._id === loggedInId
                    ? data.users[1].username
                        : data.chatName;
                        
                        return (
                          <div
                          className={`flex flex-col space-y-1 mt-4 -mx-2`}
                          key={i}
                          >
                        <button
                          className={`${
                            selectName == data
                            ? "bg-indigo-100 focus:outline-none hover:bg-indigo-100"
                            : ""
                          } ${
                            selectName == null
                            ? data.isSelected == true
                                ? "bg-indigo-100 focus:outline-none hover:bg-indigo-100"
                                : ""
                                : ""
                              } focus:outline-none hover:border-transparent hover:bg-gray-200 flex flex-row items-center rounded-xl p-2 `}
                          onClick={() => setSelectName(data)}
                        >
                          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            H
                          </div>
                          <div className="ml-2 text-sm font-semibold">
                            {displayName}
                          </div>
                        </button>
                        {/* <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button> */}
                      </div>
                    );
                  })
                ) : (
                  user1.map((data, i) => {
                    return (
                      <div
                      className="flex flex-col space-y-1 mt-4 -mx-2"
                      key={i}
                      onClick={() => createChat(data._id)}
                      >
                        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            H
                          </div>
                          <div className="ml-2 text-sm font-semibold">
                            {data.username}
                          </div>
                        </button>
                      </div>
                    );
                  })
                )}
                <div className="flex flex-row items-center justify-between text-xs mt-6">
                  <span className="font-bold">Archivied</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    7
                  </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2">
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      H
                    </div>
                    <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 ">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="p-3 rounded-lg w-full bg-gray-300 flex justify-between sticky top-0">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="data:image/jpeg;base64,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"
                          alt=""
                        />
                        <div className="font-medium dark:text-white text-start">
                          <div>
                            {selectName == null
                              ? chat[0]?.users[1]?.username
                              : selectName.users[1]?.username}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Joined in August 2014
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 text-2xl items-center me-5">
                        <div className="cursor-pointer">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="cursor-pointer">
                          <i className="fa-regular fa-heart"></i>
                        </div>
                        <div className="cursor-pointer">
                          <i className="fa-regular fa-bell"></i>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-y-2 mt-20">
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>Hey How are you today?</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Vel ipsa commodi illum saepe
                              numquam maxime asperiores voluptate sit, minima
                              perspiciatis.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>I'm ok what about you?</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing. ?
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>Lorem ipsum dolor sit amet !</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing. ?
                            </div>
                            {/* <div className="text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              Seen
                              </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Perspiciatis, in.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className=" ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div className="flex flex-row items-center">
                              <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                  ></path>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                              </button>
                              <div className="flex flex-row items-center space-x-px ml-4">
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-12 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-6 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-5 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-3 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                                <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onDecline={handleDecline} />
    </>
  );
}

export default Dashboard;
