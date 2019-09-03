/**
 *
 * SkillsChild
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Paper, Grid, Box, Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import { skillsChildStyles } from './style';
import CustomInput from '../Input';
import CustomRate from '../Rate';
import CustomCheckbox from '../Checkbox';
import CustomButton from '../Button';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function SkillsChild() {
	const classes = skillsChildStyles();
	const dispatch = useDispatch();
	const query = useSelector(state => state);
	const { fetching, server_data, error } = query;
	const initialValue = [{ id: 0, name: '', rate: 0 }];
	const [stateSkills, setStateSkills] = useState(initialValue);
	let [skillsLoading, setskillsLoading] = useState([]);
	const [flagInput, setFlagInput] = useState('');
	const allowedState = [];

	const [updateTimeouts, setUpdateTimeouts] = useState({});

	let skills = [];
	let arrayValue = [];
	server_data.skills.map((item, index) => {
		allowedState.push({ id: item.id, name: item.name, rate: item.rate });
		skills.push('success');
		arrayValue.push('success');
	});
	// skillsLoading = [...skills];

	useEffect(() => {
		setStateSkills(allowedState);
		setskillsLoading(arrayValue);
		// setskillsLoading(skillsLoading);
	}, [server_data]);

	let index = 0;

	useEffect(() => {
		if (fetching) {
			arrayValue[flagInput] = 'loading';
			setskillsLoading(arrayValue);
		} else {
			arrayValue[flagInput] = 'success';
			setskillsLoading(arrayValue);
		}
	}, [fetching]);

	const deferApiCallUpdate = (id, name, value) => {
		let tout = updateTimeouts[name];
		if(tout)
			clearTimeout(tout);
		tout = setTimeout(() => {
			setFlagInput(name);
			let data = {};
			data[name] = value;
			dispatch({
				type: 'API_CALL_UPDATE',
				payload: { field: 'skills', id: id, json: data }
			});
		}, 500);
		updateTimeouts[name] = tout;
		setUpdateTimeouts(updateTimeouts);
	}

	const handleChange = e => {
		let value = e.target.value;
		let res = e.target.name.split('-');

		let name = res[0];
		index = parseInt(res[1]);
		let id = parseInt(res[2]);

		let jsonValue = {};

		jsonValue = {
			type: 'API_CALL_CHANGE',
			field: 'skills',
			name: name,
			value: name === 'name' ? e.target.value : `${parseFloat(e.target.value) * 2}`,
			index: index
		};
		dispatch(jsonValue);

		switch (name) {
			case 'name':
				deferApiCallUpdate(id, name, value);
				break;
			case 'rate':
				setFlagInput(index);
				dispatch({
					type: 'API_CALL_UPDATE',
					payload: { field: 'skills', id: id, json: { rate: `${parseFloat(value) * 2}` } }
				});
				break;
			default:
				break;
		}
	};

	return (
		<Paper className={classes.paper} elevation={0}>
			<Grid container spacing={3}>
				<Grid item md={8}>
					<Grid container spacing={3} className={classes.container}>
						{stateSkills.map((item, index) => {
							return (
								<React.Fragment key={index}>
									<Grid item xs={12} md={6}>
										<CustomInput
											label='Skill'
											placeholder='e.g. Teacher'
											value={item.name}
											state={skillsLoading[index]}
											id='skills'
											name={`name-${index}-${item.id}`}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Box display='flex' alignItems='center' height={55}>
											<CustomRate
												value={item.rate}
												name={`rate-${index}-${item.id}`}
												onChange={handleChange}
											/>
										</Box>
									</Grid>
								</React.Fragment>
							);
						})}{' '}
						<Grid item xs={12} md={6}>
							<CustomCheckbox label="Don't show experience level" checked />
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ marginTop: 32 }}>
						<Grid container justify='space-between'>
							<Grid xs={12} md={2} item>
								<Button component={Link} to='/education' variant='contained' color='default' fullWidth>
									Back
								</Button>
							</Grid>
							<Grid xs={12} md={2} item>
								<Button variant='contained' color='default' fullWidth>
									<AddOutlined />
									Add skill
								</Button>
							</Grid>
							<Grid xs={12} md={2} item>
								<CustomButton component={Link} to='/summary'>
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

SkillsChild.propTypes = {};

export default memo(SkillsChild);
