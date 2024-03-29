/**
 *
 * WorkChild
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import { AddOutlined } from '@material-ui/icons';
import { Typography, Paper, Grid, Box, Button } from '@material-ui/core';
import { workChildStyles } from './style';
import CustomInput from '../Input';
import CustomCheckbox from '../Checkbox';
import CustomButton from '../Button';
import SearchList from '../SearchList/SearchList';
import RichEdit from '../RichEdit/RichEdit';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function WorkChild() {
	const classes = workChildStyles();
	const dispatch = useDispatch();
	const query = useSelector(state => state);
	const { fetching, server_data, activeIndex } = query;

	const [city, setCity] = useState('');
	// MS:
	const [country, setCountry] = useState('');
	const [currentWork, setCurrentWork] = useState('');
	const [employer, setEmployer] = useState('');
	const [endDate, setEndDate] = useState('');
	const [id, setId] = useState('');
	const [startDate, setStartDate] = useState('');
	const [stateProvince, setStateProvince] = useState('');
	const [workTitle, setWorkTitle] = useState('');
	const [flagInput, setFlagInput] = useState('');
	const [summary, setSummary] = useState({});

	const [cityLoading, setCityLoading] = useState('success');
	// MS:
	const [countryLoading, setCountryLoading] = useState('success');
	const [employerLoading, setEmployerLoading] = useState('success');
	const [endDateLoading, setEndDateLoading] = useState('success');
	const [startDateLoading, setStartDateLoading] = useState('success');
	const [stateProvinceLoading, setStateProvinceLoading] = useState('success');
	const [workTitleLoading, setWorkTitleLoading] = useState('success');

	const [updateTimeouts, setUpdateTimeouts] = useState({});

	const richEdit = useRef();

   // let index = 0;
   let index = 0;
	index = server_data.workHistory.findIndex(x => x.id === activeIndex.workHistory.toString());
	if(index === -1){
		index = 0;
	}

	useEffect(() => {
		setId(server_data.workHistory[index].id);
		setCity(server_data.workHistory[index].city);
		setCountry(server_data.workHistory[index].country)
		setCurrentWork(server_data.workHistory[index].currentWork);
		setEmployer(server_data.workHistory[index].employer);
		let res = [];
		if (server_data.workHistory[index].endDate === undefined) {
			res = ['', '', ''];
		} else {
			res = server_data.workHistory[index].endDate.split('/');
		}
		setEndDate(`${res[2]}-${res[0]}-${res[1]}`);
		setId(server_data.workHistory[index].id);
		if (server_data.workHistory[index].startDate === undefined) {
			res = ['', '', ''];
		} else {
			res = server_data.workHistory[index].startDate.split('/');
		}
		setStartDate(`${res[2]}-${res[0]}-${res[1]}`);
		setStateProvince(server_data.workHistory[index].stateProvince);
		setWorkTitle(server_data.workHistory[index].workTitle);
		setSummary(server_data.workHistory[index].summary);
	}, [server_data]);

	useEffect(() => {
		if (fetching) {
			switch (flagInput) {
				case 'workTitle':
					setWorkTitleLoading('loading');
					break;
				case 'employer':
					setEmployerLoading('loading');
					break;
				case 'city':
					setCityLoading('loading');
					break;
				case 'country':
					setCountryLoading('loading');
					break;
				case 'stateProvince':
					setStateProvinceLoading('loading');
					break;
				case 'startDate':
					setStartDateLoading('loading');
					break;
				case 'endDate':
					setEndDateLoading('loading');
					break;
				default:
					break;
			}
		} else {
			switch (flagInput) {
				case 'workTitle':
					setWorkTitleLoading('success');
					break;
				case 'employer':
					setEmployerLoading('success');
					break;
				case 'city':
					setCityLoading('success');
					break;
				case 'country':
					setCountryLoading('success');
					break;
				case 'stateProvince':
					setStateProvinceLoading('success');
					break;
				case 'startDate':
					setStartDateLoading('success');
					break;
				case 'endDate':
					setEndDateLoading('success');
					break;
				default:
					break;
			}
		}
	}, [fetching]);

	const deferApiCallUpdate = (name, value) => {
		let tout = updateTimeouts[name];
		if (tout)
			clearTimeout(tout);
		tout = setTimeout(() => {
			setFlagInput(name);
			let data = {};
			data[name] = value;
			dispatch({
				type: 'API_CALL_UPDATE',
				payload: { field: 'workHistory', id: activeIndex.workHistory, json: data }
			});
		}, 500);
		updateTimeouts[name] = tout;
		setUpdateTimeouts(updateTimeouts);
	}

	const handleChange = e => {
		let jsonValue = {};
		let name = e.target.name;
		let value = e.target.value;
		if (e.target.type === 'date') {
			let res = e.target.value.split('-');

			value = `${res[1]}/${res[2]}/${res[0]}`;
			jsonValue = {
				type: 'API_CALL_CHANGE',
				field: e.target.id,
				name: e.target.name,
				value: value,
				index: index
			};
		} else if (e.target.name === 'currentWork') {
			value = e.target.value === 'true' ? 'false' : 'true';
			jsonValue = {
				type: 'API_CALL_CHANGE',
				field: e.target.id,
				name: e.target.name,
				value: value,
				index: index
			};
		} else {
			jsonValue = {
				type: 'API_CALL_CHANGE',
				field: e.target.id,
				name: e.target.name,
				value: value,
				index: index
			};
		}
		dispatch(jsonValue);

		switch (e.target.name) {
			case 'workTitle':
			case 'employer':
			case 'city':
			case 'country':
			case 'stateProvince':
			case 'startDate':
			case 'endDate':
			case 'currentWork':
			case 'summary':
				deferApiCallUpdate(name, value);
				break;
			default:
				break;
		}
	};

	const handleSummaryChange = data => {
		deferApiCallUpdate('summary', data);
	};

	const handleSearchItemSelected = item => {
		richEdit.current.addParagraph(item.description);
	}

	const handleAddWork = () => {
      let index = Math.floor(Math.random() * 1000000);

      let obj = {
         id: index.toString(),
         workTitle: '',
         employer: '',
         city: '',
         stateProvince: '',
         startDate: '',
         endDate: '',
         currentWork: '',
         summary: [],
         country: ''
      };
      dispatch({
         type: 'API_CALL_ADD',
         payload: { field: 'workHistory', id: index, json: obj }
      });
   };

	return (
		<Paper className={classes.paper} elevation={0}>
			<Grid container spacing={3} className={classes.container}>
				<Grid item md={8}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='Job Title'
								placeholder='e.g. Teacher'
								state={workTitleLoading}
								value={workTitle}
								id='workHistory'
								name='workTitle'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='Employer'
								placeholder='e.g. Teacher'
								value={employer}
								state={employerLoading}
								id='workHistory'
								name='employer'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='City'
								placeholder='e.g. Teacher'
								value={city}
								state={cityLoading}
								id='workHistory'
								name='city'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='State/Province'
								placeholder='e.g. Teacher'
								value={stateProvince}
								state={stateProvinceLoading}
								id='workHistory'
								name='stateProvince'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='Country'
								placeholder='e.g. USA'
								value={country}
								state={countryLoading}
								id='workHistory'
								name='country'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<CustomInput
								label='Start Date'
								placeholder='Select'
								state={startDateLoading}
								type='date'
								value={startDate}
								id='workHistory'
								name='startDate'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<CustomInput
								label='End Date'
								placeholder='Select'
								state={endDateLoading}
								type='date'
								value={endDate}
								id='workHistory'
								name='endDate'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={12}>
							<CustomCheckbox
								label='I currently work here'
								checked={currentWork === 'true'}
								value={currentWork}
								id='workHistory'
								name='currentWork'
								handleChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<RichEdit
									height={175}
									placeholder='Description'
									value={summary}
									id='workHistory'
									name='summary'
									onChange={handleChange}
									ref={richEdit}
									></RichEdit>
						</Grid>
						<Grid item xs={12} md={6}>
							<SearchList height={460} onItemSelected={handleSearchItemSelected} resource='work-suggestions' />
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ marginTop: 32 }}>
						<Grid container justify='space-between' className={classes.container}>
							<Grid xs={12} md={2} item>
								<Button component={Link} to='/heading' variant='contained' color='default' fullWidth>
									Back
								</Button>
							</Grid>
							<Grid xs={12} md={3} item>
								<Button variant='contained' color='default' onClick={handleAddWork}
                           disabled={fetching} fullWidth>
									<AddOutlined />
									Add work
								</Button>
							</Grid>
							<Grid xs={12} md={2} item>
								<CustomButton component={Link} to='/education'>
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

WorkChild.propTypes = {};

export default memo(WorkChild);
