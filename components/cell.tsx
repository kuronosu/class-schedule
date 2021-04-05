import { Dispatch, FC, MouseEvent, useState } from "react";
import { days, hours, Lesson } from "../lib/schedule-utils";
import styles from "./Cell.module.css";

type Props = {
  lesson: Lesson;
  handleContextMenu: (e: MouseEvent<HTMLElement>, lesson: Lesson) => void;
};

const Cell: FC<Props> = ({ lesson, handleContextMenu }) => {
  const { hour, day, duration, url, name, color } = lesson;
  const dayIndex = days.indexOf(day) + 2;
  const hourIndex = hours.indexOf(hour) + 2;
  const style = {
    gridRow: `${hourIndex} / ${hourIndex + duration}`,
    gridColumn: `${dayIndex}`,
    backgroundColor: color,
  };

  return (
    <div
      onContextMenu={(e) => {
        handleContextMenu(e, lesson);
      }}
      className={`${styles.cell}`}
      style={style}
    >
      <span className={styles.cellText}>
        {name} -{" "}
        <a href={url} target="_blank">
          Enlace
        </a>
      </span>
    </div>
  );
};

export default Cell;
