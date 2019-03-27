import React, { Component, useContext } from "react";
import { AddTaskContext } from "../contexts/AddTask";
export default class ShowTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onChange: false,
      tasks: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.onHandleInput = this.onHandleInput.bind(this);
    this.onRepair = this.onRepair.bind(this);
  }
  onRepair(task, taskRepair) {
    return () => {
      taskRepair(task);
    };
  }
  onDelete(task, taskDelete) {
    return () => {
      const value = task;
      taskDelete(value);
    };
  }
  onHandleInput(taskInput) {
    return e => {
      const keyword = e.target.value;
      taskInput(keyword);
    };
  }
  onHandleSelect(taskSelect) {
    return e => {
      const keyword = e.target.value;
      taskSelect(keyword);
    };
  }
  render() {
    return (
      <table class="table mt-2 table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Range</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" />
            <td>
              <AddTaskContext.Consumer>
                {({ taskInput }) => (
                  <input
                    className="form-control"
                    onChange={this.onHandleInput(taskInput)}
                  />
                )}
              </AddTaskContext.Consumer>
            </td>
            <td>
              <AddTaskContext.Consumer>
                {({ taskSelect }) => (
                  <select
                    className="form-control"
                    onChange={this.onHandleSelect(taskSelect)}
                  >
                    <option value={"hide"}>hide</option>
                    <option value={"active"}>active</option>
                    <option value={"all"}>all</option>
                  </select>
                )}
              </AddTaskContext.Consumer>
            </td>
            <td />
          </tr>
          <AddTaskContext.Consumer>
            {({ tasks, keyInput, keySelect, taskDelete, taskRepair }) => {
              sessionStorage.tasks = JSON.stringify(tasks);
              if (keySelect === "hide") {
                tasks = tasks.filter((task, index) => {
                  return task.selected === "hide";
                });
              } else if (keySelect === "active") {
                tasks = tasks.filter((task, index) => {
                  return task.selected === "active";
                });
              }
              tasks = tasks.filter((task, index) => {
                return task.name.indexOf(keyInput) > -1;
              });
              return tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.name}</td>
                  <td>{task.selected}</td>
                  <td>
                    <div>
                      <button
                        className="btn btn-sm alert-warning mr-2"
                        onClick={this.onRepair(task, taskRepair, tasks)}
                      >
                        <i class="fas fa-pen mr-2" />
                        Repair
                      </button>
                      <button
                        className="btn btn-sm alert-danger"
                        onClick={this.onDelete(task, taskDelete)}
                      >
                        <i class="fas fa-trash-alt mr-2" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ));
            }}
          </AddTaskContext.Consumer>
        </tbody>
      </table>
    );
  }
}
