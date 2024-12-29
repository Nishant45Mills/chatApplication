import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { secureGet } from "../../HttpService/APIService";
import { useDebounce } from "use-debounce";
import { TailSpin } from "react-loader-spinner";

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth0();
  const [chat, setChat] = useState([]);
  const [user1, setUser1] = useState([]);
  const [loggedInId, setLoggedInId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [value] = useDebounce(searchUser, 800);

  const navigate = useNavigate();

  const fetchChats = () => {
    let normalUrl = "";
    if (searchUser) {
      normalUrl = `/user?search=${searchUser}`;
    } else {
      normalUrl = `/chat`;
    }
    secureGet(`${normalUrl}`)
      .then((res) => {
        console.log(res);
        setChat(res.data.chats);
        setUser1(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoggedInId(JSON.parse(localStorage.getItem("user"))._id);
    fetchChats();
  }, [value]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* <NavLink
        onClick={logOut}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        logout
      </NavLink> */}
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
                    />
                  </div>
                </form>
                {/* {searchUser ? (
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
                ) : (
                  <></>
                )} */}

                {chat
                  ? chat.map((data, i) => {
                      const isGroupChat = data.isGroupChat;

                      // Determine the display name
                      const displayName =
                        !isGroupChat && data.users[0]._id === loggedInId
                          ? data.users[1].username
                          : data.chatName;

                      return (
                        <div
                          className="flex flex-col space-y-1 mt-4 -mx-2"
                          key={i}
                        >
                          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                              H
                            </div>
                            <div className="ml-2 text-sm font-semibold">
                              {displayName}
                            </div>
                          </button>
                        </div>
                      );
                    })
                  : user1.map((data, i) => {
                      return (
                        <div
                          className="flex flex-col space-y-1 mt-4 -mx-2"
                          key={i}
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
                    })}

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
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>Hey How are you today?</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
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
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>I'm ok what about you?</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
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
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>Lorem ipsum dolor sit amet !</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing. ?
                            </div>
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              Seen
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
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
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
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
    </>
  );
}

export default Dashboard;
