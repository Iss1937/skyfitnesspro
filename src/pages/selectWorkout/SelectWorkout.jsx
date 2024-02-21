import React from "react";
import { workouts } from "./WorkoutsMocData";
import { courses } from "../workout/MocData";
import style from "./SelectWorkout.module.scss";
import made from "./made.png"
export const SelectWorkout = () => {
  const currentCourse = "Бодифлекс";
  const currentWorkoutsId = courses.find(
    (course) => course.nameRU === currentCourse
  ).workouts;
  const currentWorkouts = workouts.filter((e) =>
    currentWorkoutsId.includes(e._id)
  );
  return (
    <div className={style.selectWorkout}>
      <div className={style.selectWorkout_box}>
        <h1 className={style.selectWorkout_title}>Выберите тренировку</h1>
        <div className={style.workouts}>
          {currentWorkouts.map((el) => {
            return (
              <div className={style.workout}>
                <p className={style.workout_text}>{el.name}</p>
              </div>
            );
            // return (
            //   <div className={style.workoutMade}>
            //     <p className={style.workoutMade_text}>{el.name}</p>
            //     <img className={style.workoutMade_img} src={made} alt="made" />
            //   </div>
            // );
          })}
        </div>
      </div>
    </div>
  );
};
