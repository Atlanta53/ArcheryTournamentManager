import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


/*
 *  Description : Class that show the previous password of the user
 *  Entry : The props prev_password and handleChange
 *  Exit : The textfield
 */
export class TextfieldPrevPassword extends React.Component {
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
                        label="Précédent mot de passe"
                        value={this.props.prev_password}
                        variant="outlined"
                        onChange={this.props.handleChange('prev_password')}
                    />
                </FormControl>
            </Grid>
        );
    }
}