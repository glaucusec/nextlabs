import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Points() {
  const [points, setPoints] = useState(0);
  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/app/points`,
          {},
          { withCredentials: true }
        );

        if (response.status == 200) {
          setPoints(response.data.totalPoints);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    fetchPoints();
  }, []);

  return (
    <div className="section">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h2 className="title">Your Total Points: {points}</h2>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
