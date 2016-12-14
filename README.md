# Redux Action Wrapper

This is a recursive version of `bindActionCreators`. It simplifies your `mapDispatchToProps` and removes a significant amount of boilerplate by wrapping your action modules with the dispatch function. It takes an object that contains functions and returns those functions wrapped in the dispatch method. The object is traversed recursively. Non-functions are ignored.

## Basic Usage

The action wrapper is only used in the mapDispatchToProps function that you pass to redux's `connect`.

```javascript
import actionWrapper from 'redux-action-wrapper';

function mapDispatchToProps (dispatch) {
	return actionWrapper({
		userActions,
		modalActions,
		randomAction: () => ({type: 'MY_ACTION'})
	}, dispatch);
}
```

## API

Only one function is provided.

```javascript
var actions = actionWrapper(actionsObject, dispatch)
```

### Arguments

* `actionsObject` is an object, possibly nested, containing action functions.
* `dispatch` is the dispatch method provided by react-redux.

### Return Value

The actions object returned can be returned from `mapDispatchToProps` directly.

## Using it in your components

All functions on the object passed to `actionWrapper` are wrapped in the `dispatch` function provided by Redux. You access them through `this.props`.

```javascript
// for the root level
this.props.actionName();

// for nested objects
this.props.userActions.load();

// and double nested is the same
this.props.userActions.preferences.setCity('NYC');
```

## Usage with some context

```javascript
import React from 'react';
import { connect } from 'react-redux';

import * as userActions from 'path/to/userActions';
import * as modalActions from 'path/to/modalActions';

import actionWrapper from 'redux-action-wrapper';

class MyComponent extends React.Component {

	componentDidMount () {
		if (!this.props.user) {
			this.props.userActions.load(); // <---- ACTION USAGE
		}
		this.props.randomAction(); // <------------ ACTION USAGE
	}
	
	render () {
		if (this.props.user) {
			return (<span>{this.props.user.name}</span>);
		} else {
			return (<span>Loading...</span>);
		}
	}
}

function mapDispatchToProps (dispatch) {
	return actionWrapper({ // <---------- ACTION WRAPPER IS HERE
		userActions,
		modalActions,
		randomAction: () => ({type: 'MY_ACTION'})
	}, dispatch);
}

function mapStoreToProps (store) {
	return store;
}

export default connect(mapStoreToProps, mapDispatchToProps)(MyComponent);
```
