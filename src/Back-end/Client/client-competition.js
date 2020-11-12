let axios = require('axios');


/******************************************************/
/******************************************************/
/**************     GENERAL PART     ******************/
/******************************************************/
/******************************************************/


/*
 *  Description : Function that convert the date to the format dd/mm/yyyy
 *  Entry : The date of the competition (date_begin, date_end, date_end_inscription
 *  Exit : The date formatted
 */
function convertDate(date) {

    let dt = new Date(date);
    let intl = new Intl.DateTimeFormat("fr",
        {
            hour12: false,
            day:"2-digit",
            month:"2-digit",
            year:"numeric"
        });

    return intl.format(dt);
}



/*
 *  Description : Function that convert all the date from a competition
 *  Entry : The competition
 *  Exit : The dates updated
 */
function convertDateCompetition(competition) {

    competition.map((key) => {

        key.date_begin = convertDate(key.date_begin);
        key.date_end = convertDate(key.date_end);

        let now = new Date();
        key.date_end_inscription = new Date(key.date_end_inscription);

        if (now <= key.date_end_inscription)
            key.date_end_inscription = "ouvert";
        else
            key.date_end_inscription = "fermé";
    });

    return competition;
}


/*
 *  Description : Function that convert a date to the good format for the database
 *  Entry : The date
 *  Exit : The date formatted
 */
function date2str(x, y) {
    let z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        // eslint-disable-next-line no-eval
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}


/******************************************************/
/******************************************************/
/**************   COMPETITION PART   ******************/
/******************************************************/
/******************************************************/


/*
 *  Description : Function that call with axios the server and fill the Array competition
 *  Entry : The props update that call a setState
 *  Exit : The state competition completed
 */
let getCompetition = function(update) {

    axios.get('http://localhost:3100/selectallcompetition', {
        params: {
            table: 'competition',
        },
    }).then((response) => {
        response.data = convertDateCompetition(response.data);
        update(response.data);
    });
}


/*
 *  Description : Function that call with axios the server and fill the Array club
 *  Entry : The props update that call a setState
 *  Exit : The state club completed
 */
let getClub = function(update) {
    axios.get('http://localhost:3100/selectallclub', {
        params: {
            table: 'club',
        },
    }).then((response) => {
        update(response.data);
    });
}

/*
 *  Description : Function that call with axios the server and fill the Array type
 *  Entry : The props update that call a setState
 *  Exit : The state type completed
 */
let getType = function(update) {
    axios.get('http://localhost:3100/selectalltype', {
        params: {
            table: 'type',
        },
    }).then((response) => {
        update(response.data);
    });
}



exports.getCompetition = getCompetition;
exports.getClub = getClub;
exports.getType = getType;


/******************************************************/
/******************************************************/
/**************   INSCRIPTION PART   ******************/
/******************************************************/
/******************************************************/

/*
 *  Description : Function that call with axios the server and fill the Array competition
 *  Entry : ID_club or the user, the props update that call a setState
 *  Exit : The state competition completed
 */
let getCompetitionClub = function(ID_club, update) {

    axios.get('http://localhost:3100/selectcompetitionclub', {
        params: {
            ID: ID_club,
        },
    }).then((response) => {
        response.data = convertDateCompetition(response.data);
        update(response.data);
    });
}


/*
 *  Description : Function that call with axios the server and fill the Array competition
 *  Entry : ID_user, the props update that call a setState
 *  Exit : The state competition completed
 */
let getCompetitionArcher = function(ID_user, update) {

    axios.get('http://localhost:3100/selectcompetitionarcher', {
        params: {
            ID: ID_user,
        },
    }).then((response) => {
        response.data = convertDateCompetition(response.data);
        update(response.data);
    });
}


/*
 *  Description : Function that post a new competition
 *  Entry : the param (information to create a competition), the props update that call a setState and dialog error to show the good dialog
 *  Exit : The database updated
 */
let newCompetition = function(param, update, dialog_err) {

    axios.get('http://localhost:3100/insertcompetition', {
        params: {
            date_begin: date2str(param.date_begin, 'yyyy-MM-dd'),
            date_end: date2str(param.date_end, 'yyyy-MM-dd'),
            date_end_inscription: date2str(param.date_end, 'yyyy-MM-dd'),
            ID_type: param.ID_type,
            ID_club: param.ID_club,
            nb_depart: param.nb_depart,
        },
    }).then((response) => {
        dialog_err(!response);
        update();
    });
}


/*
 *  Description : Function that update the date_end_inscription of a competition
 *  Entry : param (ID_competition and the new date of the end of inscription), the props update that call a setState
 *  Exit : The database updated
 */
let updateCompetition = function(param, update) {
    axios.get('http://localhost:3100/updatecompetition', {
        params: {
            ID_competition: param.ID_competition,
            date_end_inscription: date2str(param.date_end_inscription, 'yyyy-MM-dd'),
        },
    }).then(() => {
        update();
    });
}


/*
 *  Description : Function that delete a competition
 *  Entry : ID_competition, the props update and update_index that call a setState
 *  Exit : The database updated
 */
let deleteCompetition = function(ID_competition, update, update_index) {

    axios.get('http://localhost:3100/deleteinscriptioncompetition', {
        params: {
            ID_competition: ID_competition,
        },
    }).then(() => {
        axios.get('http://localhost:3100/deletecompetition', {
            params: {
                ID_competition: ID_competition,
            },
        }).then(() => {
            update_index(-1);
            update();
        });
    });
}

exports.getCompetitionClub = getCompetitionClub;
exports.getCompetitionArcher = getCompetitionArcher;
exports.newCompetition = newCompetition;
exports.updateCompetition = updateCompetition;
exports.deleteCompetition = deleteCompetition;