import React from "react";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Scrollbar} from "react-scrollbars-custom";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {DialogEditClub} from "./Dialog/dialog-edit-club";
import {DialogDeleteUser} from "./Dialog/dialog-delete-user";

/*
 *  Description : Class that show the user of a club information
 *  Entry : The props ID_club
 *  Exit : The display of the user's information of a club
 */
export class UserClub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            index: 0,

            open_edit: false,
            open_delete: false,

            club: [],
            ID_club: this.props.ID_club,
        };

        this.user = require("../../Back-end/Client/client-user");
    }

    /*
     *  Description : Method that handle the click on the Table
     *  Entry : The index of the user's selected
     *  Exit : The states index updated
     */
    handleClick(index) {
        this.setState( {index: index});
    }

    /*
     *  Description : Method that shows the table with the user's list
     *  Entry : The competition's list
     *  Exit : The table completed
     */
    showTable() {

        return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead style={{backgroundColor: '#339BFF'}}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }} align="center">Nom</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Prénom</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Licence</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Action(s) : <br/>changer le club ou supprimer le compte</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.user.map((row, index) => (
                            <TableRow key={index} onClick={() => this.handleClick(index)}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.firstname}</TableCell>
                                <TableCell align="center">{row.licence}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="edit" onClick={() => this.handleClickOpen("open_edit")}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => this.handleClickOpen("open_delete")}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    /*
     *  Description : Methods that handle the state of the dialog (open or close)
     *  Entry : Nothing
     *  Exit : The state updated
     */
    handleClickOpen = (props) => {
        this.setState({[props]: true});
    };
    handleClose = (props) => {
        this.setState({[props]: false});
    };

    /*
     *  Description : Method that handle the state of ID_club
     *  Entry : Nothing
     *  Exit : The state ID_club updated
     */
    handleChangeClub = (event) => {
        this.setState({ID_club: event.target.value});
    };

    /*
     *  Description : Method that update the club of an user
     *  Entry : Nothing
     *  Exit : The database updated
     */
    updateClub = () => {

        if (this.state.user.length > 0) {

            let param = {'ID_user': this.state.user[this.state.index].ID_user,
                        'ID_club': this.state.ID_club};

            this.user.updateClub(param,
                () => this.user.getUserClub(this.props.ID_club,
                    (props) => this.setState({user: props})));

            this.handleClose("open_edit");
        }
    }

    /*
     *  Description : Method that delete an user
     *  Entry : Nothing
     *  Exit : The database updated
     */
    deleteUser = () => {

        if (this.state.user.length > 0) {

            this.user.deleteUser(this.state.user[this.state.index].ID_user,
                this.user.getUserClub(this.props.ID_club,
                    (props) => this.setState({user: props})));

            this.handleClose("open_delete");
        }
    }

    /*
     *  Description : Methods that call and fill the Array user
     *  Entry : Nothing
     *  Exit : The state user completed
     */
    componentDidMount() {

        this.user.getUserClub(this.props.ID_club,
            (props) => this.setState({user: props}));
    }

    render() {
        return(
            <div id='body-right'>

                <div id="body-club">
                    <h1 id='title'>Liste des archers</h1>
                    <Scrollbar style={{ height: 800 }} >
                        {this.showTable()}
                    </Scrollbar>
                </div>

                <DialogEditClub
                    open={this.state.open_edit}
                    ID_club={this.state.ID_club}
                    handleChange={this.handleChangeClub}
                    handleClose={() => this.handleClose("open_edit")}
                    update_club={() => this.updateClub()}/>

                <DialogDeleteUser
                    open={this.state.open_delete}
                    handleClose={() => this.handleClose("open_delete")}
                    delete_user={() => this.deleteUser()}/>
            </div>
        );
    }

}