import React from "react";

function OpenForWork({gameMode}: {gameMode: boolean}) {
  return (
    <div className='flex items-center space-x-4 font-thin'>
      <div id='ping-dot' />
      <h2>{gameMode ? "OPEN FOR GAME" : "OPEN FOR WORK"}</h2>
    </div>
  );
}
export default OpenForWork;
