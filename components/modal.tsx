import { FC } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type Props = {
  show: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ show, onClose, children }) => {
  const modalContent = (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            x
          </a>
        </StyledModalHeader>
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  );
  return show
    ? createPortal(
        modalContent,
        document.querySelector("#__next") as HTMLElement
      )
    : null;
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
