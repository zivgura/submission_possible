import ReactLoading from 'react-loading';
import './loader.css';

const Loader = () => (
	<div className='loader'>
		<ReactLoading
			type={'spin'}
			color={'#0eabb7'}
			delay={300}
		/>
	</div>
);

export default Loader;
