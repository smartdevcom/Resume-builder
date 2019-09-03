import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, InputAdornment, CircularProgress, TextField, makeStyles } from '@material-ui/core';
import { CheckOutlined, CancelOutlined, CalendarTodayOutlined } from '@material-ui/icons';
import { teal } from '@material-ui/core/colors';
const theme = createMuiTheme({
	palette: {
		primary: teal
	}
});
const useStyles = makeStyles({
	success: {
		color: 'teal'
	},
	danger: {
		color: 'tomato'
	},
	loading: {
		color: 'grey'
	},
	bgLight: {
		backgroundColor: '#f7f7f7'
	}
});
const CustomInput = props => {
	const { type, state, label, ...other } = props;
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<TextField
				label={label}
				variant='outlined'
				fullWidth
				InputProps={{
					startAdornment: type === 'date' && (
						<InputAdornment position='start'>
							<CalendarTodayOutlined className={classes.loading} />
						</InputAdornment>
					),
					endAdornment: state && (
						<InputAdornment position='end'>
							{state === 'success' ? (
								<CheckOutlined className={classes.success} />
							) : state === 'error' ? (
								<CancelOutlined className={classes.danger} />
							) : (
								state === 'loading' && <CircularProgress className={classes.loading} size={25} />
							)}
						</InputAdornment>
					)
				}}
				className={classes.bgLight}
				type={type}
				{...other}
			/>
		</ThemeProvider>
	);
};
export default CustomInput;
