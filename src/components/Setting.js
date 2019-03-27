import React, { Component } from "react";
import { AddTaskContext } from "../contexts/AddTask";
export default function(Item) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "khanh"
      };
      this.onHandSearch = this.onHandSearch.bind(this);
    }

    onHandSearch(taskInput) {
      return e => {
        e.preventDefault();
        const keyword = e.target.keyword.value;
        taskInput(keyword);
      };
    }
    render() {
      return (
        <AddTaskContext.Consumer>
          {({ taskInput, onSortAZ, onSortZA, onHide }) => {
            return (
              <div className="">
                <div>
                  <Item />
                </div>
                <div className="clearfix" />
                <div className="row mt-2">
                  <div className="d-flex ml-3">
                    <form
                      onSubmit={this.onHandSearch(taskInput)}
                      className="d-flex"
                    >
                      <input className="form-control" name="keyword" />

                      <button className="btn btn-primary mr-4">
                        <i class="fas fa-search mr-2" />
                        Search
                      </button>
                    </form>

                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Range
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => onSortAZ()}
                        >
                          A-Z
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => onSortZA()}
                        >
                          Z-A
                        </button>
                        <div className="dropdown-divider" />
                        <button
                          className="dropdown-item"
                          value="hide"
                          onClick={e => onHide(e)}
                        >
                          Hide
                        </button>
                        <button
                          className="dropdown-item"
                          value="active"
                          onClick={e => onHide(e)}
                        >
                          Active
                        </button>
                        <button
                          className="dropdown-item"
                          value="all"
                          onClick={e => onHide(e)}
                        >
                          All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </AddTaskContext.Consumer>
      );
    }
  };
}
