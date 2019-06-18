const RetCode = {
	SUCCESS: 1000,
	//大于1000的都是错误码
	PASSWORD_ERROR: 1001,  //密码错误
	REDIS_ERROR:1002,      //从REDIS获取数据失败
	NULL_INFO_ERROR:1003,  //帐号或密码为空
}
exports.RetCode = RetCode;

const ROUTE_PATHS = {
	USER: "/user",
	PAGE: "/page",
	API : "/dev-api",
}

exports.ROUTE_PATHS = ROUTE_PATHS;

