import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Profile = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInformation } = useSelector((state) => state.auth);
  const [profile, { isLoading }] = useProfileMutation();
  const disptach = useDispatch();

  useEffect(() => {
    setName(userInformation.user.userName);
    setEmail(userInformation.user.email);
  }, [userInformation.user.userName, userInformation.user.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not Mactch");
    } else {
      try {
        const res = await profile({ userName, email, password }).unwrap();
        disptach(setInfo({ ...res }));
        toast.success("Profile Updated Successfully!");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="flex justify-center h-[100vh] items-center">
      <div className="container  w-[600px] h-[600px]">
        <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
        <form className="w-[36rem]" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={userName}
              className="mt-1 p-3  rounded w-full font-semibold focus:outline-none bg-gray-600   text-white"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="Emial" className="mb-1">
              Email
            </label>
            <input
              id="Email"
              type="email"
              value={email}
              className="mt-1 p-3  rounded w-full font-semibold focus:outline-none bg-gray-600   text-white"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="Password" className="mb-1">
              Password
            </label>
            <input
              id="Password"
              type="password"
              value={password}
              className="mt-1 p-3  rounded w-full font-semibold focus:outline-none bg-gray-600   text-white"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="Confirm Password" className="mb-1">
              Confirm Password
            </label>
            <input
              id="Confirm Password"
              type="password"
              value={confirmPassword}
              className="mt-1 p-3   rounded w-full font-semibold focus:outline-none bg-gray-600   text-white"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:scale-105"
            >
              Update
            </button>
            <Link
              to="/user-orders"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:scale-105"
            >
              My Orderse
            </Link>
          </div>
          {isLoading ? <Loader /> : <></>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
