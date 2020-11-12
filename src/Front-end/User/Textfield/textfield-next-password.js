import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


/*
 *  Description : Class that show the new password of the user
 *  Entry : The props new_password and handleChange
 *  Exit : The textfield
 */
export class TextfieldNextPassword extends React.Component {
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
                        label="Nouveau mot de passe"
                        value={this.props.new_password}
                        variant="outlined"
                        onChange={this.props.handleChange('new_password')}
                    />
                </FormControl>
            </Grid>
        );
    }
}