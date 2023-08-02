import React from "react";
import VideoList from "../components/VideoListComponent";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div>
      <VideoList />
    </>
  );
};

export default AdminDashboardPage;
