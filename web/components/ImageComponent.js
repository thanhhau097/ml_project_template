import React from "react";
import {Button, Image} from "react-bootstrap";


class ImageComponent extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Image src={this.props.url} thumbnail/>
            </div>

        )
    }
}

export default ImageComponent