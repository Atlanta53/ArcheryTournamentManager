const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
let crypto = require('crypto');

const app = express();


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cd53",
});

app.use(cors());



let genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};

let sha512 = function(password, salt){
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    let salt = genRandomString(16);
    let passwordData = sha512(userpassword, salt);
    /*console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);*/

    return [{sel: passwordData.salt, hash: passwordData.passwordHash}];
}


app.get('/login', (req, res) => {
    const { licence } = req.query;
    const { password } = req.query;

    pool.query(`select sel, hash from user where licence = ?`, [licence], (err, results) => {
        if (err) {
            return res.send(false);
        } else {

            if (results.length > 0)
            {
                let passwordData = sha512(password, results[0].sel);

                if (passwordData.passwordHash === results[0].hash)
                    return res.send(true);
                else
                    return res.send(false);
            } else
                return res.send(false);
        }
    });
});
app.get('/register', (req, res) => {
    const { licence } = req.query;
    const { name } = req.query;
    const { firstname } = req.query;
    const { ID_club } = req.query;
    const { password } = req.query;

    let data = saltHashPassword(password);
    let values = [name, firstname, licence, ID_club, data[0].sel, data[0].hash];

    pool.query(`insert into user (name, firstname, licence, ID_club, sel, hash) values (?) `,
    [values], (err, results) => {
        if (!err) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    });
});



