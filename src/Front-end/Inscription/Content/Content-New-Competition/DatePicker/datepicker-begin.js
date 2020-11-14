/**
 * Copyright (c) 2020  Korantin Bordeau--Aubert.
 * All Rights Reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
