import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={8}>
                            <Form>
                                <Form.File
                                    id="custom-file"
                                    label="Enter your file"
                                    onChange={this.props.handleUpload}
                                    custom
                                />
                            </Form>
                        </Col>
                        <Col>
                            <Button variant="primary"
                                    type="button"
                                    onClick={this.props.handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default UploadComponent