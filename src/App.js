import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Hook from './components/hook';

// import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();
	const query = useSelector(state => state);
	const { fetching, dog, onRequestDog, error } = query;
	const handleClick = e => dispatch({ type: 'API_CALL_REQUEST' });
	return (
		<div className='App'>
			{/* <Hook /> */}
			<header className='App-header'>
				<img src={dog || logo} className='App-logo' alt='logo' />
				<h1 className='App-title'>Welcome to Dog Saga</h1>
			</header>

			{dog ? (
				<p className='App-intro'>Keep clicking for new dogs</p>
			) : (
				<p className='App-intro'>Replace the React icon with a dog!</p>
			)}

			{fetching ? <button disabled>Fetching...</button> : <button onClick={handleClick}>Request a Dog</button>}

			{error && <p style={{ color: 'red' }}>Uh oh - something went wrong!</p>}
		</div>
	);
};

// const App = () => {
// 	const dispatch = useDispatch();
// 	const query = useSelector(state => state.query);
// 	const handleSubmit = e => {
// 		e.preventDefault();
// 		dispatch({ type: 'NEW_SEARCH', payload: query });
// 	};
// 	const handleChange = e => dispatch({ type: 'UPDATE_QUERY', payload: e.target.value });

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<input name='search' value={query} onChange={handleChange} />
// 		</form>
// 	);
// };

// const mapStateToProps = state => {
// 	return {
// 		fetching: state.fetching,
// 		dog: state.dog,
// 		error: state.error
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onRequestDog: () => dispatch({ type: 'API_CALL_REQUEST' })
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(App);

export default App;
