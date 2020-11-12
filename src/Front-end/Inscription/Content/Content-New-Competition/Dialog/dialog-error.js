import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";



export class DialogErrorCompetition extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Statut Compétition</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Votre nouvelle compétition n'a pas pû être ajoutée !
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