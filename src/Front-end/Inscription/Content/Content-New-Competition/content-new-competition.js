import React from "react";

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
//import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import {DialogNewCompetition} from "./Dialog/dialog";
import {DialogErrorCompetition} from "./Dialog/dialog-error";
import {SelectType} from "./Select/select-type";
import {SelectClub} from "./Select/select-club";
import {SelectDepart} from "./Select/select-depart";
import {DatepickerBegin} from "./DatePicker/datepicker-begin";
import {DatepickerEnd} from "./DatePicker/datepicker-end"
import {DatepickerEndInscription} from "./DatePicker/datepicker-end-inscription";




/*
 *  Description : Class that show the content for a new competition
 *  Entry : The props hide, update (to update the competition list) and the ID_club of the user
 *  Exit : The content new competition
 */
export class ContentNewCompetition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            type:[],
            club:[],

            ID_type: 1,
            nb_depart: 1,
            ID_club: this.props.ID_club,

            date_begin: new Date("01-01-2020"),
            date_end: new Date("01-01-2020"),
            date_end_inscription: new Date("01-01-2020"),

            open: false,

            err: false,
        };

        this.competition = require("../../../../Back-end/Client/client-competition");
    }

    /*
     *  Description : Methods that handle the modification of a state (dates and nb_depart)
     *  Entry : The event, or date
     *  Exit : The state updated
     */
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleChangeDateBegin = (date) => {
        if (date !== this.state.date_begin)
            this.setState({date_begin: date});
    };
    handleChangeDateEnd = (date) => {
        if (date !== this.state.date_end)
            this.setState({date_end: date});
    };
    handleChangeDateEndInscription = (date) => {
        if (date !== this.state.date_end_inscription)
            this.setState({date_end_inscription: date});
    };

    /*uploadPDF() {

        return (
            <Grid container justify="center" id="select">
                <input
                    id="outlined-button-file"
                    type="file"
                    hidden={true}
                    onChange={this.uploadFile}
                />
                <label htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span" >
                        <CloudUploadIcon />
                        Upload
                    </Button>
                </label>
            </Grid>
        );
    }*/

    /*
     *  Description : Method that show the creation button of a competition
     *  Entry : Nothing
     *  Exit : The button
     */
    showButtonCreate() {
        return (
            <Grid container justify="center" id="select">
                <FormControl variant="outlined">
                    <Button size="large" variant="outlined" color="primary" onClick={this.postCompetition}>
                        <AddIcon/>
                        Créer
                    </Button>

                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that show the form for a new competition
     *  Entry : Nothing
     *  Exit : The form
     */
    showForm() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SelectType
                    ID_type={this.state.ID_type}
                    handleChange={() => this.handleChange}/>
                <SelectClub
                    ID_club={this.state.ID_club}
                    handleChange={() => this.handleChange}/>
                <SelectDepart
                    nb_depart={this.state.nb_depart}
                    handleChange={() => this.handleChange}/>
                <DatepickerBegin
                    date_begin={this.state.date_begin}
                    handleChange={() => this.handleChangeDateBegin}/>
                <DatepickerEnd
                    date_end={this.state.date_end}
                    handleChange={() => this.handleChangeDateEnd}/>
                <DatepickerEndInscription
                    date_end_inscription={this.state.date_end_inscription}
                    handleChange={() => this.handleChangeDateEndInscription}/>

                {/*this.uploadPDF()*/}
                {this.showButtonCreate()}

            </MuiPickersUtilsProvider>
        );
    }

    /*
     *  Description : Methods that handle the modification of the dialog state
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

        if (!this.state.err) {
            return (
                <DialogNewCompetition
                    open={this.state.open}
                    handleClose={() => this.handleClose()}
                />
            );
        } else {
            return (
                <DialogErrorCompetition
                    open={this.state.open}
                    handleClose={() => this.handleClose()}
                />
            );
        }
    }

    /*
     *  Description : Method that post a new competition
     *  Entry : Nothing
     *  Exit : The database updated
     */
    postCompetition = () => {

        let param = {'date_begin': this.state.date_begin,
                    'date_end': this.state.date_end,
                    'date_end_inscription': this.state.date_end_inscription,
                    'ID_type': this.state.ID_type,
                    'ID_club': this.state.ID_club,
                    'nb_depart': this.state.nb_depart};

        this.competition.newCompetition(param,
                () => this.props.update(),
            (props) => this.setState({err: props}))
        this.handleClickOpen();
    }

    /*
     *  Description : Method that extends the width to 100% if hide is true
     *  Entry : The props hide
     *  Exit : The content with the good width
     */
    ifHide() {

        if (!this.props.hide)
        {
            return (
                <div id='content'>
                    <h1 id='title'>Nouvelle compétition</h1>
                    {this.showForm()}
                    {this.showDialog()}
                </div>
            );
        }
        else
        {
            return (
                <div id='content' style={{width: '100%'}}>
                    <h1 id='title'>Nouvelle compétition</h1>
                    {this.showForm()}
                    {this.showDialog()}
                </div>
            );
        }
    }

    render() {
        return this.ifHide();
    }
}