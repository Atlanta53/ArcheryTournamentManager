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

import {KeyboardDatePicker} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";


/*
 *  Description : Class that show the datepicker of the date_end
 *  Entry : The props date_end and handlechange to change the date
 *  Exit : The datepicker
 */
export class DatepickerEnd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <Grid container justify="center" id="select" >
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    label="Date fin"
                    value={this.props.date_end}
                    onChange={this.props.handleChange()}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    name="date_end"
                />
            </Grid>
        );
    }
}
