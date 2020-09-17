import React, { Component } from 'react'
import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import DetailsGrid from './Components/DetailsGrid'
import CardContainer from './CardContainer'

const GAME_STATES = {
    PAUSED: "paused",
    RUNNING: "running",
    STOPPED: "stopped"
}

export default class GameController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moves: 0,
            score: 0,
            cardCount: 0,
            completedGame: false,
            gameState: GAME_STATES.STOPPED,
            timer: null,
            time: 0
        }
    }
    padTwo = number => number <= 60 ? `0${number}`.slice(-2) : number;

    incrementMove = () => { this.setState({ moves: this.state.moves + 1 }) }
    incrementScore = () => {

        this.setState({ score: this.state.score + 1 })

        if (this.state.score + 1 === this.state.cardCount) {
            setTimeout(() => {
                this.handleComplete()
            }, 700)
        }

    }

    handleComplete = () => {
        this.stopTimer()
        this.setState({ gameState: GAME_STATES.STOPPED, completedGame: true })
    }
    handleStart = () => {
        this.setState({ gameState: GAME_STATES.RUNNING, completedGame: false, moves: 0, score: 0, cardCount: 8 })
        this.initTimer()
    }
    handleResume = () => {
        this.setState({ gameState: GAME_STATES.RUNNING })
        this.initTimer()
    }

    handleStop = () => {
        this.setState({ gameState: GAME_STATES.STOPPED })
        this.stopTimer()
    }

    handlePause = () => {
        this.setState({ gameState: GAME_STATES.PAUSED })
        this.pauseTimer()
    }

    initTimer = () => {
        this.setState({
            timer: (setInterval(() => {
                this.setState({ time: this.state.time + 1 })
            }, 1000))
        })
    }
    pauseTimer = () => {
        clearInterval(this.state.timer)
    }
    stopTimer = () => {
        clearInterval(this.state.timer)
        this.setState({ time: 0 })
    }

    renderActions = () => {
        switch (this.state.gameState) {
            case GAME_STATES.PAUSED:
                return (
                    <CardContent>
                        <Button fullWidth startIcon={<PlayCircleFilledWhiteIcon />} onClick={() => this.handleResume()}>
                            Resume
                        </Button>
                        <Button fullWidth startIcon={<StopIcon />} onClick={() => this.handleStop()}>
                            Quit
                        </Button>
                    </CardContent>
                )
            case GAME_STATES.RUNNING:
                return (
                    <CardContent>
                        <Button fullWidth startIcon={<PauseCircleFilledIcon />} onClick={() => this.handlePause()}>
                            Pause
                        </Button>
                        <Button fullWidth startIcon={<StopIcon />} onClick={() => this.handleStop()}>
                            Quit
                        </Button>
                    </CardContent>
                )
            case GAME_STATES.STOPPED:
                return (
                    <CardContent>
                        <Button fullWidth startIcon={<PlayCircleFilledWhiteIcon />} onClick={() => this.handleStart()}>
                            Start
                        </Button>
                        <Button fullWidth disabled startIcon={<StopIcon />} onClick={() => this.handleStop()}>
                            Quit
                        </Button>
                    </CardContent>
                )
            default:
                return (
                    <CardContent>
                        <Button fullWidth startIcon={<PlayCircleFilledWhiteIcon />} onClick={() => this.handleStart()}>
                            Start
                        </Button>
                        <Button fullWidth disabled startIcon={<StopIcon />} onClick={() => this.handleStop()}>
                            Quit
                        </Button>
                    </CardContent>
                )
        }
    }

    render() {
        return (
            <Grid container spacing={2} direction='column' >
                <Grid item xs={12} >
                    <Card elevation={3} square>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch"
                                spacing={3}
                            >
                                <Grid item xs={3} >
                                    <Card style={{ height: '100%' }}>
                                        {this.renderActions()}
                                    </Card>
                                </Grid>
                                <Grid item xs={4} >
                                    <Card style={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant='h2'>
                                                {Math.floor(this.state.time / 60)}:{this.padTwo(this.state.time % 60)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card style={{ height: '100%' }}>
                                        <CardContent>
                                            <DetailsGrid items={[{ key: 'Score', val: this.state.score },
                                            { key: 'Moves', val: this.state.moves },
                                            { key: 'Total cards', val: this.state.cardCount }]
                                            } />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>

                    </Card>
                </Grid>
                <Grid item xs={12} >
                    {this.state.gameState === GAME_STATES.RUNNING || this.state.gameState === GAME_STATES.PAUSED ?
                        <CardContainer
                            incrementMove={this.incrementMove}
                            incrementScore={this.incrementScore}
                            cardCount={this.state.cardCount}
                        /> :
                        this.state.completedGame ?
                            <Card>
                                <CardHeader title='Results' />
                                <CardContent>
                                    <DetailsGrid items={[{ key: 'Score', val: this.state.score },
                                    { key: 'Moves', val: this.state.moves },
                                    { key: 'Total cards', val: this.state.cardCount }]
                                    } />
                                </CardContent>
                            </Card>
                            : null
                    }

                </Grid>
            </Grid>

        )
    }
}
