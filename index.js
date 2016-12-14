module.exports = function wrapActions (actions, dispatch) {
	if (typeof dispatch !== 'function') {
		throw new TypeError('Action wrapper needs a dispatch function');
	}
	return Object.keys(actions).reduce(function (acc, key) {
		if (typeof actions[key] === 'function') {
			acc[key] = function () {
				return dispatch(actions[key].apply(null, arguments));
			};
		} else if (actions[key] !== null && typeof actions[key] === 'object') {
			acc[key] = wrapActions(actions[key], dispatch);
		}

		return acc;
	}, {});
};
