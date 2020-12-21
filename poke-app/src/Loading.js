import React, { Component } from 'react'
import { Spinner } from "react-bootstrap";

export class Loading extends Component {
    render() {
        return (
            <Spinner animation="grow" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }
}

export default Loading
