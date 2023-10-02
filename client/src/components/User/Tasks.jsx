import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    async function fetchCompletedTasks() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/app/completedTasks`,
          {},
          { withCredentials: true }
        );

        setCompletedTasks(response.data);
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    }
    fetchCompletedTasks();
  }, []);

  return (
    <div className="section">
      {completedTasks.length === 0 ? (
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h2 className="title">No completed tasks to display</h2>
            </div>
          </div>
        </div>
      ) : (
        completedTasks.map((task) => (
          <div key={task.id} className="card">
            <div className="card-content">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <figure className="image is-96x96">
                      <img src={task.imageURL} alt={task.name} />
                    </figure>
                  </div>
                  <div className="level-item">
                    <div className="is-flex is-flex-direction-column">
                      <h1 className="title is-4">{task.name}</h1>
                    </div>
                  </div>
                </div>

                <div className="level-right">
                  <div className="content level-item">
                    <button onClick={(e) => e.preventDefault()} className="button is-primary">
                      {`Points Awarded: ${task.points}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
