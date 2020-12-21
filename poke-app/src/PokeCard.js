import React from 'react'
import { Badge, Table, Spinner, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

export class PokeCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            img: "",
            location: "",
            stats: "",
            types: "",
            isLoaded: false,
        }
    }

    getData() {
        fetch(this.props.data.url)
            .then(response => response.json())
            .then(pokemon => {
                this.setState({
                    img: pokemon.sprites.other["official-artwork"].front_default,
                    location: pokemon.location_area_encounters,
                    stats: pokemon.stats,
                    types: pokemon.types,
                    isLoaded: true,
                })
            }).then(console.log(this.state))
    }

    showDetails() {
        console.log(this.state.name)
    }

    render() {
        this.getData();
        if (this.state.isLoaded === false) {
            return (
                <Card>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Card>
            )
        }
        return (
            <div onClick={() => (this.showDetails())} href={"/detail"}>

                <Card key={"card-" + this.props.id} style={{ "background-color": "#ff5000" }} className="mb-2">
                    <Card.Img src={this.state.img} className="img-fluid img-thumbnail" alt="Responsive image" />
                    <Card.Body>
                        <Card.Title style={{
                            color: "#fff",
                            "text-transform": "capitalize",
                            "text-align": "center",
                        }}>
                            {this.props.data.name}
                        </Card.Title>
                        <Card.Text>
                            <Card>
                                <Table striped bordered hover size="sm" variant="light">
                                    <thead>
                                        <tr>
                                            <th>Stat</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.stats.map((stat) =>
                                            <tr>
                                                <td>{stat.stat.name}</td>
                                                <td>{stat.base_stat}</td>
                                            </tr>)}


                                    </tbody>
                                </Table>
                                {this.state.types.map((type) => (
                                    <Badge variant="secondary">{type.type.name}</Badge>

                                ))}
                            </Card>


                        </Card.Text>
                    </Card.Body>
                </Card>
            </div >
        )
    }

}


export default PokeCard