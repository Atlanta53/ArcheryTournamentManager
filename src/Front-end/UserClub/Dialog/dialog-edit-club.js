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

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";


/*
 *  Description : Class that show the dialog to edit a user's club
 *  Entry : The props open, handleClose (to close the dialog), handleChange and ID_club
 *  Exit : The dialog
 */
export class DialogEditClub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            club: [],
        }

        this.club = require("../../../Back-end/Client/client-competition");
    }

    /*
     *  Description : Method that filled the club's select
     *  Entry : Nothing
     *  Exit : The select completed
     */
    renderClubData() {
        return this.state.club.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.clubname}</MenuItem>);
        })
    }

    /*
     *  Description : Methods that show the club select
     *  Entry : Nothing
     *  Exit : The select
     */
    showSelectClub() {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Club</InputLabel>
                    <Select
                        value={this.props.ID_club}
                        onChange={this.props.handleChange}
                    >
                        {this.renderClubData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that initialize the club's list
     *  Entry : Nothing
     *  Exit : The Arrays filled
     */
    componentDidMount() {
        this.club.getClub((props) => this.setState({club: props}))
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Modification du club d'un archer</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous modifier le club ?
                    </DialogContentText>
                    {this.showSelectClub()}
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Annuler
                    </Button>
                    <Button onClick={this.props.update_club} color="primary" autoFocus>
                        <EditIcon/> Oui
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
