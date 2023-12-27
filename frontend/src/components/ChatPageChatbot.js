import React, { useState, useEffect, useRef } from 'react';
import './ChatPageChatbot.css';

let sessionCounter = parseInt(localStorage.getItem('sessionCounter')) || 1;

function generateSessionId() {
  const sessionId = sessionCounter.toString();
  sessionCounter++; // 다음 세션을 위해 카운터 증가
  localStorage.setItem('sessionCounter', sessionCounter.toString());
  return sessionId;
}

const ChatPageChatbot = ({ chatContent }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatMessagesRef = useRef(null);

  const saveChatSession = async () => {
    const chatContent = messages.map((m) => m.text).join('\n');
    const response = await fetch('http://127.0.0.1:8000/chatbot/api/chat-sessions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        chat_content: chatContent,
      }),
    });

    if (!response.ok) {
      console.error('Error saving chat session');
    }
  };

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      saveChatSession();
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [messages, sessionId]);


  useEffect(() => {
    // This effect is for updating the chat messages when chatContent changes
    if (chatContent) {
      const newMessages = chatContent.split('\n').map(text => ({
        text,
        sender: 'user'
      }));
      setMessages(newMessages);
    }
  }, [chatContent]);

  const handleMouseEnter = () => {
    chatMessagesRef.current.addEventListener('wheel', handleScroll);
  };

  const handleMouseLeave = () => {
    chatMessagesRef.current.removeEventListener('wheel', handleScroll);
  };

  const handleScroll = (event) => {
    event.preventDefault();
    chatMessagesRef.current.scrollTop += event.deltaY;
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      if (isSubmitting) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const userMessage = { text: input, sender: 'user' };
    setMessages((currentMessages) => [...currentMessages, userMessage]);

    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:8000/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, session_id: sessionId }),
      });

      const data = await response.json();
      setMessages((currentMessages) => [...currentMessages, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message to the chatbot API:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 초기 세션 ID 생성
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  }, []);

  return (
      <div className="chatbot-container">
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <textarea
            className="chat-input"
            value={input}
            onChange={handleInputChange}
            placeholder="질문을 입력하세요"
            onKeyDown={handleKeyDown}
          />
          <button className="chat-submit" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
  );
};

export default ChatPageChatbot;