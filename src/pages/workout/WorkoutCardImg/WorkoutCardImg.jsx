import React from "react";
import Yoga from "./Img/Yoga.png";
import Stretching from "./Img/Stretching.png"
import BodyFlex from "./Img/BodyFlex.png"
import StepAirobic from "./Img/StepAirobic.png"
import DanceFitness from "./Img/DanceFitness.png"


import style from "./WorkoutCardImg.module.scss";

export const WorkoutCardImg = ({ worcout }) => {
  if (worcout === "Yoga") {
    return <img src={Yoga} alt="" className={style.workoutCard_Img}></img>;
  } else if (worcout === "StepAirobic") {
    return <img src={StepAirobic} alt="" className={style.workoutCard_ImgRight}></img>;
  } else if (worcout === "Stretching") {
    return <img src={Stretching} alt="" className={style.workoutCard_Img}></img>;
  } else if (worcout === "BodyFlex") {
    return <img src={BodyFlex} alt="" className={style.workoutCard_Img}></img>;
  } else if (worcout === "DanceFitness") {
    return <img src={DanceFitness} alt="" className={style.workoutCard_ImgRight}></img>;
  } 
};
