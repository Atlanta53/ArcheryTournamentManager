import React from "react";

import {KeyboardDatePicker} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";


/*
 *  Description : Class that show the datepicker of the date_end_inscription
 *  Entry : The props date_end_inscription and handlechange to change the date
 *  Exit : The datepicker
 */
export class DatepickerEndInscription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <Grid container justify="center" id="select">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    label="Date fin inscription"
                    value={this.props.date_end_inscription}
                    onChange={this.props.handleChange()}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    name="date_end_inscription"
                />
            </Grid>
        );
    }
}