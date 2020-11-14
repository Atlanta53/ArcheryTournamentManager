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

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Scrollbar} from "react-scrollbars-custom";
import EditIcon from "@material-ui/icons/Edit";

import {DialogArcher} from "./Dialog/dialog-edit-inscription"
import {DialogDeleteInscription} from "./Dialog/dialog-delete-inscription";

/*
 *  Description : Class that show the content of an archer point of view
 *  Entry : The props hide, index of the competition selected, ID_user and the ID_club of the user
 *  Exit : The content archer
 */
export class ContentArcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            list_inscription: [],
            user: [],

            index: 0,

            first_passage: false,
            open_edit: false,
            open_delete: false,
        };

        this.ID_competition = this.props.index;
        this.inscription = require("../../../../Back-end/Client/client-inscription");
    }

    /*
     *  Description : Method that call with axios the server and fill the Array inscription
     *  Entry : The props index
     *  Exit : The state inscription completed
     */
    getListInscription() {

        let param = {'ID_competition': this.ID_competition, 'ID_user': this.props.ID_user};
        this.inscription.getListInscriptionArcher(param, (props) => this.setState({list_inscription: props}));
    }

    /*
     *  Description : Method that handle the click on the Table
     *  Entry : The index of the competition selected
     *  Exit : The states index and first_passage updated
     */
    handleClick(index) {
        this.setState( {index: index});
        this.setState({first_passage: false});
    }

    // TODO: Change this to a proper manner
    scanIndexArcher() {
        if (this.ID_competition !== this.props.index)
        {
            this.ID_competition = this.props.index;
            this.getListInscription();
        }
    }

    /*
     *  Description : Method that show the Table of the inscription's list
     *  Entry : Nothing
     *  Exit : The Table
     */
    showTableArcher() {

        this.scanIndexArcher();

        return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table" >
                    <TableHead style={{backgroundColor: '#339BFF'}}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }} align="center">Nom</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Prénom</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Licence</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Arme</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Catégorie</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Départ</TableCell>
                            <TableCell style={{ color: 'white' }} align="center">Action(s)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.list_inscription.map((row, index) => (
                            <TableRow key={index} onClick={() => this.handleClick(index)}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.firstname}</TableCell>
                                <TableCell align="center">{row.licence}</TableCell>
                                <TableCell align="center">{row.weaponname}</TableCell>
                                <TableCell align="center">{row.categoryname}</TableCell>
                                <TableCell align="center">{row.ID_depart}</TableCell>
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
     *  Description : Methods that handle the modification of the dialog state
     *  Entry : The props of which dialog
     *  Exit : The state updated
     */
    handleClickOpen = (props) => {
        this.setState({[props]: true});
    };
    handleClose = (props) => {
        this.setState({[props]: false});
    };

    /*
     *  Description : Method that show the dialogs
     *  Entry : Nothing
     *  Exit : The dialogs
     */
    showDialog() {
        if (this.state.list_inscription.length > 0) {
            return (

                <div>
                    <DialogArcher
                        inscription={this.state.list_inscription[this.state.index]}
                        first_passage={this.state.first_passage}
                        open={this.state.open_edit}
                        nb_depart={this.props.nb_depart}
                        update={() => this.getListInscription()}
                        update_index={(index) => this.setState({index: index})}
                        update_first_passage={() => this.setState({first_passage: true})}
                        handleClose={(props) => this.handleClose(props)}
                    />

                    <DialogDeleteInscription
                        inscription={this.state.list_inscription[this.state.index]}
                        open={this.state.open_delete}
                        update={() => this.getListInscription()}
                        update_index={(index) => this.setState({index: index})}
                        handleClose={(props) => this.handleClose(props)}
                    />
                </div>

            );
        }
    }

    /*
     *  Description : Method that filled the array inscription list
     *  Entry : Nothing
     *  Exit : The array filled
     */
    componentDidMount() {
        this.getListInscription();
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
                    <h1 id='title'>Inscription(s)</h1>
                    <Scrollbar style={{ height: 600 }} >
                        {this.showTableArcher()}
                    </Scrollbar>

                    {this.showDialog()}
                </div>
            );
        }
        else
        {
            return (
                <div id='content' style={{width: '100%'}}>
                    <h1 id='title'>Inscription(s)</h1>
                    <Scrollbar style={{ height: 600 }} >
                        {this.showTableArcher()}
                    </Scrollbar>

                    {this.showDialog()}
                </div>
            );
        }
    }

    render() {
        return this.ifHide();
    }

}
