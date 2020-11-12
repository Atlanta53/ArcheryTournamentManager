import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

/*
 *  Description : Class that show the firstname of the user
 *  Entry : The props firstname and handleChange
 *  Exit : The textfield
 */
export class TextfieldFirstname extends React.Component {
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
                        label="Prénom"
                        value={this.props.firstname}
                        variant="outlined"
                        onChange={this.props.handleChange('firstname')}
                    />
                </FormControl>
            </Grid>
        );
    }
}