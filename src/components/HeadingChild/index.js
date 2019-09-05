/**
 *
 * HeadingChild
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Paper, Grid, Box, Typography, Button, Fab, Tooltip, CircularProgress } from '@material-ui/core';
import { Person, CloudUpload, Delete, FindReplace } from '@material-ui/icons';
import { headingChildStyles } from './style';
import CustomInput from '../Input';
import CustomButton from '../Button';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

function HeadingChild() {
   const classes = headingChildStyles();
   const dispatch = useDispatch();
   const query = useSelector(state => state);
   const { fetching, server_data, error } = query;

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [website, setWebsite] = useState('');
   const [street, setStreet] = useState('');
   const [stateProvince, setStateProvince] = useState('');
   const [city, setCity] = useState('');
   const [country, setCountry] = useState('');
   const [jobTitle, setJobTitle] = useState('');
   const [zipcode, setZipcode] = useState('');
   const [flagInput, setFlagInput] = useState('');
   const [thumbnail, setThumbnail] = useState('');

   const [firstNameLoading, setFirstNameLoading] = useState('success');
   const [lastNameLoading, setLastNameLoading] = useState('success');
   const [emailLoading, setEmailLoading] = useState('success');
   const [phoneLoading, setPhoneLoading] = useState('success');
   const [websiteLoading, setWebsiteLoading] = useState('success');
   const [streetLoading, setStreetLoading] = useState('success');
   const [stateProvinceLoading, setStateProvinceLoading] = useState('success');
   const [cityLoading, setCityLoading] = useState('success');
   const [countryLoading, setCountryLoading] = useState('success');
   const [jobTitleLoading, setJobTitleLoading] = useState('success');
   const [zipcodeLoading, setZipcodeLoading] = useState('success');
   const [loadingThumbnail, setLoadingThumbnail] = useState(true);

   const [updateTimeouts, setUpdateTimeouts] = useState({});

   function handleImageChange(e) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setLoadingThumbnail(true);

      reader.onload = () => {
         Axios.patch(
            'https://hqmm4lfjf0.execute-api.eu-central-1.amazonaws.com/dev/image-server',
            { url: reader.result },
            { headers: { 'x-api-key': 'isUSOmXcOF54H2Syvk83B73ryInlXjdW8HBFsqvn' } }
         )
            .then(res => {
               Axios.patch(
                  'https://hqmm4lfjf0.execute-api.eu-central-1.amazonaws.com/dev/profile',
                  { thumbnail: res.data.url },
                  {
                     headers: {
                        'x-api-key': 'isUSOmXcOF54H2Syvk83B73ryInlXjdW8HBFsqvn'
                     }
                  }
               )
                  .then(res => {
                     setThumbnail(reader.result);
                     setLoadingThumbnail(false);
                  })
                  .catch(err => {
                     setLoadingThumbnail(false);
                  });
            })
            .catch(err => {
               setLoadingThumbnail(false);
            });
      };
   }
   useEffect(() => {
      setFirstName(server_data.profile.firstName);
      setLastName(server_data.profile.lastName);
      setEmail(server_data.profile.email);
      setPhone(server_data.profile.phone);
      setWebsite(server_data.profile.website);
      setCountry(server_data.profile.country);
      setStreet(server_data.address.street);
      setStateProvince(server_data.address.stateProvince);
      setCity(server_data.address.city);
      setJobTitle(server_data.profile.jobTitle);
      setZipcode(server_data.address.zipcode);
      setThumbnail(server_data.profile.thumbnail || '');
      setLoadingThumbnail(false);
   }, [server_data]);

   useEffect(() => {
      if (fetching) {
         switch (flagInput) {
            case 'firstName':
               setFirstNameLoading('loading');
               break;
            case 'lastName':
               setLastNameLoading('loading');
               break;
            case 'email':
               setEmailLoading('loading');
               break;
            case 'phone':
               setPhoneLoading('loading');
               break;
            case 'website':
               setWebsiteLoading('loading');
               break;
            case 'street':
               setStreetLoading('loading');
               break;
            case 'stateProvince':
               setStateProvinceLoading('loading');
               break;
            case 'city':
               setCityLoading('loading');
               break;
            case 'country':
               setCountryLoading('loading');
               break;
            case 'jobTitle':
               setJobTitleLoading('loading');
               break;
            case 'zipcode':
               setZipcodeLoading('loading');
               break;
            default:
               break;
         }
      } else {
         switch (flagInput) {
            case 'firstName':
               setFirstNameLoading('success');
               break;
            case 'lastName':
               setLastNameLoading('success');
               break;
            case 'email':
               setEmailLoading('success');
               break;
            case 'phone':
               setPhoneLoading('success');
               break;
            case 'website':
               setWebsiteLoading('success');
               break;
            case 'street':
               setStreetLoading('success');
               break;
            case 'stateProvince':
               setStateProvinceLoading('success');
               break;
            case 'city':
               setCityLoading('success');
               break;
            case 'country':
               setCountryLoading('success');
               break;
            case 'jobTitle':
               setJobTitleLoading('success');
               break;
            case 'zipcode':
               setZipcodeLoading('success');
               break;
            default:
               break;
         }
      }
   }, [fetching]);

   const deferApiCallUpdate = (name, value) => {
      let tout = updateTimeouts[name];
      if (tout) clearTimeout(tout);
      tout = setTimeout(() => {
         setFlagInput(name);
         let data = {};
         data[name] = value;
         dispatch({
            type: 'API_CALL_UPDATE',
            payload: { field: 'profile', id: null, json: data }
         });
      }, 500);
      updateTimeouts[name] = tout;
      setUpdateTimeouts(updateTimeouts);
   };

   const handleChange = e => {
      let value = e.target.value;
      let name = e.target.name;
      let jsonValue = {
         type: 'API_CALL_CHANGE',
         field: e.target.id,
         name: e.target.name,
         value: e.target.value
      };
      dispatch(jsonValue);
      switch (e.target.name) {
         case 'firstName':
         case 'lastName':
         case 'jobTitle':
         case 'email':
         case 'phone':
         case 'website':
         case 'street':
         case 'stateProvince':
         case 'city':
         case 'country':
         case 'zipcode':
            deferApiCallUpdate(name, value);
            break;
         default:
            break;
      }
   };
   return (
      <Paper className={classes.paper} elevation={0}>
         <Grid container spacing={3}>
            <Grid item md={8}>
               <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                     <Box display='flex' alignItems='center'>
                        <Box
                           borderRadius={4}
                           bgcolor='#f7f7f7'
                           width={80}
                           height={80}
                           display='flex'
                           justifyContent='center'
                           alignItems='center'
                           mr={1}
                        >
                           {loadingThumbnail ? (
                              <Box
                                 className={classes.person}
                                 display='flex'
                                 alignItems='center'
                                 justifyContent='center'
                              >
                                 <CircularProgress />
                              </Box>
                           ) : thumbnail.length > 0 ? (
                              <img className={classes.person} src={thumbnail} />
                           ) : (
                              <Person className={classes.person} />
                           )}
                        </Box>
                        <Box minWidth={200}>
                           {!loadingThumbnail && thumbnail.length > 0 ? (
                              <>
                                 <Typography style={{ cursor: 'pointer' }} onClick={() => setThumbnail('')}>
                                    Delete Image
                                 </Typography>
                                 <input
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                    id='contained-button-file'
                                    type='file'
                                    onChange={e => handleImageChange(e)}
                                 />
                                 <label htmlFor='contained-button-file'>
                                    <Typography style={{ cursor: 'pointer' }}>Replace Image</Typography>
                                 </label>
                              </>
                           ) : (
                              <>
                                 <input
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                    id='contained-button-file'
                                    onChange={e => handleImageChange(e)}
                                    type='file'
                                 />
                                 <label htmlFor='contained-button-file'>
                                    <Typography style={{ cursor: 'pointer' }}>Upload Image</Typography>
                                 </label>
                              </>
                           )}
                        </Box>
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='Job Title'
                        placeholder='e.g. Teacher'
                        value={jobTitle}
                        state={jobTitleLoading}
                        id='profile'
                        name='jobTitle'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='First Name'
                        placeholder='e.g. Teacher'
                        value={firstName}
                        state={firstNameLoading}
                        id='profile'
                        name='firstName'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='Last Name'
                        placeholder='e.g. Teacher'
                        value={lastName}
                        state={lastNameLoading}
                        id='profile'
                        name='lastName'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <CustomInput
                        label='Street Address'
                        placeholder='e.g. Teacher'
                        value={street}
                        state={streetLoading}
                        id='address'
                        name='street'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='City'
                        placeholder='e.g. Teacher'
                        value={city}
                        state={cityLoading}
                        id='address'
                        name='city'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={3}>
                     <CustomInput
                        label='State/Province'
                        placeholder='e.g. Teacher'
                        value={stateProvince}
                        state={stateProvinceLoading}
                        id='address'
                        name='stateProvince'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={3}>
                     <CustomInput
                        label='ZIP Code'
                        placeholder='e.g. Teacher'
                        value={zipcode}
                        state={zipcodeLoading}
                        id='address'
                        name='zipcode'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='Country'
                        placeholder='e.g. USA'
                        value={country}
                        state={countryLoading}
                        id='profile'
                        name='country'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='Phone'
                        placeholder='e.g. Teacher'
                        value={phone}
                        state={phoneLoading}
                        id='profile'
                        name='phone'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='Email'
                        placeholder='e.g. Teacher'
                        value={email}
                        state={emailLoading}
                        id='profile'
                        name='email'
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <CustomInput
                        label='Website'
                        placeholder='e.g. Teacher'
                        value={website}
                        state={websiteLoading}
                        id='profile'
                        name='website'
                        onChange={handleChange}
                     />
                  </Grid>

                  <Grid item xs={12} style={{ marginTop: 32 }}>
                     <Grid container justify='space-between'>
                        <Grid xs={12} md={2} item>
                           <Button variant='contained' color='default' fullWidth disabled>
                              Back
                           </Button>
                        </Grid>

                        <Grid xs={12} md={2} item>
                           <CustomButton component={Link} to='/work-history'>
                              Next step
                           </CustomButton>
                        </Grid>
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

HeadingChild.propTypes = {};

export default memo(HeadingChild);
