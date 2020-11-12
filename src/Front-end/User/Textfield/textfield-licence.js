import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


/*
 *  Description : Class that show the licence of the user
 *  Entry : The props licence and handleChange
 *  Exit : The textfield
 */
export class TextfieldLicence extends React.Component {
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
                        label="Licence"
                        value={this.props.licence}
                        variant="outlined"
                        onChange={this.props.handleChange('licence')}
                    />
                </FormControl>
            </Grid>
        );
    }
}