const RetCode = {
	SUCCESS: 1000,
	//大于1000的都是错误码
	PASSWORD_ERROR: 1001,  //密码错误
	REDIS_ERROR:1002,      //从REDIS获取数据失败
	NULL_INFO_ERROR:1003,  //帐号或密码为空
	LOGOUT_ERROR:1004,     //注销失败
	NOT_FOUND_TOKEN: -1112 , //只能执行一次注销,
	UNKNOWN_ERROR:-11112 ,   //TOKEN解析失败
	USER_EXIST:1005,         //添加的用户已存在
	USER_INEXISTENCE:1006,    //用户不存在
	SQL_ERROR:1007 ,         //数据库查询失败
	ERROR_USERID:1008 ,      //数据库里没有这个用户
}
exports.RetCode = RetCode;

const ROUTE_PATHS = {
	USER: "/admin",
	PAGE: "/page",
	API : "/dev-api",
	ADMIN:"/admin",
	STUDENT:'/student'
}

exports.ROUTE_PATHS = ROUTE_PATHS;

