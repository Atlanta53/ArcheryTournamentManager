import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";


/*
 *  Description : Class that show the dialog in case of a new inscription
 *  Entry : The props open if the dialog is open or not
 *  Exit : The dialog
 */
export class DialogNewInscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Statut Inscription</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Votre nouvelle inscription est ajoutée !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        <DoneAllOutlinedIcon/> Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}