import React from "react";
import {TypeAnimation} from "react-type-animation";

function OpenForWork({gameMode}: {gameMode: boolean}) {
  return (
    <div className='flex items-center space-x-0 font-thin'>
      <div id='ping-dot' className='mr-4' />
      <h2>{gameMode ? "OPEN FOR" : "OPEN FOR"}</h2>
      {gameMode && (
        <TypeAnimation
          sequence={["GAME", 3000, "MATCH", 3000, "RANKED", 3000]}
          wrapper='span'
          speed={50}
          style={{display: "inline-block", marginLeft: "0.3rem"}}
          repeat={Infinity}
        />
      )}
      {!gameMode && (
        <TypeAnimation
          sequence={["WORK", 3000, "OPPORTUNITIES", 3000, "HIRING", 3000]}
          wrapper='span'
          speed={50}
          style={{display: "inline-block", marginLeft: "0.3rem"}}
          repeat={Infinity}
        />
      )}
    </div>
  );
}
export default OpenForWork;
