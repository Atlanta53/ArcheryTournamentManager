import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


/*
 *  Description : Class that show the name of the user
 *  Entry : The props name and handleChange
 *  Exit : The textfield
 */
export class TextfieldName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <Grid container justify="center">
                <FormControl variant="outlined" id="select">
                    <TextField
                        label="Nom"
                        value={this.props.name}
                        variant="outlined"
                        onChange={this.props.handleChange('name')}
                    />
                </FormControl>
            </Grid>
        );
    }
}