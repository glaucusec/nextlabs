import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Points() {
  const [points, setPoints] = useState(0);
  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/app/points",
          {},
          { withCredentials: true }
        );

        if (response.status == 200) {
          setPoints(response.data.totalPoints);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPoints();
  }, []);

  return (
    <div className="section">
      <h2 className="title">Your Total Points: {points}</h2>
    </div>
  );
}
