import { FC } from "react";
import { Days, days, Hours, hours } from "../lib/schedule-utils";
import styles from "./Cell.module.css";

type Props = {
  hour: Hours;
  day: Days;
  onClick: (day: Days, hour: Hours) => void;
};

const EmptyCell: FC<Props> = ({ hour, day, onClick }) => {
  const dayIndex = days.indexOf(day) + 2;
  const hourIndex = hours.indexOf(hour) + 2;
  const style = { gridRow: `${hourIndex}`, gridColumn: `${dayIndex}` };
  return (
    <div
      onClick={() => onClick(day, hour)}
      className={`${styles.cell} ${styles.cellEmpty}`}
      style={style}
    ></div>
  );
};

export default EmptyCell;
