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
import { Scrollbar } from 'react-scrollbars-custom';
import EditIcon from "@material-ui/icons/Edit";

import {DialogListCompetition} from "./Dialog/dialog-edit-inscription";


/*
 *  Description : Class that show the content with the list of the inscription
 *  Entry : hide (true or false), the user information, the index of the line selected and the number of depart
 *  Exit : The inscription's list
 */
export class ContentListInscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            list_inscription: [],
            user: [],

            index: 0,

            open_edit: false,
            first_passage: false,
        };

        this.ID_competition = this.props.index;
        this.inscription = require("../../../../Back-end/Client/client-inscription");
    }

    /*
     *  Description : Method that handle the selection on the table
     *  Entry : Nothing
     *  Exit : The index and first_passage updated
     */
    handleClick(index) {
        this.setState( {index: index});
        this.setState({first_passage: false});
    }


    // TODO: Change this to a proper manner
    scanIndex() {
        if (this.ID_competition !== this.props.index)
        {
            this.ID_competition = this.props.index;
            this.inscription.getListInscriptionClubSelf({ 'index': this.props.index, 'ID_club': this.props.user.ID_club},
                (props) => this.setState({list_inscription : props}));
        }
    }


    /*
     *  Description : Method that handle the modification in the dialog (open or not)
     *  Entry : The props for the modification
     *  Exit : The props state updated
     */
    handleClickOpen = (props) => {
        this.setState({[props]: true});
    };
    handleClose = (props) => {
        this.setState({[props]: false});
    };

    /*
     *  Description : Method that show the Table of the inscription's list
     *  Entry : Nothing
     *  Exit : The Table
     */
    showTable() {

        this.scanIndex();

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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    /*
     *  Description : Method that filled the array inscription list
     *  Entry : Nothing
     *  Exit : The array filled
     */
    componentDidMount() {
        this.inscription.getListInscriptionClubSelf({ 'index': this.props.index, 'ID_club': this.props.user.ID_club},
                                                    (props) => this.setState({list_inscription : props}));
    }

    /*
     *  Description : Method that h=show or not the dialog
     *  Entry : The props nb_depart
     *  Exit : The dialog
     */
    showDialog() {
        if (this.state.list_inscription.length > 0) {
            return (
                <DialogListCompetition
                    inscription={this.state.list_inscription[this.state.index]}
                    index={this.state.index}
                    first_passage={this.state.first_passage}
                    open_edit={this.state.open_edit}
                    nb_depart={this.props.nb_depart}
                    update={() => this.inscription.getListInscriptionClubSelf({ 'index': this.props.index, 'ID_club': this.props.user.ID_club},
                        (props) => this.setState({list_inscription : props}))}
                    update_first_passage={() => this.setState({first_passage: true})}
                    handleClose={(props) => this.handleClose(props)}/>
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
            return(
                <div id='content'>
                    <h1 id='title'>Liste des Inscrits</h1>
                    <Scrollbar style={{ height: 600 }} >
                        {this.showTable()}
                    </Scrollbar>
                    {this.showDialog()}
                </div>
            );
        }
        else
        {
            return(
                <div id='content' style={{width: '100%'}}>
                    <h1 id='title'>Liste des Inscrits</h1>
                    <Scrollbar style={{ height: 600 }} >
                        {this.showTable()}
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
