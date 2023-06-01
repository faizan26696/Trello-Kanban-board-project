import React, { useContext } from "react";
import CreateNewTask from "../../components/createNewTask/CreateNewTask";
import { AuthContext } from "../../context/AuthContextProvider";
import TaskList from "../../components/taskList/TaskList";
import AddList from "../../components/addlist/AddList";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  const { collectionTaskList, isToggle, setCollectionTaskList } = useContext(AuthContext);

  //Delete Entire Task List in once
  const handelTaskDelete = (id) => {
    const filteredTaskList = collectionTaskList.filter((taskList) => taskList.id !== id);
    setCollectionTaskList(filteredTaskList);
  };

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

    //find current object
    const startCurrentObj = collectionTaskList.find((taskList) => taskList.id === source.droppableId);
    const dropebalCurrentObj = collectionTaskList.find(
      (taskList) => taskList.id === destination.droppableId
    );

    // Set start and end variables
    const start = startCurrentObj;
    const end = dropebalCurrentObj;

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.tasks.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setCollectionTaskList((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.tasks.filter((_, idx) => idx !== source.index);

      // Make a new end list array
      const newEndList = end.tasks;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.tasks[source.index]);

      const newColletionTaskList = collectionTaskList.map((taskList) => {
        if (taskList.id === start.id) {
          return { ...taskList, tasks: newStartList };
        } else if (taskList.id === end.id) {
          return { ...taskList, tasks: newEndList };
        } else {
          return taskList;
        }
      });
      setCollectionTaskList(newColletionTaskList);
      return null;
    }
  };

  return (
    <div className="maindiv">
      <div className="nav">
        <Navbar />
      </div>
      <div className="Home__container">
        <div className="task__list">
          <DragDropContext onDragEnd={onDragEnd}>
            {collectionTaskList &&
              collectionTaskList.map((singleTaskList) => (
                <TaskList
                  key={singleTaskList.id}
                  handelTaskDelete={handelTaskDelete}
                  {...singleTaskList}
                />
              ))}
          </DragDropContext>
        </div>

        {isToggle ? <CreateNewTask /> : <AddList />}
      </div>
    </div>
  );
};

export default Home;
