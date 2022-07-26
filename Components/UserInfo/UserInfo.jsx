import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfo = () => {
  const { state, dispatch, getUserInfo } = useContext(AuthContext);

  const { lastname, firstname, username, email } = state.user;

  const [inputValues, setInputValues] = useState({
    newUserName: username,
    newFirstname: firstname,
    newLastname: lastname,
    newEmail: email,
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputchange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const [showInputUserName, setShowInputUserName] = useState(false);
  const [showFirstname, setShowFirstname] = useState(false);
  const [showLastname, setShowLastname] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showUserName = (e) => {
    e.preventDefault();
    setShowInputUserName(!showInputUserName);
  };
  const showFirst = (e) => {
    e.preventDefault();
    setShowFirstname(!showFirstname);
  };
  const showLast = (e) => {
    e.preventDefault();
    setShowLastname(!showLastname);
  };
  const showMail = (e) => {
    e.preventDefault();
    setShowEmail(!showEmail);
  };
  const showPass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const CloseAllTab = () => {
    setShowInputUserName(false);
    setShowFirstname(false);
    setShowLastname(false);
    setShowEmail(false);
    setShowPassword(false);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    await Axios.request({
      url: "http://localhost:3001/api/user/update",
      method: "put",
      data: {
        username: inputValues.newUserName,
        firstname: inputValues.newFirstname,
        lastname: inputValues.newLastname,
        email: inputValues.newEmail,
        password: inputValues.newPassword,
        passwordConfirm: inputValues.confirmPassword,
      },
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
      },
    })
      .then((response) => {
        toast.success("Profile mis à jour", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        getUserInfo();
        CloseAllTab();
      })
      .catch((error) => {
        toast.error(error.response.data.slice(1, 50), {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        console.error(error.response);
      });
  };

  return (
    <div className="w-full m-auto rounded-lg bg-[#B9D9EB] h-auto p-5 text-justify text-lg">
      <ul>
        <div>
          <li className=" text-left p-2 bg-white my-[10px] rounded-lg duration-300 ease-in-out hover:bg-[#62b3b4] hover:text-white ">
            <div className=" inline-block min-w-[85px]">
              <span className=" text-lg font-semibold">Username</span>
            </div>
            : {username}
            <i
              className="fa fa-edit mx-[10px] float-right cursor-pointer"
              onClick={(e) => showUserName(e)}
            >
              UPDATE
            </i>
          </li>
          <div
            className={`duration-300 ease-in-out ${
              showInputUserName === true ? "show" : "hidden"
            }`}
          >
            <form className="flex flex-wrap justify-between h-8">
              <input
                className=" h-7 rounded-md pl-1 focus:outline-none"
                placeholder="New username"
                type="text"
                name="newUserName"
                value={inputValues.newUserName}
                onChange={(e) => onInputchange(e)}
              />
              <div className=" h-7">
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold border border-[#E52B50] bg-white text-[#E52B50]"
                  onClick={(e) => showUserName(e)}
                >
                  X
                </button>
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold  bg-[#32de84] text-white"
                  onClick={(e) => handleUpdateUser(e)}
                >
                  V
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <li className=" text-left p-2 bg-white my-[10px] rounded-lg duration-300 ease-in-out hover:bg-[#62b3b4] hover:text-white ">
            <div className=" inline-block min-w-[85px]">
              <span className=" text-lg font-semibold">Firstname</span>
            </div>
            : {firstname}
            <i
              className="fa fa-edit mx-[10px] float-right cursor-pointer"
              onClick={(e) => showFirst(e)}
            >
              UPDATE
            </i>
          </li>
          <div
            className={`duration-300 ease-in-out ${
              showFirstname === true ? "show" : "hidden"
            }`}
          >
            <form className="flex flex-wrap justify-between h-8">
              <input
                className=" h-7 rounded-md pl-1 focus:outline-none"
                placeholder="New firstname"
                type="text"
                name="newFirstname"
                value={inputValues.newFirstname}
                onChange={(e) => onInputchange(e)}
              />
              <div className=" h-7">
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold border border-[#E52B50] bg-white text-[#E52B50]"
                  onClick={(e) => showFirst(e)}
                >
                  X
                </button>
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold  bg-[#32de84] text-white"
                  onClick={(e) => handleUpdateUser(e)}
                >
                  V
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <li className=" text-left p-2 bg-white my-[10px] rounded-lg duration-300 ease-in-out hover:bg-[#62b3b4] hover:text-white ">
            <div className=" inline-block min-w-[85px]">
              <span className=" text-lg font-semibold">Lastname</span>
            </div>
            : {lastname}
            <i
              className="fa fa-edit mx-[10px] float-right cursor-pointer"
              onClick={(e) => showLast(e)}
            >
              UPDATE
            </i>
          </li>
          <div
            className={`duration-300 ease-in-out ${
              showLastname === true ? "show" : "hidden"
            }`}
          >
            <form className="flex flex-wrap justify-between h-8">
              <input
                className=" h-7 rounded-md pl-1 focus:outline-none"
                placeholder="New lastname"
                type="text"
                name="newLastname"
                value={inputValues.newLastname}
                onChange={(e) => onInputchange(e)}
              />
              <div className=" h-7">
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold border border-[#E52B50] bg-white text-[#E52B50]"
                  onClick={(e) => showLast(e)}
                >
                  X
                </button>
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold  bg-[#32de84] text-white"
                  onClick={(e) => handleUpdateUser(e)}
                >
                  V
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <li className=" text-left p-2 bg-white my-[10px] rounded-lg duration-300 ease-in-out hover:bg-[#62b3b4] hover:text-white ">
            <div className=" inline-block min-w-[85px]">
              <span className=" text-lg font-semibold">Email</span>
            </div>
            : {email}
            <i
              className="fa fa-edit mx-[10px] float-right cursor-pointer"
              onClick={(e) => showMail(e)}
            >
              UPDATE
            </i>
          </li>
          <div
            className={`duration-300 ease-in-out ${
              showEmail === true ? "show" : "hidden"
            }`}
          >
            <form className="flex flex-wrap justify-between h-8">
              <input
                className=" h-7 rounded-md pl-1 focus:outline-none"
                placeholder="New email"
                type="text"
                name="newEmail"
                value={inputValues.newEmail}
                onChange={(e) => onInputchange(e)}
              />
              <div className=" h-7">
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold border border-[#E52B50] bg-white text-[#E52B50]"
                  onClick={(e) => showMail(e)}
                >
                  X
                </button>
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold  bg-[#32de84] text-white"
                  onClick={(e) => handleUpdateUser(e)}
                >
                  V
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <li className=" text-left p-2 bg-white my-[10px] rounded-lg duration-300 ease-in-out hover:bg-[#62b3b4] hover:text-white ">
            <div className=" inline-block min-w-[85px]">
              <span className=" text-lg font-semibold">Password</span>
            </div>
            : • • • • • •
            <i
              className="fa fa-edit mx-[10px] float-right cursor-pointer"
              onClick={(e) => showPass(e)}
            >
              UPDATE
            </i>
          </li>
          <div
            className={`duration-300 ease-in-out ${
              showPassword === true ? "show" : "hidden"
            }`}
          >
            <form className="flex flex-wrap justify-between h-8">
              <div className=" space-x-5">
                <input
                  className=" h-7 rounded-md pl-1 focus:outline-none"
                  placeholder="New password"
                  type="password"
                  name="newPassword"
                  value={inputValues.newPassword}
                  onChange={(e) => onInputchange(e)}
                />
                <input
                  className=" h-7 rounded-md pl-1 focus:outline-none"
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={inputValues.confirmPassword}
                  onChange={(e) => onInputchange(e)}
                />
              </div>
              <div className=" h-7">
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold border border-[#E52B50] bg-white text-[#E52B50]"
                  onClick={(e) => showPass(e)}
                >
                  X
                </button>
                <button
                  className="mx-[5px] w-[26px] h-[26px] rounded-full text-xs font-bold  bg-[#32de84] text-white"
                  onClick={(e) => handleUpdateUser(e)}
                >
                  V
                </button>
              </div>
            </form>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default UserInfo;
