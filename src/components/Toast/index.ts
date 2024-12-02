import toast, { Toaster } from "react-hot-toast";

const toastSuccess = (message: string) => {
  toast.success(message, {
    id: message,
    style: {
      border: "1px solid green",
      padding: "12px",
    },
  });
};

const toastFail = (message: string) => {
  toast.error(message, {
    id: message,
    style: {
      border: "1px solid red",
      padding: "12px",
    },
  });
};

const toastInfo = (message: string) => {
  toast(message, {
    id: message,
    style: {
      color: "#fff",
      border: "1px solid blue",
      padding: "8px",
      backgroundColor: "#1034A6",
    },
  });
};
const toastPromise = (
  promiseAction: Promise<any>,
  id?: string,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string
) => {
  toast.promise(
    promiseAction,
    {
      loading: loadingMessage ?? "Saving...",
      success: successMessage ?? "Success!",
      error: errorMessage ?? "Error!",
    },
    {
      id: id,
    }
  );
};

export { Toaster, toastFail, toastInfo, toastPromise, toastSuccess };
