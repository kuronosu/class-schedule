import { FC } from "react";
import { formatHour } from "../lib/time";

import styles from "./HourCell.module.css";

type HourCellProps = {
  hour: number;
  is12: boolean;
};

const HourCell: FC<HourCellProps> = ({ hour, is12 }) => (
  <span className={`${styles.hour} .column-1 .row-${hour - 6}`}>{`${formatHour(
    hour,
    is12
  )} - ${formatHour(hour + 1, is12)}`}</span>
);

export default HourCell;
