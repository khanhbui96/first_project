import React, { Component } from "react";
export const AddTaskContext = React.createContext();
export class AddTaskProvider extends Component {
  constructor(props) {
    super(props);
    if (sessionStorage.tasks) {
      var tasks = JSON.parse(sessionStorage.tasks);
    } else {
      tasks = [];
    }
    this.state = {
      tasks: tasks,
      keyInput: "",
      keySelect: "all",
      itemRepair: { name: "", selected: "" }
    };
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.taskInput = this.taskInput.bind(this);
    this.taskDelete = this.taskDelete.bind(this);
    this.taskSelect = this.taskSelect.bind(this);
    this.taskRepair = this.taskRepair.bind(this);
    this.onSortAZ = this.onSortAZ.bind(this);
    this.onSortZA = this.onSortZA.bind(this);
    this.onHide = this.onHide.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  setValue(key, value) {
    return this.setState(state => {
      var obj = {};
      obj[key] = value;
      return obj;
    });
  }
  onHide(e) {
    this.setValue("keySelect", e.target.value);
  }
  onSortZA() {
    this.state.tasks.sort((a, b) => {
      return b.name.charCodeAt(0) - a.name.charCodeAt(0);
    });
    this.setValue("tasks", this.state.tasks);
  }
  onSortAZ() {
    this.state.tasks.sort((a, b) => {
      return a.name.charCodeAt(0) - b.name.charCodeAt(0);
    });
    this.setState({
      tasks: this.state.tasks
    });
  }
  taskDelete(keyword) {
    const tasks = this.state.tasks.filter(task => {
      return task !== keyword;
    });
    this.setValue("tasks", tasks);
  }
  taskRepair(keyword) {
    this.setValue("itemRepair", keyword);
  }
  taskSelect(keyword) {
    this.setValue("keySelect", keyword);
  }
  taskInput(keyword) {
    this.setValue("keyInput", keyword);
  }
  updateTask(task, index) {
    const a = this.state.tasks.splice(index, 1, task);
  }
  addTask(task) {
    this.setValue("tasks", this.state.tasks.concat(task));
  }
  render() {
    return (
      <AddTaskContext.Provider
        value={{
          onHide: this.onHide,
          onSortZA: this.onSortZA,
          onSortAZ: this.onSortAZ,
          updateTask: this.updateTask,
          itemRepair: this.state.itemRepair,
          keyInput: this.state.keyInput,
          keySelect: this.state.keySelect,
          tasks: this.state.tasks,
          AddTask: this.addTask,
          taskInput: this.taskInput,
          taskSelect: this.taskSelect,
          taskDelete: this.taskDelete,
          taskRepair: this.taskRepair
        }}
      >
        {this.props.children}
      </AddTaskContext.Provider>
    );
  }
}
