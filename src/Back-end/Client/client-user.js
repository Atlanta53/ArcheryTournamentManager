/**
 * Copyright (c) 2020  Korantin Bordeau--Aubert.
 * All Rights Reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

let axios = require('axios');


/******************************************************/
/******************************************************/
/**************      SELECT PART     ******************/
/******************************************************/
/******************************************************/

/*
 *  Description : Function that call with axios the server and fill the Array user
 *  Entry : licence and the props update that call a setState
 *  Exit : The state user completed
 */
let getUser = function(licence, update) {

    axios.get('http://localhost:3100/selectuser', {
        params: {
            licence: licence,
        },
    }).then((response) => {
        update(response.data);
    });
}


/*
 *  Description : Function that call with axios the server and fill the Array user
 *  Entry : ID_club and the props update that call a setState
 *  Exit : The state user completed
 */
let getUserClub = function(ID_club, update) {
    axios.get('http://localhost:3100/selectuserclub', {
        params: {
            ID_club: ID_club,
        },
    }).then((response) => {
        update(response.data);
    });
}


exports.getUser = getUser;
exports.getUserClub = getUserClub;


/******************************************************/
/******************************************************/
/**************      UPDATE PART     ******************/
/******************************************************/
/******************************************************/


/*
 *  Description : Function that update the user's information
 *  Entry : param (ID_user, name, firstname, licence, ID_club), the props update and update_index that call a setState
 *  Exit : The database updated
 */
let updateUser = function(param, update, update_licence) {

    axios.get('http://localhost:3100/updateuser', {
        params: {
            ID_user: param.ID_user,
            name: param.name,
            firstname: param.firstname,
            licence: param.licence,
            ID_club: param.ID_club,
        },
    }).then(() => {
        update_licence();
        update();
    });
}

/*
 *  Description : Function that update the user's password
 *  Entry : param (licence, prev_password, ID_user, new_password)
 *  Exit : The database updated
 */
let updatePassword = function(param) {

    axios.get('http://localhost:3100/login', {
        params: {
            licence: param.licence,
            password: param.prev_password,
        },
    }).then((response) => {
        if (response.data === true)
        {
            axios.get('http://localhost:3100/updatepassword', {
                params: {
                    ID_user: param.ID_user,
                    new_password: param.new_password,
                },
            });
        }
    });
}


/*
 *  Description : Function that update the club of an user
 *  Entry : param (ID_user, ID_club), the props update that call a setState
 *  Exit : The database updated
 */
let updateClub = function(param, update) {

    axios.get('http://localhost:3100/updateclub', {
        params: {
            ID_user: param.ID_user,
            ID_club: param.ID_club,
        },
    }).then(() => {
        update();
    });
}


exports.updateUser = updateUser;
exports.updatePassword = updatePassword;
exports.updateClub = updateClub;


/******************************************************/
/******************************************************/
/**************      DELETE PART     ******************/
/******************************************************/
/******************************************************/



/*
 *  Description : Function that delete an user
 *  Entry : ID_user, the props update that call a setState
 *  Exit : The database updated
 */
let deleteUser = function(ID_user, update) {

    axios.get('http://localhost:3100/deleteinscriptionuser', {
        params: {
            ID_user: ID_user,
        },
    }).then(() => {
        axios.get('http://localhost:3100/deleteuser', {
            params: {
                ID_user: ID_user,
            },
        }).then(() => {
            update();
        });
    });
}


exports.deleteUser = deleteUser;
