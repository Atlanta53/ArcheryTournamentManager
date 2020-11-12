import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


/*
 *  Description : Class that show the appropriate number of checkbox dor the number of depart
 *  Entry : The props nb_depart with the number of depart
 *  Exit : The checkbox
 */
export class SelectDepart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /*
     *  Description : Method that check if the checkbox has to be displayed
     *  Entry : The index of the checkbox
     *  Exit : true or false
     */
    checkDisable = (index) => {
        return this.props.nb_depart < index;
    }

    /*
     *  Description : Methods that show the checkbox
     *  Entry : Nothing
     *  Exit : The checkbox
     */
    showDepart1() {
        if (this.props.nb_depart >= 1) {
            return (
                <Grid container justify="center">
                    <FormControlLabel
                        control={<Checkbox disabled={this.checkDisable(1)}
                                           color="primary"
                                           checked={this.props.checked1}
                                           onChange={this.props.handleChange()}
                                           name="checked1"/>}
                        label="Départ 1"
                    />
                </Grid>
            );
        }
    }
    showDepart2() {
        if (this.props.nb_depart >= 2)
        {
            return (
                <Grid container justify="center">
                    <FormControlLabel
                        control={<Checkbox disabled={this.checkDisable(2)}
                                           color="primary"
                                           checked={this.props.checked2}
                                           onChange={this.props.handleChange()}
                                           name="checked2" />}
                        label="Départ 2"
                    />
                </Grid>
            );
        }
    }
    showDepart3() {
        if (this.props.nb_depart >= 3)
        {
            return (
                <Grid container justify="center">
                    <FormControlLabel
                        control={<Checkbox disabled={this.checkDisable(3)}
                                           color="primary"
                                           checked={this.props.checked3}
                                           onChange={this.props.handleChange()}
                                           name="checked3" />}
                        label="Départ 3"
                    />
                </Grid>
            );
        }
    }
    showDepart4() {
        if (this.props.nb_depart >= 4)
        {
            return (
                <Grid container justify="center">
                    <FormControlLabel
                        control={<Checkbox disabled={this.checkDisable(4)}
                                           color="primary"
                                           checked={this.props.checked4}
                                           onChange={this.props.handleChange()}
                                           name="checked4" />}
                        label="Départ 4"
                    />
                </Grid>
            );
        }
    }
    showDepart5() {
        if (this.props.nb_depart >= 5)
        {
            return (
                <Grid container justify="center">
                    <FormControlLabel
                        control={<Checkbox disabled={this.checkDisable(5)}
                                           color="primary"
                                           checked={this.props.checked5}
                                           onChange={this.props.handleChange()}
                                           name="checked5" />}
                        label="Départ 5"
                    />
                </Grid>
            );
        }
    }
    showDepart6() {
        if (this.props.nb_depart >= 6)
        {
            return (
                <Grid container justify="center">
                    <FormControlLabel
                        control={<Checkbox disabled={this.checkDisable(6)}
                                           color="primary"
                                           checked={this.props.checked6}
                                           onChange={this.props.handleChange()}
                                           name="checked6" />}
                        label="Départ 6"
                    />
                </Grid>
            );
        }
    }

    render() {
        return (
            <div>
                {this.showDepart1()}
                {this.showDepart2()}
                {this.showDepart3()}
                {this.showDepart4()}
                {this.showDepart5()}
                {this.showDepart6()}
            </div>
        );
    }
}