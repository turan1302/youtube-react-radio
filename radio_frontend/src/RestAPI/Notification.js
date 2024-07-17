import Swal from "sweetalert2";

class Notification{
    static success = (data)=>{
        return Swal.fire({
            icon : "success",
            title : data.title,
            text : data.text,
            confirmButtonText : "OK"
        })
    }

    static error = (data)=>{
        return Swal.fire({
            icon : "error",
            title : data.title,
            text : data.text,
            confirmButtonText : "OK"
        })
    }
}

export default Notification;
