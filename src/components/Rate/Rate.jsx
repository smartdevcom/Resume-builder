import React from 'react';
import Rating from '@material-ui/lab/Rating';

const CustomRate = props => {
	return (
		<Rating
			name={props.name}
			value={`${parseFloat(props.value) / 2}`}
			precision={0.5}
			onChange={props.onChange}
		/>
	);
};

export default CustomRate;
