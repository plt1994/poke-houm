import React, { Component } from 'react'
import { PokeCard } from "./PokeCard"
import { Container, Pagination } from "react-bootstrap";

export class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemons: [],
            isLoaded: false,
            total: 1,
            next: null,
            previous: null,
        }
    }

    componentDidMount() {
        this.setState({
            pokemons: this.props.data.pokemons,
            isLoaded: true,
            total: this.props.data.total,
            next: this.props.data.next,
            previous: this.props.data.previous,
        });
    }

    // componentDidUpdate() {
    //     console.log(this.state);
    // }

    onPageChanged(url) {
        fetch(url)
            .then(response => response.json())
            .then(pokemons => {
                this.setState({
                    pokemons: pokemons.results,
                    isLoaded: true,
                    total: pokemons.count,
                    next: pokemons.next,
                    previous: pokemons.previous,
                })
            });
    }

    render() {
        return (
            <Container>

                <Container>
                    <Pagination>
                        <Pagination.Prev onClick={() => { this.onPageChanged(this.state.previous) }} />
                        <Pagination.Next onClick={() => { this.onPageChanged(this.state.next) }} />
                    </Pagination>
                </Container>
                <div className="card-columns">
                    {this.state.pokemons.map((pokemon, index) =>
                        <PokeCard
                            id={index}
                            data={pokemon}
                        />


                    )}
                </div>
                <Container>
                    <Pagination>
                        <Pagination.Prev onClick={() => { this.onPageChanged(this.state.previous) }} />
                        <Pagination.Next onClick={() => { this.onPageChanged(this.state.next) }} />
                    </Pagination>
                </Container>
            </Container >
        )
    }
}

export default Main
