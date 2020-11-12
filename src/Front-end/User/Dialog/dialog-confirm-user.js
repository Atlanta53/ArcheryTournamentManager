import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";


/*
 *  Description : Class that show the dialog confirmation to modify the profile's user
 *  Entry : The props open and the method handleClose
 *  Exit : The dialog
 */
export class DialogConfirmUser extends React.Component {

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
                <DialogTitle id="alert-dialog-title">Modification informations personnelles</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous modifier vos informations personnelles ?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Annuler
                    </Button>
                    <Button onClick={this.props.update_user} color="primary" autoFocus>
                        <EditIcon/> Oui
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}