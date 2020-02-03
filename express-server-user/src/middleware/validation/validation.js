const validation = function(validModule) {
	return async (req, res, next) => {
		try {
			const result = await validModule.validateAsync(req.body);
			if (!result) {
				throw new Error();
			}
			next();
		} catch (e) {
			res.status(400).send({
				error: 'Please enter correct information to validate',
			});
		}
	};
};
module.exports = validation;
