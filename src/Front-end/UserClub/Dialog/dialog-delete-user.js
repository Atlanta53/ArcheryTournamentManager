import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";


/*
 *  Description : Class that show the dialog to delete a user
 *  Entry : The props open, handleClose (to close the dialog) and delete_user
 *  Exit : The dialog
 */
export class DialogDeleteUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Suppression de compte</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous supprimer ce compte ?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Annuler
                    </Button>
                    <Button onClick={this.props.delete_user} color="primary" autoFocus>
                        <DeleteIcon/> Oui
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}