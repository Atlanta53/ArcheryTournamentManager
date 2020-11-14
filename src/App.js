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

import React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import './App.css';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {Select} from "@material-ui/core";


import {Window} from "./Front-end/window"


const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

/*
 *  Description : Function that display the login page and registered page
 *  Entry : Nothing
 *  Exit : The login page
 */
export default function App() {

    // State for the darktheme
    const [darkState, setDarkState] = React.useState(true);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,

            primary: {
                main: palletType === 'dark' ? '#339BFF' : "#339BFF",
                contrastText: '#fff',
            },
            secondary: {
                main: palletType === 'dark' ? '#339BFF' : "#339BFF",
                contrastText: '#fff',
            },

            background: {
                default: palletType === 'dark' ? "#2B2A2A" : "white",
                paper: palletType === 'dark' ? "#323131" : "#F9F7F7",
            },
        }
    });

    /*const handleThemeChange = () => {
        setDarkState(!darkState);
    };*/

    const classes = useStyles();
    //const theme = useTheme();

    // States of the login page and registered page
    const [login, setLogin] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [club, setClub] = React.useState(Array);

    /*
     *  Description : Function that set the state of login to true or false
     *  Entry : Nothing
     *  Exit : The state updated
     */
    const onClickLogin = () => {
        setLogin(true);
    };
    const onClickDisconnect = () => {
        setLogin(false);
        setRegister(false);
        setValues({...values, 'password': ''});
    };

    /*
     *  Description : Function that set the state of the club's array for register
     *  Entry : The data
     *  Exit : The state updated
     */
    const onClub = (data) => {
        setClub(data);
    };

    /*
     *  Description : Function that set the state of register to true or false
     *  Entry : Nothing
     *  Exit : The state updated
     */
    const onClickRegister = () => {
        if (register === false)
        {
            getClub();
            setRegister(true);
            setValues({...values, 'password': ' '});
        }
        else
            setRegister(false);
    };

    // State for the value of the form
    const [values, setValues] = React.useState({
        licence: '',
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        name: '',
        firstname: '',
        ID_club: 1,
        club: [],
    });

    /*
     *  Description : Function that update the form of the login and register page
     *  Entry : The props or event
     *  Exit : The state updated
     */
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /*
     *  Description : Function that call to verify the information of the login page
     *  Entry : Nothing
     *  Exit : The main page or not in function of the result
     */
    const getLogin = () => {
        axios.get('http://localhost:3100/login', {
            params: {
                licence: values.licence,
                password: values.password,
            },
        }).then((response) => {
            if (response.data === true)
                onClickLogin();
        });
    }

    /*
     *  Description : Function that create a new user in the database
     *  Entry : Nothing
     *  Exit : The database updated
     */
    const postRegister = () => {
        axios.get('http://localhost:3100/register', {
            params: {
                licence: values.licence,
                name: values.name,
                firstname: values.firstname,
                ID_club: values.ID_club,
                password: values.password,
            },
        }).then((response) => {
            if (response.data === true)
                onClickLogin();
        });
    }

    /*
     *  Description : Function that call with axios the server and fill the Array club
     *  Entry : The props index
     *  Exit : The state club completed
     */
    const getClub = () => {
        axios.get('http://localhost:3100/selectallclub', {
            params: {
            },
        }).then((response) => {
            onClub(response.data);
        });
    }

    /*
     *  Description : Function that list the item in the club select
     *  Entry : Nothing
     *  Exit : The corresponding lines
     */
    const renderClubData = () => {
        return club.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.clubname}</MenuItem>);
        })
    }

    /*
     *  Description : Method that show the array club
     *  Entry : Nothing
     *  Exit : The club's select
     */
    const showSelectClub = () => {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Club</InputLabel>
                    <Select
                        value={values.ID_club}
                        onChange={handleChange('ID_club')}
                    >
                        {renderClubData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }

    if (login === true)
    {
        return (
            <ThemeProvider theme={darkTheme}>
                <Window licence={values.licence}  onClick={onClickDisconnect}/>
            </ThemeProvider>
            );
    }
    else {
        if (register === true) {
            return (
                <ThemeProvider theme={darkTheme}>
                <div id='window' style={{backgroundImage: 'url(./wallpaper_elsina.jpg)'}}>
                    <div id='login'>
                        <Card className={classes.root} id='paper' elevation={20}>
                            <CardContent id='paper'>
                                <h1>Création de compte</h1>
                                <FormControl variant="outlined" id="select" style={{width: 50}}>
                                    <TextField
                                        label="Licence"
                                        variant="outlined"
                                        onChange={handleChange('licence')}
                                    />
                                </FormControl>

                                <FormControl variant="outlined" id="select" style={{width: 50}}>
                                    <TextField
                                        label="Nom"
                                        variant="outlined"
                                        onChange={handleChange('name')}
                                    />
                                </FormControl>

                                <FormControl variant="outlined" id="select" style={{width: 50}}>
                                    <TextField
                                        label="Prénom"
                                        variant="outlined"
                                        onChange={handleChange('firstname')}
                                    />
                                </FormControl>

                                {showSelectClub()}

                                <FormControl style={{width: 200}} id='select' variant="outlined">
                                    <OutlinedInput
                                        label="Mot de passe"
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button color="primary" size="small" onClick={onClickRegister}>Annuler</Button>
                                <Button color="primary" size="small" onClick={postRegister}>Se connecter</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
                </ThemeProvider>
            );
        }
        else {
            return (
                <ThemeProvider theme={darkTheme}>
                <div >
                    <div id='login' style={{backgroundImage: 'url(./wallpaper_elsina.jpg)'}}>
                        <Card className={classes.root} id='paper' elevation={20}>
                            <CardContent id='paper'>
                                <h1>Connexion</h1>
                                <FormControl variant="outlined" id="select" style={{width: 50}}>
                                    <TextField
                                        label="Licence"
                                        variant="outlined"
                                        onChange={handleChange('licence')}
                                    />
                                </FormControl>

                                <FormControl style={{width: 200, marginTop: 10}} variant="outlined" id='select'>
                                    <InputLabel   htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button color="primary" size="small" onClick={onClickRegister}>S'enregistrer</Button>
                                <Button color="primary" size="small" onClick={getLogin}>Se connecter</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
        </ThemeProvider>
            );
        }
    }
}
