import { Box, Modal as ModalComponent } from "@mui/material";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  handleCloseModal: () => void;
  openModal: boolean;
  setopenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Modal = ({ children, handleCloseModal, openModal }: Props) => {
  return (
    <ModalComponent
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, display: "flex" }}>{children}</Box>
    </ModalComponent>
  );
};

export default Modal;
