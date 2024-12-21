import React, { useContext } from "react";
import "./App.css";
import AI from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speakImage from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

const App = () => {
  let {
    recognition,
    speaking,
    setSpeaking,
    setPrompt,
    prompt,
    response,
    setResponse,
  } = useContext(datacontext);

  return (
    <div className="main">
      <img src={AI} alt="" id="shifra" />
      <span>I'm Shifra,Your Advanced Virtual Assistant</span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("listening...");
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speakImage} alt="" id="speak" />
          ) : (
            <img src={aigif} alt="" id="aigif" />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;
