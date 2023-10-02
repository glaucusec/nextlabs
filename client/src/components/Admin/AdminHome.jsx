import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function AdminHome() {
  const authCtx = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/fetchTasks`,
          {},
          { withCredentials: true }
        );
        if (response.status == 200) {
          setTasks(response.data);
        }
      } catch (error) {
        alert(error.response.statusText);
      }
    }
    fetchDetails();
  }, []);
  return (
    <div className="section">
      {tasks.map((task) => {
        return (
          <>
            <div className="card">
              <div className="card-content">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <figure className="image is-96x96">
                        <img src={task.imageURL} />
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
                        {task.points}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </>
        );
      })}
    </div>
  );
}
