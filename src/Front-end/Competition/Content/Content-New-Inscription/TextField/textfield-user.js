import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


/*
 *  Description : Class that get and shows the information of the user
 *  Entry : The props user (name, firstname, licence)
 *  Exit : The textfields of the user
 */
export class TextfieldUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /*
     *  Description : Method that show the name of the user
     *  Entry : Nothing
     *  Exit : The textfield name
     */
    showUserName() {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select">
                    <TextField
                        disabled
                        label="Nom"
                        defaultValue="Nom"
                        variant="outlined"
                        value={this.props.user.name}
                    />
                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that show the firstname of the user
     *  Entry : Nothing
     *  Exit : The textfield firstname
     */
    showUserFirstname() {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select">
                    <TextField
                        disabled
                        label="Prénom"
                        defaultValue="Prénom"
                        variant="outlined"
                        value={this.props.user.firstname}
                    />
                </FormControl>
            </Grid>
        );
    }

    /*
     *  Description : Method that show the licence of the user
     *  Entry : Nothing
     *  Exit : The textfield licence
     */
    showUserLicence() {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select">
                    <TextField
                        disabled
                        label="Licence"
                        defaultValue="Licence"
                        variant="outlined"
                        value={this.props.user.licence}
                    />
                </FormControl>
            </Grid>
        );
    }

    render() {
        return(
            <div>
                {this.showUserName()}
                {this.showUserFirstname()}
                {this.showUserLicence()}
            </div>
        );
    }

}