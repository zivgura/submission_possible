import { toastService } from '../services';
import { RESPONSE_TYPES } from '../constants'

const handleResponseFromServer = ({status, message, ...rest}, onSuccess) => {
	switch (RESPONSE_TYPES[status]) {
		case 'SUCCESS':
			toastService.onSuccess(message);
			onSuccess();
			return true;
		case 'FAILURE':
			toastService.onError(`${message}`);
			return false;
		default:
			toastService.onError('Something went wrong. Please try again');
			return false;

	}
};

export default {
	handleResponseFromServer
};
