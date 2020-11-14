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

import { Scrollbar } from 'react-scrollbars-custom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ListItem from "@material-ui/core/ListItem";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import {ContentNewCompetition} from "./Content/Content-New-Competition/content-new-competition";
import {ContentArcher} from "./Content/Content-Archer/content-archer";
import {ContentClub} from './Content/Content-Club/content-club'


/*
 *  Description : Class that show the Table of inscription
 *  Entry : The props licence, ID_user, ID_club and droit
 *  Exit : The display of the inscription panel and the content associated
 */
export class TableInscription extends React.Component {

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

            index: -1,
            width: window.innerWidth,
            height: 0,
            ID_competition: 1,
            date_end_inscription: new Date("01-01-2020"),

            open: false,
            open_edit: false,
            hide: false,
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        this.competition = require('../../Back-end/Client/client-competition');
        this.user = require('../../Back-end/Client/client-user');
    }

    /*
     *  Description : Method that select the good competition list to display
     *  Entry : The props droit, ID_club and ID_user
     *  Exit : The competition state array filled
     */
    getCompetition() {

        if (this.props.admin === 1)
            this.competition.getCompetitionClub(this.props.ID_club, (props) => this.setState({competition : props}));
        else
            this.competition.getCompetitionArcher(this.props.ID_user, (props) => this.setState({competition : props}));
    }

    /*
     *  Description : Methods that call and fill the Array competition and user and resize the window
     *  Entry : Nothing
     *  Exit : The states competition and user completed
     */
    componentDidMount() {

        this.getCompetition();
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
     *  Entry : The index of the competition's selected
     *  Exit : The states index and ID_competition updated
     */
    handleClick(index) {
        this.setState( {index: index});

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
     *  Exit : The states index updated
     */
    onClickCancel = () => {
        if (this.state.index === -2)
            this.setState({ index: -1 });
    };
    newCompetition = () =>{
        this.setState({ index: -2 });
    }

    /*
     *  Description : Methods that create and show the button of the competition page
     *  Entry : Nothing
     *  Exit : The button inscription, list_inscription and cancel
     */
    buttonNewCompetition() {

        if (this.state.user.length > 0 && this.state.user[0].admin === 1 && this.state.index !== -2)
        {
            return (
                <Button color="primary" variant="outlined" onClick={this.newCompetition} >
                    <AddIcon style={{marginRight: 7}} />
                    Nouvelle compétition
                </Button>
            );
        }
    }
    buttonCancel() {
        if (this.state.index === -2)
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
     *  Description : Method that show the good content : content-club, content-archer, or content-nex-competition
     *  Entry : Nothing
     *  Exit : The content associated of the states
     */
    displayContent() {

        if (this.state.index >= 0 && this.state.user.length > 0 && this.state.competition.length > 0 && this.state.user[0].admin === 1)
            return(<ContentClub
                            hide={this.state.hide}
                            index={this.state.ID_competition}
                            nb_depart={this.state.competition[this.state.index].nb_depart}/>);
        else if (this.state.index >= 0 && this.state.user.length > 0 && this.state.competition.length > 0 && this.state.user[0].admin === 0)
            return <ContentArcher
                            hide={this.state.hide}
                            index={this.state.ID_competition}
                            ID_user={this.state.user[0].ID_user}
                            nb_depart={this.state.competition[this.state.index].nb_depart}/>;
        else if (this.state.index === -2 && this.state.user.length > 0)
            return (<ContentNewCompetition
                            hide={this.state.hide}
                            update={() => this.getCompetition()}
                            ID_club={this.state.user[0].ID_club}/>);
        else if (!this.state.hide)
        {
            return (
                <div id='content'>
                    <h1 id='title'>Inscription(s)</h1>
                </div>
            );
        }
        else if (this.state.hide)
        {
            return (
                <div id='content' style={{width: '100%'}}>
                    <h1 id='title'>Inscription(s)</h1>
                </div>
            );
        }
    }

    /*
     *  Description : Methods that handle the state of the dialog(open or close)
     *  Entry : Nothing
     *  Exit : The state updated
     */
    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    /*
     *  Description : Method that show the dialog
     *  Entry : Nothing
     *  Exit : The dialog
     */
    showDialog() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Supprimer la compétition</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous supprimer la compétition ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Non
                    </Button>
                    <Button onClick={() => this.onDeleteCompetition(this.state.ID_competition)} color="primary" autoFocus>
                        <DeleteIcon/> Oui
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    /*
     *  Description : Methods that handle the state of the dialog (open or close)
     *  Entry : Nothing
     *  Exit : The state updated
     */
    handleClickOpenEdit = () => {
        this.setState({open_edit: true});
    };
    handleCloseEdit = () => {
        this.setState({open_edit: false});
    };


    /*
     *  Description : Methods that handle the modification of the date_end_inscription
     *  Entry : The new date
     *  Exit : The date_end_inscription state updated
     */
    handleDateChangeEndInscription = (date) => {
        if (this.state.competition.length > 0 && date !== this.state.competition[this.state.index].date_end_inscription)
            this.setState({date_end_inscription: date});
    };

    /*
     *  Description : Method that show the datepicker
     *  Entry : Nothing
     *  Exit : The Datepicker
     */
    showDateEndInscription() {
        return (
            <Grid container justify="center" id="select">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    label="Date fin inscription"
                    value={this.state.date_end_inscription}
                    onChange={this.handleDateChangeEndInscription}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        );
    }

    /*
     *  Description : Method that show the dialog
     *  Entry : Nothing
     *  Exit : The dialog
     */
    showDialogEdit() {
        return (
            <Dialog
                open={this.state.open_edit}
                onClose={this.handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Modifier la compétition</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous changer la date de fermeture de la compétition ?
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {this.showDateEndInscription()}
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseEdit} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Non
                    </Button>
                    <Button  color="primary" onClick={() => this.onUpdateCompetition(this.state.ID_competition)} autoFocus>
                        <EditIcon/> Oui
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    /*
     *  Description : Method that update the date_end_inscription of a competition
     *  Entry : The index selected
     *  Exit : The database updated
     */
    onUpdateCompetition(index) {

        let param = {'ID_competition': index, 'date_end_inscription': this.state.date_end_inscription};
        this.competition.updateCompetition(param,
            () => this.getCompetition());
        this.handleCloseEdit();
    }

    /*
     *  Description : Method that delete a competition
     *  Entry : The index selected
     *  Exit : The database updated
     */
    onDeleteCompetition(index) {

        this.competition.deleteCompetition(index,
            () => this.getCompetition(),
            () => this.setState({index: -1}));

        this.handleClose();

    }

    /*
     *  Description : Methods that show the header in the table for delete or edit or club
     *  Entry : The props droit of the user
     *  Exit : The column of the header
     */
    showHeaderEditDelete() {
        if (this.props.admin === 1)
            return <TableCell style={{ color: 'white' }} align="center">Action(s)</TableCell>;
    }
    showHeaderClub() {
        if (this.props.admin === 0)
            return <TableCell style={{ color: 'white' }} align="center">Club</TableCell>;
    }

    /*
     *  Description : Methods that The row
     *  Entry : Nothing or the data
     *  Exit : The column of the body
     */
    showEditDelete() {
        if (this.props.admin === 1)
        {
            return (
                <TableCell align="center">
                    <IconButton aria-label="delete" onClick={() => this.handleClickOpenEdit()}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => this.handleClickOpen()}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            );
        }
    }
    showClub(data) {
        if (this.props.admin === 0)
            return <TableCell align="center">{data}</TableCell>;
    }


    /*
     *  Description : Method that shows the table with the competition's list
     *  Entry : The competition list
     *  Exit : The table completed
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
                            {this.showHeaderClub()}
                            {this.showHeaderEditDelete()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.competition.map((row, index) => (
                            <TableRow key={index} onClick={() => this.handleClick(index)}>
                                <TableCell align="center" > {row.date_begin} <br/> - <br/> {row.date_end}</TableCell>
                                {this.colorStatus(row.date_end_inscription)}
                                {this.colorType(row.typename)}
                                {this.showClub(row.clubname)}
                                {this.showEditDelete()}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
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
                            {this.buttonNewCompetition()}
                            {this.buttonCancel()}
                        </div>

                        {this.showDialog()}
                        {this.showDialogEdit()}
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
