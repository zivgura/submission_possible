const NOOP = () => {};

const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

export {
	NOOP,
	emailRegex
};