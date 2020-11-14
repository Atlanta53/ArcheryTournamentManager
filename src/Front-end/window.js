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

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import axios from "axios";
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import { TableCompetition } from './Competition/competition';
import { TableInscription } from './Inscription/inscription';
import { User } from './User/user';
import { UserClub } from './UserClub/user-club';

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
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
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
        padding: theme.spacing(0),
    },
}));

/*
 *  Description : Function that manage the window and the drawer
 *  Entry : The licence number of the archer
 *  Exit : The window with the drawer
 */
export function Window(props) {

    // State and theme for the drawer
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState(Array);

    // State for the menu
    const [competition, setCompetition] = React.useState(true);
    const [inscription, setInscription] = React.useState(false);
    const [profile, setProfile] = React.useState(false);
    const [userclub, setUserClub] = React.useState(false);

    // State for the licence of the user
    const [licence, setLicence] = React.useState(props.licence);

    /*
     *  Description : Functions that change the menu selected
     *  Entry : Nothing
     *  Exit : The states updated
     */
    const onClickCompetition = () => {
        setCompetition(true);
        setInscription(false);
        setProfile(false);
        setUserClub(false);
        handleDrawerClose();
    };
    const onClickInscription = () => {
        setCompetition(false);
        setInscription(true);
        setProfile(false);
        setUserClub(false);
        handleDrawerClose();
    };
    const onClickProfil = () => {
        setCompetition(false);
        setInscription(false);
        setProfile(true);
        setUserClub(false);
        handleDrawerClose();
    };
    const onClickUserClub = () => {
        setCompetition(false);
        setInscription(false);
        setProfile(false);
        setUserClub(true);
        handleDrawerClose();
    };

    /*
     *  Description : Functions that open or close the drawer
     *  Entry : Nothing
     *  Exit : The drawer open or close
     */
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    /*
     *  Description : Function that fill the array user with the user's information
     *  Entry : The props licence
     *  Exit : The user array updated
     */
    const getUser = () => {

        axios.get('http://localhost:3100/selectuser', {
            params: {
                licence: licence,
            },
        }).then((response) => {

            setUser(response.data);
        });
    }

    /*
     *  Description : Function that show the information of the user in the AppBar and the disconnect button
     *  Entry : Nothing
     *  Exit : The user information in the AppBar and the disconnect button
     */
    const showInfoUser = () => {
        if (user.length > 0)
        {
            return (
                <div id='toolbar' >
                    <IconButton onClick={props.onClick}>
                        <PowerSettingsNewOutlinedIcon style={{color: 'white'}} fontSize="large" />
                    </IconButton>
                    <AccountCircleIcon fontSize="large"/>
                    <Typography variant="h6" style={{marginRight: 8}}>
                        {user[0].name} {user[0].firstname}
                    </Typography>
                </div>
            );
        }
        else
            getUser();
    }


    /*
     *  Description : Function that choose the good page to display
     *  Entry : Nothing
     *  Exit : The display associated
     */
    const displayWindow = () => {

        if (competition && user.length > 0)
            return <TableCompetition
                        licence={user[0].licence}/>;
        else if (inscription && user.length > 0)
            return <TableInscription
                        licence={user[0].licence}
                        ID_club={user[0].ID_club}
                        admin={user[0].admin}
                        ID_user={user[0].ID_user}/>;
        else if (profile && user.length > 0)
            return <User
                        user={user[0]}
                        licence={(data) => setLicence(data)}
                        update={() => getUser()}/>;
        else if (userclub && user.length > 0)
            return <UserClub
                        ID_club={user[0].ID_club}/>

    }

    /*
     *  Description : Function that display or not the last page user_club
     *  Entry : Nothing
     *  Exit : The menu user_club
     */
    const displayMenuClub = () => {

        if (user.length > 0 && user[0].admin === 1)
        {
            return (
                <List>
                    <ListItem button onClick={onClickUserClub}>
                        <ListItemIcon>
                            <PeopleIcon fontSize="large"/>
                        </ListItemIcon>
                        <ListItemText primary={"Gestion archers"} />
                    </ListItem>
                </List>
            );
        }
    }

    return (
        <div id='window'>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" id='toolbarleft' >
                            Site département
                        </Typography>

                        {showInfoUser()}

                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={onClickCompetition}>
                            <ListItemIcon >
                                <EventNoteOutlinedIcon fontSize="large"/>
                            </ListItemIcon>
                            <ListItemText primary={"Compétition(s)"} />
                        </ListItem>

                        <ListItem button onClick={onClickInscription}>
                            <ListItemIcon>
                                <AssignmentTurnedInOutlinedIcon fontSize="large"/>
                            </ListItemIcon>
                            <ListItemText primary={"Inscription(s)"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={onClickProfil}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="large"/>
                            </ListItemIcon>
                            <ListItemText primary={"Profil"} />
                        </ListItem>
                    </List>
                    <Divider />
                    {displayMenuClub()}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div id='body'>
                        {displayWindow()}
                    </div>
                </main>
            </div>
        </div>

    );

}
