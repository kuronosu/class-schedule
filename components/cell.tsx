import { FC, MouseEvent } from "react";
import styled from "styled-components";
import { days, hours, Lesson } from "../lib/schedule-utils";

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
    <StyledCell
      style={style}
      onContextMenu={(e) => handleContextMenu(e, lesson)}
    >
      <StyledCellText>
        {name}
        {url && (
          <>
            {" - "}
            <a href={url} target="_blank">
              Enlace
            </a>
          </>
        )}
      </StyledCellText>
    </StyledCell>
  );
};

const StyledCellText = styled.span`
  padding: 0.15em 0;
`;

export const StyledCell = styled.div`
  text-align: center;
  display: flex;
  margin: 1px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  border-right: 1px solid rgba(166, 168, 179, 0.12);
  box-shadow: 0 10px 20px rgb(0 0 0 / 10%), inset 0 -3px 0 rgb(0 0 0 / 20%);
`;

export default Cell;
