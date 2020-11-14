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

import React from "react";

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

import {DialogNewInscription} from "./Dialog/dialog-new-competition";
import {DialogErrorInscription} from "./Dialog/dialog-error";
import {SelectWeapon} from "./Select/select-weapon";
import {SelectCategory} from "./Select/select-category";
import {SelectDepart} from "./Select/select-depart";
import {TextfieldUser} from "./TextField/textfield-user";

/*
 *  Description : Class that display the information for a new inscription
 *  Entry : hide (true or false), the user information, the index of the line selected and the number of depart
 *  Exit : The form for a new inscription
 */
export class ContentNewInscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            ID_competition: this.props.index,
            nb_depart: this.props.nb_depart,
            user: this.props.user,

            ID_weapon: 1,
            ID_category: 1,

            checked: [6, false],
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,

            open: false,
            err: false,
        };

        this.inscription = require("../../../../Back-end/Client/client-inscription");
    }

    /*
     *  Description : Methods that change the states of the select and the checkbox
     *  Entry : The events
     *  Exit : The select or the checked states updated
     */
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };
    handleChangeSelect = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    /*
     *  Description : Method that show the creation button
     *  Entry : Nothing
     *  Exit : The button
     */
    showButtonCreate() {
        return (
            <Grid container justify="center" id="select">
                <FormControl variant="outlined">

                    <Button size="large" variant="outlined" color="primary" onClick={this.postInscription}>
                        <AddIcon style={{marginRight: 7}}/>
                        S'inscrire
                    </Button>
                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that create the inscriptions in the competition
     *  Entry : Nothing
     *  Exit : The database updated
     */
    postInscription = () => {

        new Promise((resolve) => {

            resolve('Success!');
            this.setState({checked: [this.state.checked1, this.state.checked2,
                    this.state.checked3, this.state.checked4,
                    this.state.checked5, this.state.checked6]});



        }).then(() => {

            for (let i = 0; i < this.state.nb_depart; i++)
            {
                if (this.state.checked[i] === true)
                {
                    console.log("salut");
                    let param = {'ID_competition': this.state.ID_competition,
                                'ID_user': this.state.user.ID_user,
                                'ID_depart': i + 1,
                                'ID_weapon': this.state.ID_weapon,
                                'ID_category': this.state.ID_category};

                    this.inscription.newInscription(param,
                        (props) => this.setState({err: props}));

                    this.handleClickOpen();
                }
            }
        });
    }

    /*
     *  Description : Method that shows the form for a new inscription
     *  Entry : Nothing
     *  Exit : The form
     */
    showForm() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TextfieldUser
                        user={this.state.user}/>
                <SelectWeapon
                        ID_weapon={this.state.ID_weapon}
                        handleChange={() => this.handleChangeSelect}/>
                <SelectCategory
                        ID_category={this.state.ID_category}
                        handleChange={() => this.handleChangeSelect}/>
                <SelectDepart
                        nb_depart={this.state.nb_depart}
                        handleChange={() => this.handleChange}/>
                {this.showButtonCreate()}
            </MuiPickersUtilsProvider>
        );
    }

    /*
     *  Description : Methods that change the state of the dialog
     *  Entry : Nothing
     *  Exit : The state of open updated
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

        if (!this.state.err)
        {
            return (
                <DialogNewInscription
                    open={this.state.open}
                    handleClose={() => this.handleClose()}
                />
            );
        }
        else
        {
            return (
                <DialogErrorInscription
                    open={this.state.open}
                    handleClose={() => this.handleClose()}
                />
            );
        }

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
                    <h1 id='title'>Nouvelle Inscription</h1>
                    {this.showForm()}
                    {this.showDialog()}
                </div>
            );
        }
        else
        {
            return (
                <div id='content' style={{width: '100%'}}>
                    <h1 id='title'>Nouvelle Inscription</h1>
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
