const moment=require('moment');
function formatMessage(username,txt){

    return {
        username,
        txt,
        time:moment().utcOffset("+05:30").format('h:mm:a')
    }
}
module.exports=formatMessage
