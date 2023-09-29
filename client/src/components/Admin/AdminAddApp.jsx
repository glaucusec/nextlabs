import React, { useRef, useState } from "react";
import axios from "axios";
export default function AdminAddApp() {
  const [points, setPoints] = useState("Add Points");
  const [categoryOptions, setCategoryOptions] = useState(["App Category"]);
  const [imageURL, setImageURL] = useState(
    "https://bulma.io/images/placeholders/256x256.png"
  );
  const [subcategoryOptions, setSubcategoryOptions] = useState([
    "App SubCategory",
  ]);
  const [fetching, setFetching] = useState(false);
  const appName = useRef();
  const appLink = useRef();
  const selectedCategory = useRef();
  const selectedSubCategory = useRef();

  async function fetchCategoriesHandler(e) {
    e.preventDefault();
    setFetching(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/app/fetch",
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
    }
  }

  function addPointsHandler(e) {
    e.preventDefault();
    let points = prompt("Enter Points");
    setPoints(points);
  }

  async function appSubmitHandler(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/app/add",
      {
        appName: appName.current.value,
        appLink: appLink.current.value,
        category: selectedCategory.current.value,
        subcategory: selectedSubCategory.current.value,
        points: points,
      },
      { withCredentials: true }
    );
  }

  return (
    <div className="section">
      <div class="container ">
        <div className="is-flex is-justify-content-center pb-6">
          <figure class="image is-128x128">
            <img src={imageURL} />
          </figure>
        </div>
        <form class="form">
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="field">
                <div class="control">
                  <input
                    ref={appName}
                    class="input"
                    type="text"
                    placeholder="App Name"
                  />
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <div class="control">
                  <input
                    ref={appLink}
                    class="input"
                    type="text"
                    placeholder="App Link"
                  />
                </div>
              </div>
            </div>
            <div class="column is-full is-flex is-justify-content-center">
              <button
                onClick={fetchCategoriesHandler}
                className={`button is-small ${fetching ? "is-loading" : ""}`}
              >
                Fetch Categories
              </button>
            </div>
            <div class="column is-half" id="category">
              <div class="field">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select ref={selectedCategory}>
                      {categoryOptions.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-half" id="subcategory">
              <div class="field">
                <div class="control">
                  <div class="select is-fullwidth">
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
          <div class="columns is-multiline">
            <div class="column is-full">
              <div class="buttons has-addons is-centered">
                <button onClick={addPointsHandler} class="button is-primary">
                  {points}
                </button>
              </div>
            </div>

            <div class="column is-full">
              <div class="buttons has-addons is-centered">
                <button onClick={appSubmitHandler} class="button is-primary">
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
