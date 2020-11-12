import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";

/*
 *  Description : Class that show the select for the categories
 *  Entry : The props ID_category
 *  Exit : The select of the category
 */
export class SelectCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
        };

        this.category = require("../../../../../Back-end/Client/client-inscription");
    }



    /*
     *  Description : Method that complete the select category
     *  Entry : Nothing
     *  Exit : The array category filled
     */
    renderCategoryData() {
        return this.state.category.map((key, index) => {
            return (<MenuItem value={index + 1}>{key.categoryname}</MenuItem>);
        })
    }

    /*
     *  Description : Method that get the list category
     *  Entry : Nothing
     *  Exit : The category list completed
     */
    componentDidMount() {
        this.category.getCategory((props) => this.setState({category : props}));
    }

    render() {
        return (
            <Grid container justify="center">
                <FormControl variant="outlined" id="select" >
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        value={this.props.ID_category}
                        onChange={this.props.handleChange()}
                        name="ID_category"
                    >
                        {this.renderCategoryData()}
                    </Select>
                </FormControl>
            </Grid>
        );
    }
}