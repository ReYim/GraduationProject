const Sequelize = require('sequelize');
const MySQLManager = require('../utils/MySQLManager');

const Information = MySQLManager.define('information',{
    userId: Sequelize.INTEGER,
    username: Sequelize.STRING,
    sex:      Sequelize.INTEGER, //0 boy 1 girl
    nation:   Sequelize.STRING,
    major:    Sequelize.STRING,
    id_card:  Sequelize.STRING,
    address:  Sequelize.STRING,
    is_army:  Sequelize.INTEGER, //是否参军0否|1是|2已报名
    origin:   Sequelize.STRING,
    type:     Sequelize.INTEGER,//0内高1预科
    phone:    Sequelize.INTEGER,
    house_address: Sequelize.STRING,
    permanent_address: Sequelize.STRING,
    drop_out_history: Sequelize.STRING,
    leave_history: Sequelize.STRING,
    szzlb: Sequelize.STRING,
    change_major: Sequelize.STRING,
    xycf: Sequelize.STRING,
    job: Sequelize.STRING,
    winning_record: Sequelize.STRING,
    scfjljdj: Sequelize.STRING,
    sfbjfchjyy: Sequelize.STRING,
    sfbxxlrzdgzdx: Sequelize.STRING,
    jtsfsa: Sequelize.STRING,
    sajsmqqk: Sequelize.STRING,
    jtszpcslxfs: Sequelize.STRING,
    jtszsqjlxfs: Sequelize.STRING,
    scycrjzjlb: Sequelize.STRING,
    crjzjsfsjxx: Sequelize.STRING,
    wsjyy: Sequelize.STRING,
    zxztbx: Sequelize.STRING,
    jydw: Sequelize.STRING,
    delete_at:Sequelize.STRING,

});

module.exports = Information;