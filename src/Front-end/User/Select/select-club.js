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
 *  Description : Class that show the select of the club
 *  Entry : The props ID_club and handlechange to change the club
 *  Exit : The select
 */
export class SelectClub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            club: [],
        }
        this.club = require('../../../Back-end/Client/client-competition');
    }

    /*
     *  Description : Method that list the item in the club select
     *  Entry : Nothing
     *  Exit : The corresponding lines
     */
    renderClubData() {
        return this.state.club.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.clubname}</MenuItem>);
        })
    }

    /*
     *  Description : Method that filled the array club
     *  Entry : Nothing
     *  Exit : The array filled
     */
    componentDidMount() {
        this.club.getClub((props) => this.setState({club : props}));
    }

    render() {
        return(
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Club</InputLabel>
                    <Select
                        disabled
                        value={this.props.ID_club}
                        onChange={this.props.handleChange("ID_club")}
                    >
                        {this.renderClubData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }
}
