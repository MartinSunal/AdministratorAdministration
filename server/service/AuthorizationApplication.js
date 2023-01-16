/**
 * @file This module provides functionality to monitor the whether the registered application are approved within the required time.
 * @module MonitorTypeApprovalChannel
 **/


const fs = require('fs');
const { getFilePath } = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/FileProfile');


const profile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/FileProfile');
const { resolve } = require('path');

const administratorList = 'administrator-credential-list';
const authorizationValue ='authorization';
const allowedMethodsValue ='allowed-methods';



async function getfilepath(){
    try {  
    let FileProfileUuuidList = await profile.getFileProfileUuidsList()
    let FileProfilePath = await profile.getFilePath(FileProfileUuuidList[0])
    if (fs.existsSync(FileProfilePath)) {
        return FileProfilePath
    }
} catch(err) {
    console.error(err)
  }
}

exports.isAuthorizationExistAsync = async function (authorization) {
    return new Promise(async function (resolve, reject) {
    let isAuthorizationExist = false;           
    try {
       
                    let applicationDataFile = await getfilepath();
                    let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
                    if( applicationData[administratorList]){
                    let registeredApplicationList = applicationData[administratorList];
                    for (let i = 0; i < registeredApplicationList.length; i++) {
                        let registeredApplication = registeredApplicationList[i];
                        let _authorization =  registeredApplication [authorizationValue];
                        if (_authorization == authorization) {
                            isAuthorizationExist = true;
                        }
                    }
                }
                    resolve(isAuthorizationExist);
                } catch (error) {
                    console.log(error);
                }
            });
}


exports.isAuthorizedAsync = async function (authorization,allowedMethods) {
    return new Promise(async function (resolve, reject) {
        let isAuthorized = false;         
    try {
                    let applicationDataFile = await getfilepath();
                    let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
                    if( applicationData[administratorList]){
                    let registeredApplicationList = applicationData[administratorList];
                    for (let i = 0; i < registeredApplicationList.length; i++) {
                        let registeredApplication = registeredApplicationList[i];
                        let _authorization =  registeredApplication [authorizationValue];
                        let _allowedMethods =  registeredApplication [allowedMethodsValue];
                     if (_authorization == authorization && _allowedMethods == allowedMethods
                           ) {
                            isAuthorized = true;
                        }
                    }
                }
                    resolve(isAuthorized);
                } catch (error) {
                    console.log(error);
                }
            });
}