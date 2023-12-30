import React, { useState, useEffect } from "react";
import "./typing.css"; // Import the CSS file for styling

const TypingText = () => {
  const textToType = "elcome to a website that connects to Metamask!";
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setTypedText("");
        setCurrentIndex(0);
      }
    }, 100); // Adjust the delay (in milliseconds) between each character

    return () => clearTimeout(timer);
  }, [currentIndex, typedText]);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">My App</div>
        <h2>W{typedText}</h2>
        <div className="typing-text">
      </div>
      </nav>
      
    </div>
  );
};

export default TypingText;
