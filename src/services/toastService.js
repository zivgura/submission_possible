import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastDefaultConfiguration = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined
};

const onSuccess = (message) => (
	toast.success(message, toastDefaultConfiguration)
);

const onError = (message) => (
	toast.error(message, toastDefaultConfiguration)
);

const onWarning = (message) => (
	toast.warning(message, toastDefaultConfiguration)
);

const onInfo = (message) => (
	toast.info(message, toastDefaultConfiguration)
);

export default {
	onSuccess,
	onError,
	onWarning,
	onInfo
};