import React, { Component } from "react";
import { AddTaskContext } from "../contexts/AddTask";
export default class AddUpdateTask extends Component {
  constructor(props) {
    super(props);
    this.onHandleClickExit = this.onHandleClickExit.bind(this);
    this.addTaskName = this.addTaskName.bind(this);
    this.onSaveTask = this.onSaveTask.bind(this);
    this.state = {
      name: ""
    };
  }
  onSaveTask(tasks, AddTask, updateTask, taskRepair, itemRepair) {
    return e => {
      e.preventDefault();
      var name = e.target.name.value;
      var selected = e.target.selected.value;
      var task = {
        name: name,
        selected: selected
      };
      console.log(tasks, itemRepair);
      const index = tasks.indexOf(itemRepair);
      console.log(tasks.indexOf(itemRepair), "here");
      if (tasks.indexOf(itemRepair) === -1) {
        AddTask(task);
      } else {
        updateTask(task, index);
      }
      taskRepair({ name: "" });
    };
  }
  addTaskName(event) {
    const inputName = event.target.value;
    this.setState(state => {
      return {
        name: inputName
      };
    });
  }
  onHandleClickExit(taskRepair) {
    return () => {
      taskRepair({ name: "" });
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      name: props.Data.name,
      selected: props.Data.selected
    });
  }
  render() {
    return (
      <AddTaskContext.Consumer>
        {({ tasks, AddTask, updateTask, taskRepair, itemRepair }) => {
          return (
            <div className="col-md-4">
              <form
                onSubmit={this.onSaveTask(
                  tasks,
                  AddTask,
                  updateTask,
                  taskRepair,
                  itemRepair
                )}
              >
                <div class="card border-warning mb-3" Style="max-width: 18rem;">
                  <div class="alert alert-warning mb-0">
                    {itemRepair.name === "Add tasks"
                      ? "Add tasks"
                      : "Update tasks"}
                  </div>
                  <div class="card-body">
                    <label for="name" className="mb-0">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.addTaskName}
                      name="name"
                      id="name"
                      value={this.state.name}
                    />
                    <label for="status" className="mb-0 mt-2">
                      Status
                    </label>
                    <select
                      className="form-control"
                      onChange={this.addTaskSelect}
                      name="selected"
                    >
                      <option value="hide">hide</option>
                      <option value="active">active</option>
                    </select>
                    <div className="mt-4">
                      <button type="submit" class="btn alert-warning mr-4">
                        <i className="fas fa-plus mr-2" />
                        Save
                      </button>

                      <button
                        type="button"
                        class="btn alert-danger"
                        onClick={this.onHandleClickExit(taskRepair)}
                      >
                        <i class="fas fa-times mr-2" />
                        Exit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </AddTaskContext.Consumer>
    );
  }
}