app.get('/selectuser', (req, res) => {
    const { licence } = req.query;

    pool.query(`select ID_user, name, firstname, ID_club, admin, licence from user where licence = ?`, [licence], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectoneuser', (req, res) => {
    const { ID_user } = req.query;

    pool.query(`select * from user where ID_user = ? order by ID_user asc`,
    [ID_user] ,(err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

app.get('/selectallcompetition', (req, res) => {

    pool.query(`select competition.ID_competition, competition.date_begin, competition.date_end, competition.date_end_inscription,
            type.typename,  club.clubname, competition.nb_depart, competition.path_pdf
        from competition
            inner join club on competition.ID_club = club.ID_club
            inner join type on competition.ID_type = type.ID_type 
        order by ID_competition asc`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectallclub', (req, res) => {

    pool.query(`select * from club order by ID_club asc`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectallweapon', (req, res) => {

    pool.query(`select * from weapon order by ID_weapon asc`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectallcategory', (req, res) => {

    pool.query(`select * from category order by ID_category asc`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectalltype', (req, res) => {

    pool.query(`select * from type order by ID_type asc`, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

app.get('/selectcompetitionclub', (req, res) => {
    const { ID } = req.query;

    pool.query(`select distinct competition.ID_competition, competition.date_begin, competition.date_end,
                competition.date_end_inscription, type.typename, club.clubname,
                competition.nb_depart
    from competition
        inner join club on competition.ID_club = club.ID_club
        inner join type on competition.ID_type = type.ID_type
        
        where competition.ID_club = ?
            order by competition.ID_competition asc`,

        [ID], (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
    });
});
app.get('/selectcompetitionarcher', (req, res) => {
    const { ID } = req.query;

    pool.query(`select distinct competition.ID_competition, competition.date_begin, competition.date_end,
                competition.date_end_inscription, type.typename, club.clubname,
                competition.nb_depart
    from competition
        inner join inscription on competition.ID_competition = inscription.ID_competition
        inner join club on competition.ID_club = club.ID_club
        inner join type on competition.ID_type = type.ID_type
        
        where inscription.ID_user = ?
            order by competition.ID_competition asc`,

        [ID], (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
    });
});
app.get('/selectinscriptionclubself', (req, res) => {
    const { ID_competition } = req.query;
    const { ID_club } = req.query;

    pool.query(`select inscription.ID_inscription, user.name, user.firstname, user.licence,
            inscription.ID_depart, weapon.weaponname, category.categoryname
    from inscription
        inner join category on inscription.ID_category = category.ID_category
        inner join weapon on inscription.ID_weapon = weapon.ID_weapon
        inner join user on inscription.ID_user = user.ID_user
        
        where inscription.ID_competition = ? and user.ID_club = ?
            order by inscription.ID_depart, inscription.ID_category, inscription.ID_weapon asc`,
    [ID_competition, ID_club],(err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectinscriptionclub', (req, res) => {
    const { ID_competition } = req.query;

    pool.query(`select inscription.ID_inscription, user.name, user.firstname, user.licence,
           inscription.ID_depart, weapon.weaponname, category.categoryname, club.clubname
    from inscription
            inner join category on inscription.ID_category = category.ID_category
            inner join weapon on inscription.ID_weapon = weapon.ID_weapon
            inner join user on inscription.ID_user = user.ID_user
            inner join club on user.ID_club = club.ID_club
    
            where inscription.ID_competition = ?
                order by inscription.ID_depart, inscription.ID_category, inscription.ID_weapon asc`,
        [ID_competition],(err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        });
});
app.get('/selectinscriptionarcher', (req, res) => {
    const { ID_competition } = req.query;
    const { ID_user } = req.query;

    pool.query(`select inscription.ID_inscription, user.name, user.firstname, user.licence,
            inscription.ID_depart, weapon.weaponname, category.categoryname
    from inscription
        inner join category on inscription.ID_category = category.ID_category
        inner join weapon on inscription.ID_weapon = weapon.ID_weapon
        inner join user on inscription.ID_user = user.ID_user
        
        where inscription.ID_competition = ? and user.ID_user = ?
            order by inscription.ID_depart, inscription.ID_category, inscription.ID_weapon asc`,
    [ID_competition, ID_user],(err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/selectuserclub', (req, res) => {
    const { ID_club } = req.query;

    pool.query(`select name, firstname, licence, ID_user from user where ID_club = ? order by name, firstname asc`,
    [ID_club], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});





app.get('/insertcompetition', (req, res) => {
    const {date_begin} = req.query;
    const { date_end } = req.query;
    const { date_end_inscription } = req.query;
    const { ID_type } = req.query;
    const { ID_club } = req.query;
    const { nb_depart } = req.query;
    const path_pdf  = null;

    var values = [date_begin, date_end, date_end_inscription, ID_type, ID_club, nb_depart, path_pdf];

    pool.query(`insert into competition (date_begin, date_end, date_end_inscription, ID_type, ID_club, nb_depart, path_pdf) values (?)`,
        [values], (err) => {
        if (err) {
            return res.send(false);
        } else {
            return res.send(true);
        }
    });
});
app.get('/insertinscription', (req, res) => {
    const { ID_competition } = req.query;
    const { ID_user } = req.query;
    const { ID_depart } = req.query;
    const { ID_weapon } = req.query;
    const { ID_category } = req.query;

    let values = [ID_competition, ID_user, ID_depart, ID_weapon, ID_category];

    pool.query(`insert into inscription (ID_competition, ID_user, ID_depart, ID_weapon, ID_category) 
                            values (?)`,
        [values], (err) => {
        if (err) {
            return res.send(false);
        } else {
            return res.send(true);
        }
    });
});




app.get('/deleteinscription', (req, res) => {
    const { ID_inscription } = req.query;

    pool.query(`delete from inscription where ID_inscription = ?`, [ID_inscription], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/deletecompetition', (req, res) => {
    const { ID_competition } = req.query;

    pool.query(`delete from competition where ID_competition = ?`, [ID_competition], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/deleteuser', (req, res) => {
    const { ID_user } = req.query;

    pool.query(`delete from user where ID_user = ?`, [ID_user], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/deleteinscriptionuser', (req, res) => {
    const { ID_user } = req.query;

    pool.query(`delete from inscription where ID_user = ?`, [ID_user],

    (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/deleteinscriptioncompetition', (req, res) => {
    const { ID_competition } = req.query;

    pool.query(`delete from inscription where ID_competition = ?`, [ID_competition],

    (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});




app.get('/updatecompetition', (req, res) => {
    const { ID_competition } = req.query;
    const { date_end_inscription } = req.query;

    pool.query(`update competition set date_end_inscription = ? where ID_competition = ?`,

    [date_end_inscription, ID_competition], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/updateinscription', (req, res) => {
    const { ID_inscription } = req.query;
    const { ID_depart } = req.query;
    const { ID_weapon } = req.query;
    const { ID_category } = req.query;

    pool.query(`update inscription set ID_depart = ?, ID_weapon = ?, ID_category = ? where ID_inscription = ?`,

    [ID_depart, ID_weapon, ID_category, ID_inscription],(err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/updateuser', (req, res) => {
    const { ID_user } = req.query;
    const { name } = req.query;
    const { firstname } = req.query;
    const { licence } = req.query;
    const { ID_club } = req.query;

    pool.query(`update user set name = ?, firstname = ?, licence = ? , ID_club = ? where ID_user = ?`,

    [name, firstname, licence, ID_club, ID_user], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/updateclub', (req, res) => {
    const { ID_user } = req.query;
    const { ID_club } = req.query;

    pool.query(`update user set ID_club = ?, admin = 0 where ID_user = ?`,

    [ID_club, ID_user], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});
app.get('/updatepassword', (req, res) => {
    const { ID_user } = req.query;
    const { new_password } = req.query;

    let data = saltHashPassword(new_password);

    pool.query(`update user set sel = ?, hash = ? where ID_user = ?`,

    [data[0].sel, data[0].hash, ID_user], (err) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(true);
        }
    });
});





app.listen(3100, () => {
    console.log(`App server now listening on port ${3100}`);
});
