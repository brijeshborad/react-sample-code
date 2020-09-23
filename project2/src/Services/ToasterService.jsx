import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import React from "react";

let autoClose = 1000 * 5;
let options = {
    autoClose: autoClose,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnFocusLoss: false,
    hideProgressBar: true
}

class ToasterService {

    static getMessageWithIcons(message, type) {
        switch (type) {
            case "success":
                return (<p><span className="fa fa-check-circle"/>{message}</p>)
            case "error":
                return (<p><span className="fa fa-exclamation-circle"/>{message}</p>)
            case "warn":
                return (<p><span className="fa fa-exclamation-circle"/>{message}</p>)
            case "info":
                return (<p><span className="fa fa-question-circle"/>{message}</p>)
            default:
                return message;
        }
    }

    static Configure() {
        toast.configure(options)
    }

    static Toast(message, type, autoclose, customClass, customOptions, toastId) {

        switch (type) {
            case "success":
                toast.success(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "error":
                toast.error(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "info":
                toast.info(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "warn":
                toast.warn(this.getMessageWithIcons(message, type), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "update":
                toast.update(toastId, {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
                break;
            case "close":
                toast.dismiss(toastId);
                break;
            default:
                toast.success(this.getMessageWithIcons(message, type || 'success'), {
                    ...(autoclose !== undefined && {
                        autoClose: autoclose
                    }),
                    ...(customClass && {
                        className: customClass
                    }),
                    ...customOptions
                })
        }
    }
}

export default ToasterService;
