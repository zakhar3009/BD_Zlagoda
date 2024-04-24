import MatModal from "./MatModal/MatModal";
import { FiAlertTriangle } from "react-icons/fi";

export default function DeleteModal({
  item,
  open,
  handleClose,
  deleteFunc,
  deleteProperty
}) {
  const deleteRequest = async () => {
    console.log("Item", item)
    deleteFunc(item[deleteProperty]);
    handleClose();
  };

  return (
    <MatModal open={open} handleClose={handleClose}>
      <div className="grid grid-cols-1 gap-4">
        <div className="place-self-center text-center">
          <label>
            <FiAlertTriangle className="text-6xl text-red-500" />
          </label>
          <h1 className="font-bold text-gray-700">Caution!</h1>
          <h3 className="text-gray-600">Do you really want to delete?</h3>
        </div>
        <div className="place-self-center">
          <button
            onClick={() => deleteRequest()}
            className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          >
            Delete
          </button>
          <button
            onClick={handleClose}
            className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Close
          </button>
        </div>
      </div>
    </MatModal>
  );
}
