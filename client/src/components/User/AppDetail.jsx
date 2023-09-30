import React, { useState } from "react";
import axios from "axios";
import { useOutletContext, useParams, Link, Navigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AppDetail() {
  const params = useParams();
  const outlet = useOutletContext();

  const id = params.id;
  const tasks = outlet.tasks;
  const task = tasks.find((task) => task.id == id);

  const [selectedFileName, setSelectedFileName] =
    useState("Upload Screenshot…");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileChangeHandler = (file) => {
    setSelectedFileName(file.name);
    setSelectedFile(file);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("TaskId", id);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/app/completeTask",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!task || task.length <= 0) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="section">
      <Link to={"/home"}>{"< Home"}</Link>

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
                  <a target="_blank" href={task.link}>
                    View Website
                  </a>
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
        <div className="card-content is-flex is-justify-content-center">
          <div class="card">
            {/* <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                  />
                </figure>
                
              </div> */}
            <div class="file is-large is-boxed has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  name="uploadedFile"
                  onChange={(e) => fileChangeHandler(e.target.files[0])}
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span class="file-label">{selectedFileName}</span>
                </span>
              </label>
            </div>
            <div className="is-flex is-justify-content-center">
              <button
                onClick={fileUploadHandler}
                className="button is-small is-light"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
