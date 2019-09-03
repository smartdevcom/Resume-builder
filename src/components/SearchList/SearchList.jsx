import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, InputAdornment, CircularProgress, TextField, makeStyles, Grid, Box, Typography, Paper, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { AddOutlined } from '@material-ui/icons';
import { teal } from '@material-ui/core/colors';
import { searchListStyle } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { API_CALL_GET, API_CALL_CHANGE } from '../../constants';


const SearchList = props => {

    const classes = searchListStyle();
	const dispatch = useDispatch();
	const query = useSelector(state => state);
    const { fetching, server_data, error } = query;
    const { resource, onItemSelected } = props;

    const label = props.label !== undefined ? props.label : 'Search specific word';

    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [state, setState] = useState('search');
    const [apiCallTimeout, setApiCallTimeout] = useState();
    
    useEffect(() => {
        if(server_data[resource])
            setSearchResult(server_data[resource]);
    }, [server_data]);
    
    useEffect(() => {
        setState(fetching ? 'loading': 'search');
	}, [fetching]);

    const handleClickSearch = () => {
        performSearch(searchText);
    };

    const handleChange = event => {
        let text = event.target.value;
        setSearchText(text);
        deferApiCall(text);
    };

    const performSearch = text => {
        if(text){
            setState('loading');
            dispatch({
                type: API_CALL_GET,
                payload: { resource: resource, params: { q: text } }
            });
        }
    };

    const deferApiCall = (text) => {
		if(apiCallTimeout)
			clearTimeout(apiCallTimeout);
        let tout = setTimeout(() => { 
                performSearch(text);
            }, 500);
		setApiCallTimeout(tout);
    };
    
    const handleItemSelected = item => {
        if(onItemSelected && onItemSelected instanceof Function)
            onItemSelected(item);
    }

    return (
        <Box className={classes.container} borderRadius={6} p={2}>
            <TextField
                label={label}
                placeholder={props.placeholder}
                fullWidth
                InputProps={{
                    endAdornment: state && (
						<InputAdornment position='end'>
							{state === 'loading' ? (
								<CircularProgress className={classes.loading} size={25} />
							) :  (
                                <IconButton onClick={handleClickSearch}>
                                    <SearchIcon />
                                </IconButton>
							)}
						</InputAdornment>
					)
                }}
                type='text'
                onChange={handleChange}
                value={searchText}
            />
            <Box overflow='auto' className={classes.resultContainer} height={props.height - 56} >
                {
                    searchResult.map(item => (
                        <Paper key={item.id} className={classes.panel} >
                            <IconButton className={classes.addIcon} onClick={ () => handleItemSelected(item) }>
                                <AddOutlined />
                            </IconButton>
                            <Typography variant='caption'>
                                { item.description }
                            </Typography>
                        </Paper>
                    ))
                }
            </Box>
        </Box>
    );
};
export default SearchList;