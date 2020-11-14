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
 *  Description : Class that show the select for the weapons
 *  Entry : The props ID_weapon
 *  Exit : The select of the weapon
 */
export class SelectWeapon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weapon: [],
        };

        this.weapon = require("../../../../../Back-end/Client/client-inscription");
    }

    /*
     *  Description : Method that complete the select weapon
     *  Entry : Nothing
     *  Exit : The array weapon filled
     */
    renderWeaponData() {
        return this.state.weapon.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.weaponname}</MenuItem>);
        })
    }

    /*
     *  Description : Method that get the list weapon
     *  Entry : Nothing
     *  Exit : The weapon list completed
     */
    componentDidMount() {
        this.weapon.getWeapon((props) => this.setState({weapon : props}));
    }

    render() {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Arme</InputLabel>
                    <Select
                        value={this.props.ID_weapon}
                        onChange={this.props.handleChange()}
                        name="ID_weapon"
                    >
                        {this.renderWeaponData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }
}
