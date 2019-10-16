exports.errorSet = (req, res, nex) => {
    const error = new Error('Not Found');
    error.status = 404;
    nex(error);
};

exports.errorHandle = (error, req, res, next)=> {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
};
