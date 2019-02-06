import axios from "axios";
import csv from "csvtojson";
import * as React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import TalkItem from "./TalkItem/TalkItem";
import "./TalksSection.scss";

const TALK_LIST_FILE_PATH =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQtstYc3_eEpblu0zq9tM-E8atlklg1DSw843v_KYC5iLkdDA5DaieHeRVcCiEesLAVV2a2vwe23W6w/pub?gid=0&single=true&output=csv";

export interface Talk {
    id: number;
    title: string;
    date: string;
    link: string;
}

interface State {
    talks?: Talk[] | null;
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export default class TalksSection extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            talks: undefined
        };
    }
    public async componentDidMount() {
        try {
            const talks = await this.loadTalks();
            console.log(talks);
            this.setState({
                talks
            });
        } catch (e) {
            console.error(e);
        }
    }
    public render() {
        const { talks } = this.state;
        return (
            <div className="Talks-section">
                <Container>
                    <div className="section-name-container">
                        <div className="section-title-container">
                            <span className="section-title reverse">Talks</span>
                        </div>
                    </div>
                    <div>
                        {talks ? (
                            <div>
                                <Slider {...settings}>
                                    {talks.map(talk => (
                                        <TalkItem key={talk.id} talk={talk} />
                                    ))}
                                </Slider>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="loader reverse" />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        );
    }
    private loadTalks = (): Promise<Talk[]> => {
        return new Promise((resolve, reject) => {
            axios
                .get<string>(TALK_LIST_FILE_PATH)
                .then(result => {
                    csv()
                        .fromString(result.data)
                        .then(resolve);
                })
                .catch(reject);
        });
    };
}
