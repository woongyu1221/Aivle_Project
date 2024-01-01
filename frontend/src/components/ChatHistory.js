import React, { useState, useEffect, useContext } from 'react';
import './ChatHistory.css';
import AuthContext from "../context/AuthContext";

const ChatHistory = ({ onSessionSelect,onCreateNewChat }) => {
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/chatbot/api/chat-sessions/?user_no=${user.user_no}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  useEffect(() => {
    if (user && user.user_no) {
      fetchSessions();
    }
  }, [user]);

  const handleSessionClick = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/chatbot/api/chat-sessions/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch session data');
      }
      const data = await response.json();

      if (onSessionSelect) {
        onSessionSelect(data.id, data.chat_content,data.session_title);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };
  const handleDeleteSession = async (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/chatbot/api/chat-sessions/${sessionId}/`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete session');
        }
        fetchSessions();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };
  const handleCreateNewChat = () => {
    onCreateNewChat();
  };
  

  return (
    <div className="session-list">
      <div className="session-items-container">
        {sessions.map(session => (
          <div key={session.id} className="session-item">
            <button key={session.id} onClick={() => handleSessionClick(session.id)} className="session-button">
              {session.session_title}
            </button>
            <button onClick={() => handleDeleteSession(session.id)} className="delete-session" >
              <img src={'/delete_icon.png'} alt="Delete" className="delete-icon"/>
            </button>
          </div>
        ))}
      </div>
      <button className="create-new-chat-button" onClick={handleCreateNewChat}>
        <img src={'/plus_icon.png'} alt="Plus" className="plus-icon"/>
      </button>
    </div>
  );
};
export default ChatHistory;