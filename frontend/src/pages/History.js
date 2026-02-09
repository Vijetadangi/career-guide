import { useEffect, useState } from "react";
import "./History.css";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://career-guide-backend-tdg.onrender.com/api/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setHistoryData(Array.isArray(data) ? data : []))
      .catch(() => setHistoryData([]));
  }, [token]);

  const deleteItem = async (id) => {
    await fetch(
      `https://career-guide-backend-tdg.onrender.com/api/history/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setHistoryData(prev => prev.filter(item => item._id !== id));
  };

  const clearAll = async () => {
    await fetch("https://career-guide-backend-tdg.onrender.com/api/history", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistoryData([]);
  };

  return (
    <div className="history-page">
      <h1>Career Prediction History</h1>

      {historyData.length > 0 && (
        <button onClick={clearAll}>Clear All</button>
      )}

      {historyData.length === 0 && <p>No history found yet.</p>}

      {historyData.map(item => (
        <div key={item._id} className="history-card">
          <h3>{item.role}</h3>
          <p>Confidence: {item.confidence}%</p>
          <small>{new Date(item.createdAt).toLocaleDateString()}</small>
          <button onClick={() => deleteItem(item._id)}>🗑</button>
        </div>
      ))}
    </div>
  );
};

export default History;
