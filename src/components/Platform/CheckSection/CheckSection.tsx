import * as React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "./CheckSection.scss";

export default class CheckSection extends React.Component<any, any> {
    public render() {
        return (
            <div className="Platform-check-section">
                <Container>
                    <Row>
                        <Col md={6} className="check-it-container">
                            <div className="d-md-flex align-items-center justify-content-center">
                                <div className="more-text">Check it out</div>
                                <div>
                                    <Link to="/source">
                                        <div className="custom-btn more-btn reverse">
                                            Source Code
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="d-md-flex align-items-center justify-content-center">
                                <div className="more-text">Read more</div>
                                <div>
                                    <a
                                        target="_blank"
                                        href="/CodeChain_white_paper_v1.pdf"
                                    >
                                        <div className="custom-btn more-btn reverse">
                                            White paper
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}