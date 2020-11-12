import React from 'react';

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";


/*
 *  Description : Class that show the dialog to delete an inscription
 *  Entry : The props inscription, first_passage, open, nb_depart and the prossibility to update them
 *  Exit : The dialog
 */
export class DialogClub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            weapon: [],
            ID_weapon: 1,
            category: [],
            ID_category: 1,

            depart: [1, 2, 3, 4, 5, 6],
            ID_depart: 1,
        };

        this.inscription = require("../../../../../Back-end/Client/client-inscription");
    }

    /*
     *  Description : Method that change the selected line
     *  Entry : The event
     *  Exit : The event.target.name state updated
     */
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    /*
     *  Description : Methods that filled the selects
     *  Entry : Nothing
     *  Exit : The select completed
     */
    renderWeaponData() {
        return this.state.weapon.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.weaponname}</MenuItem>);
        })
    }
    renderCategoryData() {
        return this.state.category.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.categoryname}</MenuItem>);
        })
    }
    renderDepartData() {
        // eslint-disable-next-line array-callback-return
        return this.state.depart.map((key, index) => {
            if (index < this.props.nb_depart)
                return (<MenuItem value={index + 1}>{index + 1}</MenuItem>);
        })
    }

    /*
     *  Description : Methods that show the select
     *  Entry : Nothing
     *  Exit : The select
     */
    showSelectWeapon() {
        return (
            <FormControl variant="outlined" id="select" >
                <InputLabel>Arme</InputLabel>
                <Select
                    value={this.state.ID_weapon}
                    onChange={this.handleChange}
                    name="ID_weapon"
                >
                    {this.renderWeaponData()}
                </Select>
            </FormControl>
        );
    }
    showSelectCategory() {
        return (
            <FormControl variant="outlined" id="select" >
                <InputLabel>Catégorie</InputLabel>
                <Select
                    value={this.state.ID_category}
                    onChange={this.handleChange}
                    name="ID_category"
                >
                    {this.renderCategoryData()}
                </Select>
            </FormControl>
        );
    }
    showSelectDepart() {
        return (
            <FormControl variant="outlined" id="select" >
                <InputLabel>Départ</InputLabel>
                <Select
                    value={this.state.ID_depart}
                    onChange={this.handleChange}
                    name="ID_depart"
                >
                    {this.renderDepartData()}
                </Select>
            </FormControl>
        );
    }

    /*
     *  Description : Method that show the good lines of the selected
     *  Entry : The props first_passage and inscription
     *  Exit : The dialog with the good lines selected
     */
    confirmDialogEdit() {

        if (this.props.first_passage === false) {

            if (this.state.weapon.length > 0
                && this.state.weapon[this.state.ID_weapon - 1].weaponname !== this.props.inscription.weaponname) {
                for (let i = 1; i < 4; i++)
                    if (this.state.weapon[i - 1].weaponname === this.props.inscription.weaponname)
                        this.setState({ID_weapon: i});
            }

            if (this.state.category.length > 0
                && this.state.category[this.state.ID_category - 1].categoryname !== this.props.inscription.categoryname) {
                for (let j = 1; j < 9; j++)
                    if (this.state.category[j - 1].categoryname === this.props.inscription.categoryname) {
                        this.setState({ID_category: j});

                    }
            }

            this.setState({ID_depart: this.props.inscription.ID_depart});
            this.props.update_first_passage();
        }
    }

    /*
     *  Description : Method that update the inscriptions
     *  Entry : The props inscription
     *  Exit : The database updated
     */
    onUpdateInscription() {

        let param = {'ID_inscription':  this.props.inscription.ID_inscription,
            'ID_depart': this.state.ID_depart,
            'ID_weapon': this.state.ID_weapon,
            'ID_category' : this.state.ID_category};

        this.inscription.updateInscription(param, () => this.props.update());
        this.props.handleClose("open_edit");
    }

    /*
     *  Description : Method that initialize the weapon's and category's list
     *  Entry : Nothing
     *  Exit : The Arrays filled
     */
    componentDidMount() {
        this.inscription.getCategory((props) => this.setState({category : props}));
        this.inscription.getWeapon((props) => this.setState({weapon : props}));
    }

    render() {

        this.confirmDialogEdit();

        return (
            <Dialog
                open={this.props.open}
                onClose={() => this.props.handleClose("open_edit")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Modification de l'inscription</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Grid container justify="center">
                            <FormControl variant="outlined" id="select">
                                <TextField
                                    disabled
                                    label="Nom"
                                    defaultValue="Nom"
                                    variant="outlined"
                                    value={this.props.inscription.name}
                                />
                            </FormControl>
                            <FormControl variant="outlined" id="select">
                                <TextField
                                    disabled
                                    label="Prénom"
                                    defaultValue="Prénom"
                                    variant="outlined"
                                    value={this.props.inscription.firstname}
                                />
                            </FormControl>
                            <FormControl variant="outlined" id="select">
                                <TextField
                                    disabled
                                    label="Licence"
                                    defaultValue="Licence"
                                    variant="outlined"
                                    value={this.props.inscription.licence}
                                />
                            </FormControl>
                            {this.showSelectWeapon()}
                            {this.showSelectCategory()}
                            {this.showSelectDepart()}
                        </Grid>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleClose("open_edit")} color="primary" autoFocus>
                        <CancelOutlinedIcon/> Annuler
                    </Button>
                    <Button color="primary" onClick={() => this.onUpdateInscription()} autoFocus>
                        <EditIcon/> Modifier
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}