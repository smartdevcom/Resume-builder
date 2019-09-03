/**
 *
 * SummaryChild
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AddOutlined } from '@material-ui/icons';
import CustomInput from '../Input';
import { summaryChildStyles } from './style';
import CustomButton from '../Button';
import { Link } from 'react-router-dom';
import SearchList from '../SearchList/SearchList';
import RichEdit, {  } from '../RichEdit/RichEdit';


function SummaryChild() {
	const classes = summaryChildStyles();
	const dispatch = useDispatch();
	const richEdit = useRef();
	const [id, setId] = useState('');
	const [summary, setSummary] = useState({});
	const query = useSelector(state => state);
	const { fetching, server_data, error } = query;
	const [updateTimeouts, setUpdateTimeouts] = useState({});
	const [flagInput, setFlagInput] = useState('');

	let index = 0;

	useEffect(() => {
		setId(server_data.education[index].id);
		//setSummary(server_data.summary[index]);
	}, [server_data]);

	const handleSearchItemSelected = item => {
		richEdit.current.addParagraph(item.description);
	}

	const handleChange = e => {
		let jsonValue = {};
		let value = e.target.value;
		let name = e.target.name;
		// if (e.target.type === 'date') {
		// 	let res = e.target.value.split('-');

		// 	value = `${res[1]}/${res[2]}/${res[0]}`;
		// 	jsonValue = {
		// 		type: 'API_CALL_CHANGE',
		// 		field: e.target.id,
		// 		name: e.target.name,
		// 		value: value,
		// 		index: index
		// 	};
		// } else {
		// 	jsonValue = {
		// 		type: 'API_CALL_CHANGE',
		// 		field: e.target.id,
		// 		name: e.target.name,
		// 		value: value,
		// 		index: index
		// 	};
		// }

		//dispatch(jsonValue);

		switch (e.target.name) {
			case 'summary':
				deferApiCallUpdate(name, value);
				break;
			default:
				break;
		}
	};

	const deferApiCallUpdate = (name, value) => {
		let tout = updateTimeouts[name];
		if (tout)
			clearTimeout(tout);
		tout = setTimeout(() => {
			setFlagInput(name);
			dispatch({
				type: 'API_CALL_UPDATE',
				payload: { field: 'summary', id: id, json: value }
			});
		}, 500);
		updateTimeouts[name] = tout;
		setUpdateTimeouts(updateTimeouts);
	}

	return (
		<Paper className={classes.paper} elevation={0}>
			<Grid container spacing={3}>
				<Grid item md={8}>
					<Grid container spacing={3} className={classes.container}>
						<Grid item xs={12} md={6}>
						<RichEdit 
								height={460} 
								placeholder='Summary Details'
								value={summary}
								id='summary'
								name='summary' 
								onChange={handleChange} 
								ref={richEdit} 
								></RichEdit>
						</Grid>
						<Grid item xs={12} md={6}>
							<SearchList height={460} onItemSelected={ handleSearchItemSelected } resource='summary-suggestions' ></SearchList>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ marginTop: 32 }}>
						<Grid container justify='space-between'>
							<Grid xs={12} md={2} item>
								<Button component={Link} to='/skills' variant='contained' color='default' fullWidth>
									Back
								</Button>
							</Grid>
							<Grid xs={12} md={2} item>
								<CustomButton component={Link} to='/finalize'>
									Next step
								</CustomButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={4}>
					<Box boxShadow={2} borderRadius={4}>
						<img src='https://via.placeholder.com/300x450' className={classes.img} alt='cv' />
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
}

SummaryChild.propTypes = {};

export default memo(SummaryChild);
