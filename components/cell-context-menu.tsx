import { Dispatch, FC } from "react";
import { Lesson } from "../lib/schedule-utils";
import styled from "styled-components";
import { removeLesson, showEditForm } from "../reducer/actions";

export type CellContextMenuProps = {
  xPos: number;
  yPos: number;
  lesson?: Lesson;
  scheduleDispatch?: Dispatch<any>;
  configDispatch?: Dispatch<any>;
};

const CellContextMenu: FC<CellContextMenuProps> = ({
  xPos,
  yPos,
  lesson,
  scheduleDispatch,
  configDispatch,
}) => {
  return (
    <CellContextMenuContainer style={{ top: yPos, left: xPos }}>
      <CellContextMenuItem
        onClick={() =>
          lesson && configDispatch && configDispatch(showEditForm(lesson))
        }
      >
        edit
      </CellContextMenuItem>
      <CellContextMenuItem
        onClick={() =>
          lesson && scheduleDispatch && scheduleDispatch(removeLesson(lesson))
        }
      >
        delete
      </CellContextMenuItem>
    </CellContextMenuContainer>
  );
};

export default CellContextMenu;

const CellContextMenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const CellContextMenuItem = styled.span`
  margin: 2px 0;
  cursor: pointer;
  &:hover {
    color: #888;
  }
`;
