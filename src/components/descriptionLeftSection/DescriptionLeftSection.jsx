import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import Style from "./DescriptionLeftSection.module.css";
import { GrTextAlignFull, GrList } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
  ],
};

const getPerfectTime = () => {
  const timeElapsed = new Date() - new Date().getTime();
  const seconds = Math.floor(timeElapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 60);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hours${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `Few seconds ago`;
  }
};

export default function DescriptionLeftSection() {
  const { id } = useParams();
  const { collectionTaskList, updatedData } = useContext(AuthContext);
  const [isDescriptionVisible, setIsDiscriptionVisible] = useState(false);
  const [isCommentWrite, setIsCommentWrite] = useState(false);
  const [isActivityVsible, setIsActivityVisible] = useState(false);
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");

  const [comments, setComments] = useState("");
  const [activity, setActivitis] = useState([]);

  const [currentMainObj, setCurrentMainObj] = useState({});
  const [currentTask, setCurrentTask] = useState({});

  const idFromLS = JSON.parse(localStorage.getItem("currentItemId")); //geeting id from Local Storage

  const handelCancel = () => {
    setIsDiscriptionVisible(false);
    if (currentTask?.description === "") {
      setValue("");
    }
  };

  const handelSave = () => {
    updateDescription(value);
    setIsDiscriptionVisible(false);
  };

  //Save comment
  const handelCommentSave = () => {
    if (comments === "") {
      return;
    } else {
      //Creating Object for each comments
      const newActivity = {
        id: nanoid(),
        changes: comments,
        changeedAt: getPerfectTime(),
      };
      //updating comments object in activity array and update in current task object
      const updateActivitityInCurrentTask = {
        ...currentTask,
        activity: [...currentTask.activity, newActivity],
      };
      //updating current task object in tasks array
      const updateCurrentTask = currentMainObj.tasks.map((ele) => {
        if (ele.id === id) {
          return updateActivitityInCurrentTask;
        } else {
          return ele;
        }
      });
      //Updating tasks array in current task list
      const updatedCurrentTaskList = {
        ...currentMainObj,
        tasks: updateCurrentTask,
      };
      //updating the main state and localstorage
      updatedData(updatedCurrentTaskList, currentMainObj.id);
      setComments("");
      setIsCommentWrite(false);
    }
  };

  //Updating Description here...
  const updateDescription = (desContent) => {
    const updateDes = { ...currentTask, description: desContent };
    const updateCurrentTask = currentMainObj.tasks.map((ele) => {
      if (ele.id === id) {
        return updateDes;
      } else {
        return ele;
      }
    });
    const updatedCurrentTaskList = {
      ...currentMainObj,
      tasks: updateCurrentTask,
    };
    updatedData(updatedCurrentTaskList, currentMainObj.id);
  };

  //Find current current object and current task and also activity
  useEffect(() => {
    const findCuurentObj = collectionTaskList.find(
      (ele) => ele.id === idFromLS
    );
    setCurrentMainObj(findCuurentObj);

    const task = findCuurentObj.tasks.find((task) => task.id === id);
    setActivitis(task.activity);
    setCurrentTask(task);
  }, [updateDescription, handelCommentSave]);

  console.log("activity is", activity);

  return (
    <>
      <div className={Style.Main_Container}>
        <div className={Style.titleSection}>
          <div className={Style.BtnContent}>
            <p>Notifications</p>
            <div className={Style.EyeLog}>
              <AiOutlineEye />
              <p>Watch</p>
            </div>
          </div>
        </div>

        <div className={Style.DescriptionSection}>
          <div className={Style.desc}>
            <GrTextAlignFull />
            <h2>Description</h2>
            {currentTask?.description && (
              <button
                className={Style.editBtn}
                onClick={() => setIsDiscriptionVisible(true)}
              >
                Edit
              </button>
            )}
          </div>
          {isDescriptionVisible ? (
            <div className={Style.Editor}>
              <ReactQuill
                placeholder="Use Markdown shortcuts to format your page as you type, like * for lists, # for headers, and --- for a horizontal rule."
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
              />
              <div className={Style.btn__container}>
                <button onClick={handelSave}>Save</button>
                <button onClick={handelCancel}>Cancel</button>
              </div>
            </div>
          ) : currentTask?.description === "" ? (
            <div
              className={Style.DescriptionSectionContent}
              onClick={() => setIsDiscriptionVisible(true)}
            >
              <p>Add a more detailed description…</p>
            </div>
          ) : (
            <p
              className={Style.content}
              dangerouslySetInnerHTML={{ __html: currentTask?.description }}
            />
          )}
        </div>

        <div className={Style.ActivitySection}>
          <div className={Style.ActiveHeading}>
            <div>
              <GrList />
              <h2>Activity</h2>
            </div>
            <button onClick={() => setIsActivityVisible(!isActivityVsible)}>
              {isActivityVsible ? "Hide Details" : "Show Details"}
            </button>
          </div>
          <div className={Style.ActComments}>
            {isCommentWrite ? (
              <div className={Style.commentsWrite}>
                <ReactQuill
                  placeholder="Write a comments..."
                  theme="snow"
                  value={comments}
                  onChange={setComments}
                  modules={modules}
                />
                <button className={Style.save} onClick={handelCommentSave}>
                  Save
                </button>
              </div>
            ) : (
              <div
                className={Style.comment}
                onClick={() => setIsCommentWrite(true)}
              >
                <p>Write a comment...</p>
              </div>
            )}
          </div>

          {isActivityVsible ? (
            <div className={Style.Activity__Container}>
              {activity &&
                activity.map((singleActivity) => (
                  <div className={Style.Activity__wrapper}>
                    <div>
                      <img src="https://trello-members.s3.amazonaws.com/645b7230aa6b087832e739aa/e569e07c1d07c641a798700da85d07f7/50.png" />
                    </div>
                    <div>
                      <p>{singleActivity.text}</p>
                      <div className={Style.info}>
                        <h3>Smith John</h3>
                        <small>{singleActivity.changeedAt}</small>
                      </div>

                      <p
                        className={Style.commentContent}
                        dangerouslySetInnerHTML={{
                          __html: singleActivity.changes,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
