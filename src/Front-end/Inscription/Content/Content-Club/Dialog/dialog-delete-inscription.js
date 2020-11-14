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

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

/*
 *  Description : Class that show the dialog to delete an inscription
 *  Entry : The props inscription, index, first_passage, open, nb_depart and the prossibility to update them
 *  Exit : The dialog
 */
export class DialogDeleteInscription extends React.Component {

    constructor(props) {
        super(props);

        this.inscription = require("../../../../../Back-end/Client/client-inscription");
    }

    /*
     *  Description : Method that delete an inscription
     *  Entry : The props inscription, index
     *  Exit : The database and the inscription list updated
     */
    onDeleteInscription() {

        this.inscription.deleteInscription(this.props.inscription.ID_inscription,
            () => this.props.update(),
            () => this.props.update_index(0));
        this.props.handleClose("open_delete");
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={() => this.props.handleClose("open_delete")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Supprimer l'inscription</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous supprimer l'inscription ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleClose("open_delete")} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Non
                    </Button>
                    <Button onClick={() => this.onDeleteInscription()} color="primary" autoFocus>
                        <DeleteIcon/> Oui
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
