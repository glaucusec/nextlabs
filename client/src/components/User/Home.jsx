import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
export default function Home() {
  const context = useOutletContext();
  const tasks = context.tasks;
  return (
    <div className="section">
      {tasks.length <= 0 ? (
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h2 className="title">Empty Tasks</h2>
            </div>
          </div>
        </div>
      ) : (
        tasks.map((task) => {
          return (
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
                        <Link to={`${task.id}`}>View in Detail</Link>
                      </div>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="content level-item">
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="button is-primary"
                      >
                        {task.points}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
