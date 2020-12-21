import React from 'react'
import ReactDom from 'react-dom'

import { Header } from "./Header.js"
import { Main } from "./Main"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Buscar from './Buscar.js';
import Loading from './Loading.js';

const api = "https://pokeapi.co/api/v2/";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            isLoaded: false,
            total: 1,
            next: null,
            previous: null,
        };
    }

    componentDidMount() {
        let url = api + "pokemon/"
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
            })
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <Loading />
            )
        } else {
            return (
                <div>
                    <BrowserRouter>
                        <div>
                            <Route
                                path="/"
                                render={(props) => (
                                    <Header
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path="/home"
                                exact={true}
                                render={({ match }) => (
                                    <Main
                                        data={this.state}
                                    />
                                )}
                            />
                            <Switch>
                                <Route
                                    path="/buscar"
                                    exact={true}
                                    render={({ match }) =>
                                        <Buscar
                                        />
                                    }
                                />
                            </Switch>
                        </div>
                        <Redirect exact from="/" to="/home" />
                    </BrowserRouter>

                </div>


            );
        }

    }

}




ReactDom.render(<App />, document.getElementById('root'))