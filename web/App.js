import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomNavBar from "./components/CommonNavBar";
import ImageComponent from "./components/ImageComponent";
import {Col, Container, Row} from "react-bootstrap";
import UploadComponent from "./components/UploadComponent";
import OutputComponent from "./components/OutputComponent";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            base64: "",
            text: ""
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({
                base64: reader.result
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    handleUpload(event) {
        console.log("Uploaded");
        // console.log(event.target.files[0]);
        this.setState({
            url: URL.createObjectURL(event.target.files[0])
        });
        this.getBase64(event.target.files[0]);
    }

    async handleSubmit() {
        console.log("Handling submit");
        console.log(process);
        console.log(process.env);
        // console.log(this.state.base64);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('OPTIONS');
        // TODO: change the address here
        await fetch(`/predict`, { // http://${this.IP_ADDRESS}
            method: 'POST',
            body: JSON.stringify({image: this.state.base64}),
            headers: headers
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                text: data.pred
            })
        });

        // this.setState({
        //     text: response.data
        // })
    }

    render() {
        return (
            <div>
                <CustomNavBar/>
                <br/>
                <Container>
                    <Row>
                        <Col>
                            <ImageComponent url={this.state.url}/>
                        </Col>
                        <Col>
                            <UploadComponent
                                handleSubmit={this.handleSubmit}
                                handleUpload={this.handleUpload}
                            />
                            <OutputComponent text={this.state.text}/>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default App
