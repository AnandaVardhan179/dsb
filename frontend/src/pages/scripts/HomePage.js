import React, { useState } from "react";
import "../styles/HomePage.css";
import axios from "axios"; // Import Axios

function HomePage() {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [prompt, setPrompt] = useState(""); // Stores current input prompt

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (prompt.trim() === "") return; // Don't send empty messages

    // Add user message to chat
    const userMessage = { sender: "user", text: prompt };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send prompt to the backend chat API
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt,
      });

      // Add NLP response to chat
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching NLP response:", error);
      const botMessage = {
        sender: "bot",
        text: "Sorry, something went wrong.",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    // Clear the input field
    setPrompt("");
  };

  // Handles Enter key submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container-fluid home-container text-center text-white py-5">
      {/* Header Section */}
      <div className="row justify-content-between align-items-center mb-4">
        <div className="col-md-6 d-flex align-items-center">
          <h1 className="mb-0">Welcome, Anand</h1>
        </div>
      </div>

      <p className="lead">Hello User, How can I assist you today?</p>

      {/* Chat Messages Display */}
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.sender === "bot" ? (
              <p className="bot-free-text">{msg.text}</p>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="input-container d-flex justify-content-center mt-3">
        <input
          type="text"
          className="form-control prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Prompt Here"
        />
        <button
          className="btn btn-light attach-button"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default HomePage;
