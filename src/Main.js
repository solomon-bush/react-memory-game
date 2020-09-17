import React from 'react'
import { AppBar, Container, Typography } from '@material-ui/core'
import GameController from './GameController'
export default class Main extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            moves: 0,
            score: 0,
            cardCount: 0
        }
    }


    render() {
        return (
            <div>
                <AppBar position="static">
                    <Typography>React Memory Game</Typography>
                </AppBar>
                <Container style={{ marginTop: '20px' }}>

                    <GameController />

                </Container>

            </div>

        )
    }
}
