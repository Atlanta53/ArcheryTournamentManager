import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";


/*
 *  Description : Class that show the select of the club
 *  Entry : The props ID_club and handlechange to change the club
 *  Exit : The select
 */
export class SelectClub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            club: [],
        }

        this.club = require('../../../../../Back-end/Client/client-competition');
    }

    /*
     *  Description : Method that list the item in the club select
     *  Entry : Nothing
     *  Exit : The corresponding lines
     */
    renderClubData() {
        return this.state.club.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.clubname}</MenuItem>);
        })
    }

    /*
     *  Description : Method that filled the array club
     *  Entry : Nothing
     *  Exit : The array filled
     */
    componentDidMount() {
        this.club.getClub((props) => this.setState({club : props}));
    }

    render() {
        return(
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Club</InputLabel>
                    <Select
                        value={this.props.ID_club}
                        onChange={this.props.handleChange()}
                        disabled
                        name="ID_club"
                    >
                        {this.renderClubData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }
}