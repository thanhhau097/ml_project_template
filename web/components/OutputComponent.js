import React from "react";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";

class OutputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>Output:</Card.Title>
                        <Card.Text>
                            {this.props.text}
                        </Card.Text>
                        {/*<Button variant="primary">Report</Button>*/}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default OutputComponent