import { useState } from "react";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm JobTrack AI. How can I help with your career today?",
    },
  ]);

  function getAIResponse(text) {
    const question = text.toLowerCase();

    if (question.includes("java") || question.includes("spring")) {
      return "For a Java Full Stack career, focus on Java, Spring Boot, REST APIs, MySQL, React, Git and problem solving. 🚀";
    }

    if (question.includes("resume") || question.includes("cv")) {
      return "Keep your resume focused on your skills, projects, education and achievements. As a fresher, strong projects can make your resume stand out.";
    }

    if (question.includes("interview")) {
      return "For interviews, practice Java, OOP, collections, SQL, Spring Boot, REST APIs and common HR questions. 💪";
    }

    if (question.includes("job") || question.includes("career")) {
      return "JobTrack helps you discover jobs and track your applications. As a fresher, focus on entry-level roles that match your strongest skills.";
    }

    if (question.includes("react") || question.includes("frontend")) {
      return "For frontend development, focus on HTML, CSS, JavaScript, React, REST API integration and responsive design.";
    }

    if (
      question.includes("hello") ||
      question.includes("hi")
    ) {
      return "Hello! 👋 I'm ready to help you with jobs, resumes, interviews and career guidance.";
    }

    return "I'm here to help with jobs, Java, React, resumes, interviews and career guidance. Ask me something! 🤖";
  }

  function handleSend() {
    const text = message.trim();

    if (!text) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: text,
      },
    ]);

    setMessage("");

    setTimeout(() => {
      const reply = getAIResponse(text);

      setMessages((previous) => [
        ...previous,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    }, 500);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <>
      {open && (
        <div className="chatbot-window">

          <div className="chatbot-header">

            <div className="chatbot-title">

              <div className="chatbot-avatar">
                🤖
              </div>

              <div>
                <h3>JobTrack AI</h3>
                <span>Career Assistant</span>
              </div>

            </div>

            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

          </div>

          <div className="chatbot-messages">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${
                  item.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }`}
              >
                {item.text}
              </div>
            ))}

          </div>

          <div className="chatbot-input-area">

            <input
              type="text"
              placeholder="Ask JobTrack AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSend}>
              ➤
            </button>

          </div>

        </div>
      )}

      {!open && (
        <button
          className="chatbot-button"
          onClick={() => setOpen(true)}
          aria-label="Open JobTrack AI"
        >
          🤖
        </button>
      )}
    </>
  );
}

export default Chatbot;