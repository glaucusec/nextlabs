import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddApp() {
  const navigate = useNavigate();
  const [points, setPoints] = useState("Add Points");
  const [categoryOptions, setCategoryOptions] = useState(["App Category"]);
  const [imageURL, setImageURL] = useState("https://bulma.io/images/placeholders/256x256.png");
  const [subcategoryOptions, setSubcategoryOptions] = useState(["App SubCategory"]);
  const [fetching, setFetching] = useState(false);
  const appName = useRef();
  const appLink = useRef();
  const selectedCategory = useRef();
  const selectedSubCategory = useRef();

  async function fetchCategoriesHandler(e) {
    e.preventDefault();
    setFetching(true);
    let response;
    try {
      response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/fetchCategories`,
        {
          appName: appName.current.value,
          appLink: appLink.current.value,
        },
        { withCredentials: true }
      );
      if (response.status == 200) {
        setFetching(false);
        setCategoryOptions([response.data.category, "App Category"]);
        setSubcategoryOptions([response.data.category, "App SubCategory"]);
        setImageURL(response.data.imageURL);
      }
    } catch (error) {
      setFetching(false);
      alert(error.response.data.message);
    }
  }

  function addPointsHandler(e) {
    e.preventDefault();
    let point = prompt("Enter Points");

    if (point === null || point.trim() === "") {
      alert("Points cannot be empty!");
      return;
    }

    if (!isNaN(point)) {
      point = parseFloat(point);
      console.log("Entered points:", point);
      setPoints(point);
    } else {
      alert("Please enter a valid number for points.");
    }
  }

  async function appSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/createTask`,
        {
          appName: appName.current.value,
          appLink: appLink.current.value,
          category: selectedCategory.current.value,
          subcategory: selectedSubCategory.current.value,
          imageURL: imageURL,
          points: points,
        },
        { withCredentials: true }
      );
      if (response.status == 201) {
        alert("Task App Added");
        navigate("/home");
      }
    } catch (error) {
      alert(error.response.statusText);
    }
  }

  return (
    <div className="section">
      <div className="container ">
        <div className="is-flex is-justify-content-center pb-6">
          <figure className="image is-128x128">
            <img src={imageURL} />
          </figure>
        </div>
        <form className="form">
          <div className="columns is-multiline">
            <div className="column is-half">
              <div className="field">
                <div className="control">
                  <input ref={appName} className="input" type="text" placeholder="App Name" />
                </div>
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <div className="control">
                  <input ref={appLink} className="input" type="text" placeholder="App Link" />
                </div>
              </div>
            </div>
            <div className="column is-full is-flex is-justify-content-center">
              <button
                onClick={fetchCategoriesHandler}
                className={`button is-small ${fetching ? "is-loading" : ""}`}
              >
                Fetch Categories
              </button>
            </div>
            <div className="column is-half" id="category">
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select ref={selectedCategory}>
                      {categoryOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-half" id="subcategory">
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select ref={selectedSubCategory}>
                      {subcategoryOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-multiline">
            <div className="column is-full">
              <div className="buttons has-addons is-centered">
                <button onClick={addPointsHandler} className="button is-primary">
                  {points}
                </button>
              </div>
            </div>

            <div className="column is-full">
              <div className="buttons has-addons is-centered">
                <button onClick={appSubmitHandler} className="button is-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
