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

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";


/*
 *  Description : Class that show the select of the type
 *  Entry : The props ID_type and handlechange to change the type
 *  Exit : The select
 */
export class SelectType extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [],
        }

        this.type = require('../../../../../Back-end/Client/client-competition');
    }


    /*
     *  Description : Method that list the item in the type select
     *  Entry : Nothing
     *  Exit : The corresponding lines
     */
    renderTypeData() {
        return this.state.type.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.typename}</MenuItem>)
        })
    }

    /*
     *  Description : Method that filled the array club
     *  Entry : Nothing
     *  Exit : The array filled
     */
    componentDidMount() {
        this.type.getType((props) => this.setState({type : props}));
    }

    render() {
        return(
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={this.props.ID_type}
                        onChange={this.props.handleChange()}
                        name="ID_type"
                    >
                        {this.renderTypeData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }
}
