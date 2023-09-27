import React from "react";

export default function AdminAddApp() {
  return (
    <div className="section">
      <div class="container ">
        <div className="is-flex is-justify-content-center pb-6">
          <figure class="image is-128x128">
            <img src="https://bulma.io/images/placeholders/256x256.png" />
          </figure>
        </div>
        <form class="form">
          <div class="columns is-multiline">
            <div class="column is-half">
              <div class="field">
                <div class="control">
                  <input class="input" type="text" placeholder="App Name" />
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <div class="control">
                  <input class="input" type="text" placeholder="App Link" />
                </div>
              </div>
            </div>
            <div class="column is-full is-flex is-justify-content-center">
              <button className="button is-small">Fetch Categories</button>
            </div>
            <div class="column is-half">
              <div class="field">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>
                      <option>App Category</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <div class="field">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>
                      <option>App SubCategory</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-full">
              <div class="buttons has-addons is-centered">
                <button class="button is-primary">Add Points</button>
              </div>
            </div>

            <div class="column is-full">
              <div class="buttons has-addons is-centered">
                <button class="button is-primary">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
