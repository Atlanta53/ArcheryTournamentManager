let axios = require('axios');


/******************************************************/
/******************************************************/
/**************      SELECT PART     ******************/
/******************************************************/
/******************************************************/

/*
 *  Description : Function that call with axios the server and fill the Array inscription
 *  Entry : ID_competition and the props update that call a setState
 *  Exit : The state inscription completed
 */
let getListInscriptionClub = function(ID_competition, update) {

    axios.get('http://localhost:3100/selectinscriptionclub', {
        params: {
            ID_competition: ID_competition,
        },
    }).then((response) => {
        update(response.data);
    });
}


/*
 *  Description : Function that get the inscription's list and fill the Array competition
 *  Entry : param (index and ID_club) and the props update that call a setState
 *  Exit : The inscription's list filled
 */
let getListInscriptionClubSelf = function(param, update) {

    axios.get('http://localhost:3100/selectinscriptionclubself', {
        params: {
            ID_competition: param.index,
            ID_club: param.ID_club,
        },
    }).then((response) => {
        update(response.data);
    });
}


/*
 *  Description : Method that call with axios the server and fill the Array inscription
 *  Entry : param (ID_competition, ID_user) and the props update that call a setState
 *  Exit : The state inscription completed
 */
let getListInscriptionArcher = function(param, update) {

    axios.get('http://localhost:3100/selectinscriptionarcher', {
        params: {
            ID_competition: param.ID_competition,
            ID_user: param.ID_user,
        },
    }).then((response) => {
        update(response.data);
    });
}


/*
 *  Description : Function that get the category list and filled the array category
 *  Entry : The props update that call a setState
 *  Exit : The array category filled
 */
let getCategory = function(update) {
    axios.get('http://localhost:3100/selectallcategory', {
        params: {
            table: 'category',
        },
    }).then((response) => {
        update(response.data);
    });
}


/*
 *  Description : Function that get the weapon list and filled the array weapon
 *  Entry : The props update that call a setState
 *  Exit : The array weapon filled
 */
let getWeapon = function(update) {
    axios.get('http://localhost:3100/selectallweapon', {
        params: {
            table: 'weapon',
        },
    }).then((response) => {
        update(response.data);
    });
}


exports.getListInscriptionClub = getListInscriptionClub;
exports.getListInscriptionClubSelf = getListInscriptionClubSelf;
exports.getListInscriptionArcher = getListInscriptionArcher;
exports.getCategory = getCategory;
exports.getWeapon = getWeapon;


/******************************************************/
/******************************************************/
/**************      INSERT PART     ******************/
/******************************************************/
/******************************************************/

/*
 *  Description : Function that insert a new inscription
 *  Entry : param (ID_competition, ID_user, ID_depart, ID_weapon, ID_category) and dialog error to show the good dialog
 *  Exit : The database updated
 */
let newInscription = function(param, dialog_err) {

    axios.get('http://localhost:3100/insertinscription', {
        params: {
            ID_competition: param.ID_competition,
            ID_user: param.ID_user,
            ID_depart: param.ID_depart,
            ID_weapon: param.ID_weapon,
            ID_category: param.ID_category,
        },
    }).then((response) => {
            dialog_err(!response);
    });
}


exports.newInscription = newInscription;

/******************************************************/
/******************************************************/
/**************      UPDATE PART     ******************/
/******************************************************/
/******************************************************/


/*
 *  Description : Function that update the inscriptions
 *  Entry : param (ID_inscription, ID_depart, ID_weapon, ID_category), the props update that call a setState
 *  Exit : The database updated
 */
let updateInscription = function(param, update) {

    axios.get('http://localhost:3100/updateinscription', {
        params: {
            ID_inscription: param.ID_inscription,
            ID_depart: param.ID_depart,
            ID_weapon: param.ID_weapon,
            ID_category: param.ID_category,
        },
    }).then(() => {
        update();
    });
}


exports.updateInscription = updateInscription;


/******************************************************/
/******************************************************/
/**************      DELETE PART     ******************/
/******************************************************/
/******************************************************/

/*
 *  Description : Function that delete an inscription
 *  Entry : ID_inscription, the props update and update_index that call a setState
 *  Exit : The database and the inscription list updated
 */
let deleteInscription = function(ID_inscription, update, update_index) {
    axios.get('http://localhost:3100/deleteinscription', {
        params: {
            ID_inscription: ID_inscription,
        },
    }).then(() => {
        update_index(0);
        update();
    });
}


exports.deleteInscription = deleteInscription;