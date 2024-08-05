
export const ModalEdit = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
          <div className="flex justify-end p-2">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };
  