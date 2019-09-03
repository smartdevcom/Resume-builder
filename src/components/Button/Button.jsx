import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ColorButton = withStyles(theme => ({
	root: {
		color: 'white',
		backgroundColor: '#13806c',
		'&:hover': {
			backgroundColor: '#1b695b'
		}
	}
}))(Button);

const CustomButton = props => <ColorButton {...props} fullWidth variant='contained' color='primary' />;
export default CustomButton;
