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

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {TextfieldName} from "./Textfield/textfield-name";
import {TextfieldFirstname} from "./Textfield/textfield-firstname";
import {TextfieldLicence} from "./Textfield/textfield-licence";
import {TextfieldPrevPassword} from "./Textfield/textfield-prev-password";
import {TextfieldNextPassword} from "./Textfield/textfield-next-password";
import {SelectClub} from "./Select/select-club";
import {DialogConfirmUser} from "./Dialog/dialog-confirm-user";
import {DialogConfirmPassword} from "./Dialog/dialog-confirm-password";


/*
 *  Description : Class that show the user information
 *  Entry : The props licence, user and update to update the information of the profile
 *  Exit : The display of the user's information
 */
export class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            ID_club: this.props.user.ID_club,

            name: this.props.user.name,
            firstname: this.props.user.firstname,
            licence: this.props.user.licence,

            prev_password: "",
            new_password: "",

            open: false,
            open_password: false,

            hide: false,

            width: window.innerWidth,               // width of the page
            height: 0,
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        this.user = require("../../Back-end/Client/client-user");
    }

    /*
     *  Description : Method that change the selected line
     *  Entry : The event
     *  Exit : The prop state updated
     */
    handleChange = (prop) => (event) => {
        this.setState({...this.state, [prop]: event.target.value});
    }

    /*
     *  Description : ¨Method that create and show modification button of the profile's information
     *  Entry : Nothing
     *  Exit : The button
     */
    showButtonCreate() {
        return (
            <Grid container justify="center" id="select">
                <FormControl variant="outlined">
                    <Button size="large" variant="outlined" color="primary" onClick={() => this.handleClickOpen("open")}>
                        <EditIcon style={{marginRight: 10}}/>
                        Modifier
                    </Button>

                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that update the user's information
     *  Entry : The props inscription
     *  Exit : The database updated
     */
    updateUser = () => {

        let param = {'ID_user': this.props.user.ID_user,
                    'name': this.state.name,
                    'firstname': this.state.firstname,
                    'licence': this.state.licence,
                    'ID_club': this.state.ID_club};

        this.user.updateUser(param,
            () => this.props.update(),
            () => this.props.licence(this.state.licence));
        this.handleClose("open");
    }

    /*
     *  Description : ¨Method that create and show modification button of the password
     *  Entry : Nothing
     *  Exit : The button
     */
    showButtonEdit() {
        return (
            <Grid container justify="center" id="select">
                <FormControl variant="outlined">
                    <Button size="large" variant="outlined" color="primary" onClick={() => this.handleClickOpen("open_password")}>
                        <EditIcon style={{marginRight: 10}}/>
                        Modifier
                    </Button>

                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that update the user's password
     *  Entry : The props inscription
     *  Exit : The database updated
     */
    updatePassword = () => {

        let param = {'licence': this.props.user.licence,
                    'prev_password': this.state.prev_password,
                    'ID_user': this.props.user.ID_user,
                    'new_password': this.state.new_password};

        this.user.updatePassword(param);

        this.handleClose("open_password");
    }

    /*
     *  Description : Methods that handle the state of the dialog (open or close)
     *  Entry : The props of which dialog to open or close
     *  Exit : The state updated
     */
    handleClickOpen = (props) => {
        this.setState({[props]: true});
    };
    handleClose = (props) => {
        this.setState({[props]: false});
    };

    /*
     *  Description : Methods that call resize the window
     *  Entry : Nothing
     *  Exit : The states competition and user completed
     */
    componentDidMount() {
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
     *  Description : Method that show the form of the profile
     *  Entry : Nothing
     *  Exit : The form with the user's information
     */
    showContent() {

        return (
            <div id='table-competition'>
                <TextfieldName
                    name={this.state.name}
                    handleChange={(props) => this.handleChange(props)}/>
                <TextfieldFirstname
                    firstname={this.state.firstname}
                    handleChange={(props) => this.handleChange(props)}/>
                <TextfieldLicence
                    licence={this.state.licence}
                    handleChange={(props) => this.handleChange(props)}/>
                <SelectClub
                    ID_club={this.state.ID_club}
                    handleChange={(props) => this.handleChange(props)}/>

                <h3>Pour changer de club : faire la demande à votre club pour changer l'appartenance</h3>
                {this.showButtonCreate()}

            </div>
        );
    }

    /*
     *  Description : Method that hide or not the passwords textfields
     *  Entry : Nothing
     *  Exit : The passwords textfield's hide or not
     */
    hidePassword() {

        if (!this.state.hide)
        {
            return (
                <div id='body-right'>

                    <div id='content'>
                        <h1 id='title'>Page de profil</h1>
                        {this.showContent()}

                    </div>
                    <div id="list-competition">
                        <h1 id='title'>Changement de mot de passe</h1>
                        <TextfieldPrevPassword
                            prev_password={this.state.prev_password}
                            handleChange={(props) => this.handleChange(props)}/>
                        <TextfieldNextPassword
                            new_password={this.state.new_password}
                            handleChange={(props) => this.handleChange(props)}/>
                        {this.showButtonEdit()}
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div id='body-right' >
                    <div id='content' style={{width: '100%'}}>
                        <h1 id='title'>Page de profil</h1>
                        {this.showContent()}
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div id='body-right'>

                {this.hidePassword()}

                <List id="list-competition-bar">
                    <ListItem button onClick={() => this.setState({hide: !this.state.hide})}>
                        <VpnKeyIcon fontSize="large"/>
                        <ListItemText primary={"Mot de passe"} />
                    </ListItem>
                </List>

                <DialogConfirmUser
                    open={this.state.open}
                    handleClose={() => this.handleClose("open")}
                    update_user={() => this.updateUser()}/>

                <DialogConfirmPassword
                    open={this.state.open_password}
                    handleClose={() => this.handleClose("open_password")}
                    update_password={() => this.updatePassword()}/>

            </div>
        );
    }
}
