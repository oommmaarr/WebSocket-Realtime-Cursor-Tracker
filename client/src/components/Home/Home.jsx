import React from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "../cursor/Cursor";
import '../../App.css';

const renderCursors = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];
    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const renderUsersList = (users) => {
  const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
  
  return (
    <div className="users-panel">
      <div className="users-header">
        <h3>🌐 المستخدمين النشطين</h3>
        <span className="users-count">{Object.keys(users).length}</span>
      </div>
      <div className="users-list">
        {Object.keys(users).map((uuid, index) => {
          const user = users[uuid];
          const color = colors[index % colors.length];
          return (
            <div key={uuid} className="user-card">
              <div className="user-avatar" style={{background: color}}>
                {user.username?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="user-info">
                <div className="user-name">{user.username || 'مجهول'}</div>
                <div className="user-position">
                  x: {Math.round(user.state.x)} | y: {Math.round(user.state.y)}
                </div>
              </div>
              <div className="user-status"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Home({ username }) {
  const wsUrl = "ws://127.0.0.1:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsUrl, {
    queryParams: { username },
  });
  const [isConnected, setIsConnected] = useState(false);
  
  const THROTTLE = 50;
  const sendJsonMessageTHROTTLED = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    
    setIsConnected(true);

    const handleMouseMove = (e) => {
      sendJsonMessageTHROTTLED.current({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (sendJsonMessageTHROTTLED.current.cancel) {
        sendJsonMessageTHROTTLED.current.cancel();
      }
    };
  }, [sendJsonMessage]);

  if (lastJsonMessage) {
    return (
      <div className="home-container">
        <div className="welcome-banner">
          <h1 className="welcome-title">
          👋  مرحباً <span className="username-highlight">{username}</span> 
          </h1>
          <p className="welcome-subtitle">حرك الماوس لتظهر حركتك للآخرين</p>
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? 'connected' : ''}`}></span>
            <span className="status-text">متصل بالخادم</span>
          </div>
        </div>
        
        <div className="cursors-area">
          {renderCursors(lastJsonMessage)}
        </div>
        
        {renderUsersList(lastJsonMessage)}
      </div>
    );
  }
  
  return (
    <div className="home-container loading">
      <div className="loading-card">
        <div className="loader"></div>
        <h2>مرحباً {username}</h2>
        <p>جاري الاتصال بالخادم</p>
      </div>
    </div>
  );
}