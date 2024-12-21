import React, { createContext, useState } from "react";
import run from "../gemini";
export const datacontext = createContext();

const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText =
      text.split("**") &&
      text.split("*") &&
      text.split("** **") &&
      text.replace("google", "Vipin Chauhan") &&
      text.replace("Google", "Vipin Chauhan");
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening Youtube");
      setPrompt("Opening Youtube...");
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.co.in/", "_blank");
      speak("opening Google");
      setPrompt("Opening Google...");
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("opening Instagram");
      setPrompt("Opening Instagram...");
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open facebook")) {
      speak("opening facebook...");
      window.open("https://facebook.com/", "_blank");
    } else if (command.includes("open instagram")) {
      speak("opening instagram...");
      window.open("https://instagram.com/", "_blank");
    } else if (command.includes("open calculator")) {
      speak("opening calculator..");
      window.open("calculator://");
    } else if (command.includes("open whatsapp")) {
      speak("opening whatsapp..");
      window.open("whatsapp://");
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setPrompt(time);
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setPrompt(date);
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
};

export default UserContext;
