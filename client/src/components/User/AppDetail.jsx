import React, { useState } from "react";
import axios from "axios";
import { useOutletContext, useParams, Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function AppDetail() {
  const [selectedFileName, setSelectedFileName] = useState("Upload Screenshot…");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const outlet = useOutletContext();

  const id = params.id;
  const tasks = outlet.tasks;
  const task = tasks.find((task) => task.id == id);

  // Handle file input changes and dropped files
  const fileChangeHandler = (files) => {
    const file = files[0]; // Assuming you only handle one file at a time
    setSelectedFileName(file.name);
    setSelectedFile(file);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("TaskId", id);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/app/completeTask`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setIsLoading(false);
        alert(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      const response = error.response;
      alert(response.data.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    fileChangeHandler(files);
  };

  if (!task || task.length <= 0) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="section">
      <button className="button is-white">
        <Link to="/home">
          <span className="icon">
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </span>
        </Link>
      </button>
      <br />
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
                <button onClick={(e) => e.preventDefault()} className="button is-primary">
                  {task.points}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="is-flex is-justify-content-center">
          <div className="card">
            <div
              className="file is-large is-boxed has-name"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e)}
            >
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="uploadedFile"
                  onChange={(e) => fileChangeHandler(e.target.files)}
                  accept="image/*"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span className="file-label">{selectedFileName}</span>
                </span>
              </label>
            </div>
            <div className="is-flex is-justify-content-center">
              <button
                onClick={fileUploadHandler}
                className={`button is-small is-light ${isLoading ? "is-loading" : ""}`}
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
