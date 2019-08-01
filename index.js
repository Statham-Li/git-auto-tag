'use strict';

const chalk = require('chalk')
const exec = require('child_process').execSync
const moment = require('moment')
const tag_stamp = moment(new Date()).format('YYMMDD');
const cmd_tag = "git tag"
let tagArr = []
let thisTag = null

function resTag(){
    return exec(cmd_tag, {encoding:'utf8'})
}
function createAndPushTag(version_num){
    let cmd_create_tag = `git tag v_${tag_stamp}${version_num}`
    let cmd_push_tag = `git push origin v_${tag_stamp}${version_num}`
    exec(cmd_create_tag, {encoding:'utf8'})
    exec(cmd_push_tag, {encoding:'utf8'})
    console.log(chalk.green(`v_${tag_stamp}${version_num}`))
}
let allTags = resTag()
const arr = allTags.split('\n')
arr.map(item => {
    if(item.slice(8)!=''){
        tagArr.push(item.slice(8))
    }
})
if((+tagArr[tagArr.length-1])< 9){
    thisTag = '0'+ (+tagArr[tagArr.length-1]+1).toString()
}else {
    thisTag = (+tagArr[tagArr.length-1]+1).toString()
}
createAndPushTag(thisTag)


