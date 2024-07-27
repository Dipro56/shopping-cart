import { toast } from "react-hot-toast";

let notifications = {};
notifications.success = (message, position) => {
    toast.success(message, {
        position: position || "top-right",
        autoClose: 3000,
    });
};

notifications.error = (message, position) => {
    toast.error(message, {
        position: position || "top-right",
        autoClose: 3000,
    });
};

export default notifications;

export const notificationOption = {
    className: "",
    style: {
        margin: "40px",
        background: "#363636",
        color: "#fff",
        zIndex: 1,
    },
    // duration: 5000,
    // position: 'top-right',
    reverseOrder: false,
};
