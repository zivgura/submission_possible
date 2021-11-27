import { ToastContainer as ToastifyContainer } from 'react-toastify';

const ToastContainer = () => (
	<ToastifyContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHove
	/>
);

export default ToastContainer;
