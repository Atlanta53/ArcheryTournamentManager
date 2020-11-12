import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";


/*
 *  Description : Class that show the select of the depart
 *  Entry : The props nb_depart and handlechange to change the depart
 *  Exit : The select
 */
export class SelectDepart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <Grid container justify="center">
                <FormControl variant="outlined" id="select-depart">
                    <InputLabel >Nombre de départ(s)</InputLabel>
                    <Select
                        value={this.props.nb_depart}
                        onChange={this.props.handleChange()}
                        name="nb_depart"
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        );
    }
}