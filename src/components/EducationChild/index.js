/**
 *
 * EducationChild
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import CustomInput from '../Input';
import CustomCheckbox from '../Checkbox';
import { educationChildStyles } from './style';
import CustomButton from '../Button';
import SearchList from '../SearchList/SearchList';
import RichEdit from '../RichEdit/RichEdit';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function EducationChild(props) {
	const classes = educationChildStyles();
	const dispatch = useDispatch();
	const query = useSelector(state => state);
	const { fetching, server_data, activeIndex } = query;

	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [currentSchool, setCurrentSchool] = useState('');
	const [degree, setDegree] = useState('');
	const [endDate, setEndDate] = useState('');
	const [id, setId] = useState('');
	const [schoolName, setSchoolName] = useState('');
	const [startDate, setStartDate] = useState('');
	const [stateProvince, setStateProvince] = useState('');
	const [flagInput, setFlagInput] = useState('');
	const [summary, setSummary] = useState({});

	const [cityLoading, setCityLoading] = useState('success');
	const [countryLoading, setCountryLoading] = useState('success');
	const [schoolNameLoading, setSchoolNameLoading] = useState('success');
	const [endDateLoading, setEndDateLoading] = useState('success');
	const [startDateLoading, setStartDateLoading] = useState('success');
	const [stateProvinceLoading, setStateProvinceLoading] = useState('success');
	const [degreeLoading, setDegreeLoading] = useState('success');

	const [updateTimeouts, setUpdateTimeouts] = useState({});

	const richEdit = useRef();

	let index = 0;
	index = server_data.education.findIndex(x => x.id === activeIndex.education.toString());
	if(index === -1){
		index = 0;
	}

	useEffect(() => {
		setId(server_data.education[index].id);
		setCity(server_data.education[index].city);
		setCountry(server_data.education[index].country);
		setCurrentSchool(server_data.education[index].currentSchool);
		setDegree(server_data.education[index].degree);
		let res = [];
		if (server_data.education[index].endDate === undefined) {
			res = ['', '', ''];
		} else {
			res = server_data.education[index].endDate.split('/');
		}
		setEndDate(`${res[2]}-${res[0]}-${res[1]}`);
		setId(server_data.education[index].id);
		setSchoolName(server_data.education[index].schoolName);
		if (server_data.education[index].startDate === undefined) {
			res = ['', '', ''];
		} else {
			res = server_data.education[index].startDate.split('/');
		}
		setStartDate(`${res[2]}-${res[0]}-${res[1]}`);
		setStateProvince(server_data.education[index].stateProvince);
		setSummary(server_data.education[index].summary);
	}, [server_data, index]);

	useEffect(() => {
		if (fetching) {
			switch (flagInput) {
				case 'schoolName':
					setSchoolNameLoading('loading');
					break;
				case 'degree':
					setDegreeLoading('loading');
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
				case 'schoolName':
					setSchoolNameLoading('success');
					break;
				case 'degree':
					setDegreeLoading('success');
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
	}, [fetching, flagInput]);

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
				payload: { field: 'education', id: id, json: data }
			});
		}, 500);
		updateTimeouts[name] = tout;
		setUpdateTimeouts(updateTimeouts);
	}


	const handleChange = e => {
		let jsonValue = {};
		let value = e.target.value;
		let name = e.target.name;
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
		} else if (e.target.name === 'currentSchool') {
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
			case 'schoolName':
			case 'degree':
			case 'city':
			case 'country':
			case 'stateProvince':
			case 'startDate':
			case 'endDate':
			case 'currentSchool':
			case 'summary':
				deferApiCallUpdate(name, value);
				break;
			default:
				break;
		}
	};

	const handleSearchItemSelected = item => {
		richEdit.current.addParagraph(item.description);
	}

	const handleAddEducation = () => {
      let index = Math.floor(Math.random() * 1000000);

      let obj = {
         id: index.toString(),
         currentSchool: '',
         degree: '',
         city: '',
         stateProvince: '',
         startDate: '',
         endDate: '',
         schoolName: '',
         summary: []
		};
      dispatch({
         type: 'API_CALL_ADD',
         payload: { field: 'education', id: index, json: obj }
      });
   };

	return (
		<Paper className={classes.paper} elevation={0}>
			<Grid container spacing={3}>
				<Grid item md={8}>
					<Grid container spacing={3} className={classes.container}>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='School Name'
								placeholder='e.g. Teacher'
								state={schoolNameLoading}
								value={schoolName}
								id='education'
								name='schoolName'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='Degree'
								placeholder='e.g. Teacher'
								value={degree}
								state={degreeLoading}
								id='education'
								name='degree'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<CustomInput
								label='City'
								placeholder='e.g. Teacher'
								defaultValue='Mark'
								state={cityLoading}
								value={city}
								id='education'
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
								id='education'
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
								id='education'
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
								id='education'
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
								id='education'
								name='endDate'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={12}>
							<CustomCheckbox
								label='I currently study here'
								checked={currentSchool === 'true'}
								value={currentSchool}
								id='education'
								name='currentSchool'
								handleChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<RichEdit
								height={175}
								placeholder='Description'
								value={summary}
								id='education'
								name='summary'
								onChange={handleChange}
								ref={richEdit}
								></RichEdit>
						</Grid>
						<Grid item xs={12} md={6}>
							<SearchList height={460} onItemSelected={handleSearchItemSelected} resource='education-suggestions' />
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ marginTop: 32 }}>
						<Grid container justify='space-between'>
							<Grid xs={12} md={2} item>
								<Button
									component={Link}
									to='/work-history'
									variant='contained'
									color='default'
									fullWidth
								>
									Back
								</Button>
							</Grid>
							<Grid xs={12} md={3} item>
								<Button variant='contained' color='default' onClick={handleAddEducation}
                           disabled={fetching} fullWidth>
									<AddOutlined />
									Add education
								</Button>
							</Grid>
							<Grid xs={12} md={2} item>
								<CustomButton component={Link} to='/skills'>
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

EducationChild.propTypes = {};

export default EducationChild;
