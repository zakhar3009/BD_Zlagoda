import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function MatModal(props) {

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-white p-3 rounded ">
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}
