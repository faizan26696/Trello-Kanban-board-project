import React, { useContext, useEffect, useState } from "react";
import DescriptionLeftSection from "../../components/descriptionLeftSection/DescriptionLeftSection";
import DescriptionRightSection from "../../components/descriptionRightSection/DescriptionRightSection";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { RiRadioFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Style from "./Description.module.css";

const Description = () => {
  const { id } = useParams();
  const { collectionTaskList } = useContext(AuthContext); 
  const [title, setTitle] = useState(""); //title main
  const [currentTask, setCurrentTask] = useState({}); //only task object
  const idFromLS = JSON.parse(localStorage.getItem("currentItemId")); //geeting id from Local Storage
  const navigate = useNavigate();

  //when user click cancel button then redirect to the page home page
  const handelCloseDiscription = () => {
    navigate("/");
  };

  
  //Find current current object and current task
  useEffect(() => {
    const findCuurentObj = collectionTaskList.find(
      (ele) => ele.id === idFromLS
    );
    setTitle(findCuurentObj.title);

    const task = findCuurentObj.tasks.find((task) => task.id === id);
    setCurrentTask(task);
  }, []);

  return (
    <div className={Style.homeDiv}>
      <div className={Style.discription__wrapper}>
        <div>
          <div className={Style.titleInput}>
            <RiRadioFill className={Style.titleLogo} />
            <h2>{currentTask?.taskTitle}</h2>
          </div>

          <div className={Style.cancelBtn}>
            <RxCross2 onClick={handelCloseDiscription} /> {/* cancel button */}
          </div>

          <div className={Style.ml_5}>
            <p>
              in list <u>{title}</u>{" "}
            </p>
          </div>
        </div>

        <div className={Style.mainContainer}>
          <div className={Style.leftDiv}>
            <DescriptionLeftSection />
          </div>

          <div className={Style.rightDiv}>
            <DescriptionRightSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description
