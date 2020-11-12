import React from 'react';

import { Scrollbar } from 'react-scrollbars-custom';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ListItem from "@material-ui/core/ListItem";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import {Content} from "./Content/Content-PDF/content";
import {ContentNewInscription} from "./Content/Content-New-Inscription/content-new-inscription";
import {ContentListInscription} from "./Content/Content-List-Inscription/content-list-inscription";

/*
 *  Description : Class that display the first menu competition
 *  Entry : The licence of the user
 *  Exit : The display of the competition panel and the content associated
 */
export class TableCompetition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            competition: [],
            user: [],

            columns_competition: [
                {key: "date_begin", header: "Date"},
                {key: "status", header: "Statut"},
                {key: "ID_type", header: "Type"},
                {key: "ID_club", header: "Club"},
            ],

            width: window.innerWidth,
            height: 0,

            index: -1,
            ID_competition: 1,
            inscription: false,
            list: false,

            hide: false,
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        this.competition = require('../../Back-end/Client/client-competition');
        this.user = require('../../Back-end/Client/client-user');
    }

    /*
     *  Description : Methods that call and fill the Array competition and user and resize the window
     *  Entry : Nothing
     *  Exit : The states competition and user completed
     */
    componentDidMount() {

        this.competition.getCompetition((props) => this.setState({competition : props}));
        this.user.getUser(this.props.licence, (props) => this.setState({user : props}));

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

        if (this.state.width <= 1000)
            this.setState({hide: true});
        else if (this.state.width >= 1000)
            this.setState({hide: false});
    }


    /*
     *  Description : Method that handle the click on the Table
     *  Entry : The index of the competition selected
     *  Exit : The states index, competition, and ID_competition updated
     */
    handleClick(index) {
        this.setState( {index: index});
        this.setState({inscription: false});

        if (index >= 0) {
            this.setState({ID_competition: this.state.competition[index].ID_competition});
        }
    }



    /*
     *  Description : Methods that fill the columns Status and Type with the good colors
     *  Entry : The status or the type of the Table's line
     *  Exit : The case with the color associated
     */
    colorStatus(status) {
        if (status === "ouvert")
            return <TableCell align="center" style={{ color: '#00B711' }}>{status}</TableCell>;
        else
            return <TableCell align="center" style={{ color: 'red' }}>{status}</TableCell>;
    }
    colorType(type) {
        if (type === "Salle départemental" ||  type === "Extérieur départemental" || type === "Campagne départemental")
            return <TableCell align="center" style={{ color: '#339BFF' }}>{type}</TableCell>;
        else
            return <TableCell align="center">{type}</TableCell>;
    }


    /*
     *  Description : Methods that handle the event on a button
     *  Entry : Nothing
     *  Exit : The states of inscription, list updated
     */
    onClickNewInscription = () => {
        if (this.state.index >= 0)
            this.setState({ inscription: true });
    };
    onClickCancel = () => {
        if (this.state.inscription === true)
            this.setState({ inscription: false });
        if (this.state.list === true)
            this.setState({ list: false});
    };
    showList = () =>{
        this.setState({ list: true });
        this.setState({ inscription: false });
    }


    /*
     *  Description : Methods that create and show the button of the competition page
     *  Entry : Nothing
     *  Exit : The button inscription, list_inscription and cancel
     */
    buttonNewInscription() {

        if (this.state.inscription === false
            && this.state.index >= 0
            && this.state.competition[this.state.index].date_end_inscription !== "fermé")
        {
            return (
                <Button color="primary" variant="outlined" onClick={this.onClickNewInscription}>
                    <AddIcon style={{marginRight: 7}} />
                    S'inscrire
                </Button>
            );
        }
    }
    buttonListInscription() {

        if (this.state.index >= 0 && this.state.list === false && this.state.user.length > 0 && this.state.user[0].admin === 1)
        {
            return (
                <Button color="primary" variant="outlined" onClick={this.showList}>
                    <VisibilityIcon style={{marginRight: 7}} />
                    Afficher liste inscrits
                </Button>
            );
        }
    }
    buttonCancel() {
        if (this.state.inscription === true || this.state.list === true)
        {
            return (
                <Button color="primary" variant="outlined" onClick={this.onClickCancel}>
                    <CancelIcon style={{marginRight: 7}} />
                    Arrêter
                </Button>
            );
        }
    }


    /*
     *  Description : Method that show the Table of competition
     *  Entry : Nothing
     *  Exit : The table
     */
    showTable() {

        return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table" >
                    <TableHead style={{backgroundColor: '#339BFF'}}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }} align="center">Date</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Statut</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Type</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Club</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.competition.map((row, index) => (
                            <TableRow key={index} onClick={() => this.handleClick(index)}>
                                <TableCell align="center" > {row.date_begin} <br/> - <br/> {row.date_end}</TableCell>
                                {this.colorStatus(row.date_end_inscription)}
                                {this.colorType(row.typename)}
                                <TableCell align="center">{row.clubname}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


    /*
     *  Description : Method that show the good content : new inscription, content, or list inscription
     *  Entry : Nothing
     *  Exit : The content associated of the states
     */
    displayContent() {
        if (this.state.index >= 0 && this.state.inscription === false && this.state.user.length > 0 && !this.state.list)
            return (<Content
                hide={this.state.hide}
                index={this.state.index}
                competition={this.state.competition[this.state.index]}/>);
        else if (this.state.index >= 0 && this.state.inscription === false && this.state.user.length > 0 && this.state.list)
            return (<ContentListInscription
                index={this.state.ID_competition}
                nb_depart={this.state.competition[this.state.index].nb_depart}
                user={this.state.user[0]}
                hide={this.state.hide}/>);
        else if (this.state.index === -1)
            return (<Content
                hide={this.state.hide}
                index={this.state.index}
                competition={null}/>);
        else if (this.state.inscription === true && this.state.user.length > 0)
            return (<ContentNewInscription
                hide={this.state.hide}
                index={this.state.ID_competition}
                user={this.state.user[0]}
                nb_depart={this.state.competition[this.state.index].nb_depart}/>);
    }


    /*
     *  Description : Method that hide or not the competition list
     *  Entry : Nothing
     *  Exit : The competition table's hide or not
     */
    hideCompetition() {

        if (!this.state.hide)
        {
            return (
                <div id='body-right'>
                    {this.displayContent()}
                    <div id='list-competition'>
                        <h1 id='title'>Liste des compétitions</h1>

                        <div id='table-competition'>
                            <Scrollbar style={{ height: 600 }} >
                                {this.showTable()}
                            </Scrollbar>
                        </div>
                        <div id='new-competition'>
                            {this.buttonNewInscription()}
                            {this.buttonCancel()}
                            {this.buttonListInscription()}
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div id='body-right'>
                    {this.displayContent()}
                </div>
            );
        }
    }

    render() {
        return (
            <div id='body-right'>

                {this.hideCompetition()}
                <List id="list-competition-bar">
                    <ListItem button onClick={() => this.setState({hide: !this.state.hide})}>
                        <EventNoteOutlinedIcon fontSize="large"/>
                        <ListItemText primary={"Liste des compétition(s)"} />
                    </ListItem>
                </List>
            </div>
        );
    }
}
