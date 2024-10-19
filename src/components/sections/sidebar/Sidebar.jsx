import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-12 w-72 items-center">
      <h1 className="font-bold mt-12 font-bellota text-2xl">FlashCards</h1>
      <div className="flex flex-col gap-4 w-full">
        <a href="" className="flex justify-center bg-orange-300 p-4 text-white rounded-l-md ml-8">
          <div className="flex gap-4">
            <span class="material-symbols-outlined">description</span>
            <p className="font-bellota">Cards</p>
          </div>
        </a>
        {/* <a href="" className="flex justify-center bg-orange-300 p-4 text-white rounded-l-md ml-8">
          <div className="flex gap-4">
            <span class="material-symbols-outlined">face</span>
            <p className="font-bellota">Perfil</p>
          </div>
        </a> */}
      </div>
    </div>
  );
};

export default Sidebar;
