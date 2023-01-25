    const AppError = require('./error-handler');
    const {StatusCodes} = require('http-status-codes');
    class validationError extends AppError{
        constructor(error){
            let explanation = [];
            let errorName =error.name;
            error.errors.forEach((element)  => {
                explanation.push(element.message);
            });
            super(
                errorName,  
                'NOT able to validate the data sent in the requrest',
                explanation,
                StatusCodes.BAD_REQUEST
            )
        }
    }
    module.exports = validationError;