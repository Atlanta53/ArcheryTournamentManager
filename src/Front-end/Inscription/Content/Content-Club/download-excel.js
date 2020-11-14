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

import ReactExport from "react-export-excel";
import Button from "@material-ui/core/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


export class Download extends React.Component {

    constructor(props) {
        super(props);

        this.data = [];
    }

    configureData() {

        this.data = [];

        this.props.data.map((item) => (
            this.data.push( [item.name,
                item.firstname,
                item.licence,
                item.clubname,
                item.weaponname,
                item.categoryname,
                item.ID_depart])
        ))
    }

    render() {
        this.configureData();
        let multiDataSet = [
            {
                columns: ["Nom", "Prénom", "Licence", "Club", "Arme", "Catégorie", "Départ"],
                data: this.data,
            }
        ];

        return (
            <ExcelFile element={<Button variant="outlined" color="primary" style={{marginTop: 20}}>Exporter vers excel</Button>}>
                <ExcelSheet dataSet={multiDataSet} name="Organization"/>
            </ExcelFile>
        );
    }
}
