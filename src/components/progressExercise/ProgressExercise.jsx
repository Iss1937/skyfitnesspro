import style from './progressExercise.module.scss';

export const ProgressExercises = ({ exercises, userId }) => {
  const getDone = ({ needed, exercise }) => {
    if (!exercise?.made) {
      return 0;
    }

    const done = exercise.made;
    let result = Math.round((done / needed) * 100);
    if (result > 100) {
      result = 100;
    }
    return result;
  };

  const colors = [
    { fill: '#565EEF', bcg: '#EDECFF' },
    { fill: '#FF6D00', bcg: '#FFF2E0' },
    { fill: '#9A48F1', bcg: '#F9EBFF' },
    { fill: '#00C90D', bcg: '#e6fae7' },
    { fill: '#E40045', bcg: '#fce6ec' },
  ];

  return (
    <div className={style.progressSection}>
      <span className={style.nameSection}>Мой прогресс по тренировке</span>
      <div className={style.allProgress}>
        {exercises?.map((exercise, index) => {
          const percent = getDone({
            needed: exercise.quantity,
            exercise: exercise,
          });

          return (
            <div className={style.listItem} key={index + 1}>
              <div className={style.nameExercise}>
                {exercise.name.split('(')[0]}
              </div>
              <div
                className={style.progressBar}
                style={{
                  backgroundColor: colors[index].bcg,
                  border: `2px solid ${colors[index]?.fill}`,
                }}
              >
                <div
                  className={style.doneExercise}
                  style={{
                    width: `${percent}%`,
                    backgroundColor: colors[index]?.fill,
                  }}
                ></div>
                <div
                  className={style.percentDone}
                  style={{
                    color: percent > 0 ? '#fff' : '#000',
                    left: `${percent}px`,
                  }}
                >
                  {percent}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressExercises;
