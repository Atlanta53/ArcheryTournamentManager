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

import React from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/*
 *  Description : Class that display the content with a PDF of the mandat
 *  Entry : The props hide (to display in a width of 100% or not), index (the line selected in the table) and the competition
 *  Exit : The information of the content
 */
export class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            numPages: null,
            pageNumber: 1,
            path: "",

            scale: 1,
        };
    }

    /*
     *  Description : Methods that fill the columns Status with the good colors
     *  Entry : The status of the Table's line and the competition date
     *  Exit : The case with the color associated
     */
    colorStatusHeader(status) {

        if (status === "ouvert")
            return <h3 style={{ color: '#00B711' }}>Statut : {this.props.competition.date_end_inscription}</h3>;
        else
            return <h3 style={{ color: 'red' }}>Statut : {this.props.competition.date_end_inscription}</h3>;
    }

    /*
     *  Description : Method that load the PDF of the mandat
     *  Entry : The PDF and the number of page
     *  Exit : The states numPages and pageNumber updated
     */
    onDocumentLoadSuccess = (item) => {
        const {numPages} = item;
        this.setState({ numPages });
        this.setState({pageNumber: 1})
    };

    /*
     *  Description : Methods that change the page of the PDF viewer
     *  Entry : Nothing
     *  Exit : The good PDF page
     */
    goToPrevPage = () => {
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    }
    goToNextPage = () => {
        this.setState(state => ({pageNumber: state.pageNumber + 1}));
    }

    /*
     *  Description : Methods that verify if the limit of the page aren't reached
     *  Entry : pageNumber or pageNumber and numPages
     *  Exit : The button disabled or not
     */
    limitInferiorPage(pageNumber) {
        if (pageNumber > 1)
            return <Button size="large" variant="outlined" color="primary" onClick={this.goToPrevPage}><ArrowBackIcon  /></Button>;
        else
            return <Button size="large" disabled variant="outlined" color="primary"><ArrowBackIcon  /></Button>;
    }
    limitSuperiorPage(pageNumber, numPages) {
        if (pageNumber < numPages)
            return <Button size="large" variant="outlined" color="primary" onClick={this.goToNextPage}><ArrowForwardIcon  /></Button>;
        else
            return <Button size="large" disabled variant="outlined" color="primary"><ArrowForwardIcon  /></Button>;
    }

    /*
     *  Description : Method that set the good scale for the PDF viewer (in function of the window size)
     *  Entry : Nothing
     *  Exit : The PDF with the good scale
     */
    setScalePDF() {

        if (this.scale !== window.innerWidth * 0.5 * 0.6 * 0.01 * 0.85 * 0.19)
        {
            this.scale = window.innerWidth * 0.5 * 0.6 * 0.01 * 0.85 * 0.19;
            this.setState({scale: this.scale});
        }
    }


    /*
     *  Description : Method that show the PDF information if it exist
     *  Entry : The index of the line selected
     *  Exit : The PDF
     */
    ifExist() {

        if (this.props.index !== -1)
        {
            if (this.state.path !== "res/" + this.props.competition.path_pdf)
                this.setState({path : "res/" + this.props.competition.path_pdf});

            const { pageNumber, numPages } = this.state;

            this.setScalePDF();

            return (
                <div id="content-2">
                    <div id='header-competition'>
                        <h2>Compétition {this.props.competition.ID_type} du {this.props.competition.date_begin} au {this.props.competition.date_end}</h2>
                        <h3>Organisateur : {this.props.competition.ID_club}</h3>
                        {this.colorStatusHeader(this.props.competition.date_end_inscription)}
                        <nav id='header-competition'>
                            {this.limitInferiorPage(pageNumber)}
                            {this.limitSuperiorPage(pageNumber, numPages)}
                            <Button href={this.state.path} size="large" variant="outlined" color="primary">
                                <PictureAsPdfIcon  />
                            </Button>
                        </nav>

                    </div>

                    <div id='content-body'>
                        <Document
                            file={this.state.path}
                            onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                            id='pdf-reader'
                        >
                            <Page pageNumber={pageNumber} scale={this.scale}/>
                        </Document>
                    </div>
                </div>
            );
        }
    }

    /*
     *  Description : Method that extends the width to 100% if hide is true
     *  Entry : The props hide
     *  Exit : The content with the good width
     */
    ifHide() {

        if (!this.props.hide)
        {
            return (
                <div id='content' >
                    <h1 id='title'>Informations de la compétition</h1>
                    {this.ifExist()}
                </div>
            );
        }
        else
        {
            return (
                <div id='content' style={{width: '100%'}}>
                    <h1 id='title'>Informations de la compétition</h1>
                    {this.ifExist()}
                </div>
            );
        }
    }

    render() {
        return this.ifHide();
    }
}
