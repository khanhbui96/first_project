import React from "react";
import ReactDOM from "react-dom";

import AddUpdateTask from "./components/AddUpdateTask";
import Setting from "./components/Setting";
import ShowTask from "./components/ShowTask";
import AddTask from "./components/AddTask";
import { AddTaskProvider, AddTaskContext } from "./contexts/AddTask";
const SettingWithItem = Setting(AddTask);
import "./styles.css";
import { createStore } from "redux";
import myReducers from "./reducers/index";
const store = createStore(myReducers);
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <AddTaskProvider>
        <div className="App">
          <div className="">
            <h1>TASKS MANAGER</h1>
            <hr />
          </div>
          <div className="container mt-5">
            <AddTaskContext.Consumer>
              {({ itemRepair }) => {
                return itemRepair.name ? (
                  <div className="row">
                    <AddUpdateTask Data={itemRepair} />
                    <div className="col-md-8">
                      <SettingWithItem />
                      <ShowTask />
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-12">
                      <SettingWithItem />
                      <ShowTask />
                    </div>
                  </div>
                );
              }}
            </AddTaskContext.Consumer>
          </div>
        </div>
      </AddTaskProvider>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
