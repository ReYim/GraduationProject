const RetCode = {
	SUCCESS: 1000,
	//大于1000的都是错误码
	PASSWORD_ERROR: 1001,
	REDIS_ERROR:1002,
}
exports.RetCode = RetCode;

const ROUTE_PATHS = {
	PLAYER: "/player",
	PAGE: "/page",
	API : "/api",
}

exports.ROUTE_PATHS = ROUTE_PATHS;

