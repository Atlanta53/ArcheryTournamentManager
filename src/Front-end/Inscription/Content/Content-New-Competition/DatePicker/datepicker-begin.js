import React from "react";

import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker} from "@material-ui/pickers";


/*
 *  Description : Class that show the datepicker of the date_begin
 *  Entry : The props date_begin and handlechange to change the date
 *  Exit : The datepicker
 */
export class DatepickerBegin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return(
            <Grid container justify="center">

                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    label="Date début"
                    value={this.props.date_begin}
                    onChange={this.props.handleChange()}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    name="date_begin"
                />
            </Grid>
        );
    }
}