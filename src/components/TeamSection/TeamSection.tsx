import axios from "axios";
import csv from "csvtojson";
import * as React from "react";
import { Container } from "reactstrap";
import Row from "reactstrap/lib/Row";
import MemberItem from "./MemberItem/MemberItem";
import "./TeamSection.scss";

const MEMBER_LIST_FILE_PATH = "/about/members.json";

export interface Member {
    name: string;
    part: string;
    medium?: string | null;
    github?: string | null;
    twitter?: string | null;
    photo: string;
    id: number;
}

interface State {
    members?: Member[] | null;
}
export default class TeamSection extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            members: undefined
        };
    }
    public async componentDidMount() {
        try {
            const members = await this.loadMembers();
            this.setState({
                members
            });
        } catch (e) {
            console.error(e);
        }
    }
    public render() {
        const { members } = this.state;
        return (
            <div className="Team-section">
                <Container>
                    <div className="section-name-container">
                        <div className="section-title-container">
                            <span className="section-title">Team</span>
                        </div>
                    </div>
                    <div className="member-list-container">
                        {members ? (
                            <Row>
                                {members.map(member => (
                                    <MemberItem
                                        member={member}
                                        key={member.id}
                                    />
                                ))}
                                <MemberItem />
                            </Row>
                        ) : (
                            <div className="text-center">
                                <div className="loader" />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        );
    }
    private loadMembers = (): Promise<Member[]> => {
        return new Promise((resolve, reject) => {
            axios
                .get<Member[]>(MEMBER_LIST_FILE_PATH)
                .then(result => {
                    resolve(result.data);
                })
                .catch(reject);
        });
    };
}
