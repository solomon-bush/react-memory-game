import React from 'react'
import { Container, AppBar, Typography, Grid, Card, } from '@material-ui/core'
import FlipCard from './FlipCard';
export default class Main extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cardCount: 16,
            cards: null,
            secrets: null,
            flips: 0,
            cardOne: null,
            cardTwo: null,
            mem: null,
            canFlip: true
        }
    }
    componentDidMount = () => {
        if (this.state.cardCount === null || this.state.cardCount === 0) {
            throw (new Error('invalid Card count - Cannot be null, undefined, or 0'))
        }
        else if (!Number(this.state.cardCount)) {
            throw (new Error('invalid Card count - Must be a number'))
        }
        else if (this.state.cardCount % 2 !== 0) {
            throw (new Error('invalid Card count - Must be an even number'))
        }
        else if (this.state.cardCount > 52) {
            throw (new Error('invalid Card count - Must be 52 or less'))
        }
        this.generateSecrets().then(() => {
            this.generateCards()
        })
    }
    generateRandomLetter = () => {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return chars.charAt(Math.floor(Math.random() * 26))
    }

    flipCard = (id) => {
        let cards = this.state.cards.map((card, i) => {
            if (i === id) {
                card.flipped = !card.flipped
                return card
            } else {
                return card
            }
        })
        this.setState({ cards })
    }
    matchCards = (a, b) => {
        let cards = this.state.cards.map(card => {
            if (card.id === a.id || card.id === b.id) {
                card.matched = true
                return card
            } else {
                return card
            }
        })
        this.setState({ cards })
    }
    compareCards = () => {
        let check_cards = this.state.cards.filter(card => card.flipped === true && card.matched === false)
        if (check_cards[0].secret === check_cards[1].secret) {
            this.matchCards(check_cards[0], check_cards[1])
        }
    }
    flipNonMatches = () => {
        let cards = this.state.cards.map(card => {
            if (!card.matched) {
                card.flipped = false
                return card
            } else {
                return card
            }
        })
        this.setState({ cards })
    }

    handleFlip = (id) => {
        console.log('flips: ' + this.state.flips)
        if (this.state.canFlip) {
            if (this.state.flips === 0) {
                this.flipCard(id)
                this.setState({ flips: this.state.flips + 1 })
                this.setState({ mem: id })
            } else {
                if (id !== this.state.mem) {
                    this.flipCard(id)
                    this.setState({ canFlip: false })
                    setTimeout(() => {
                        this.compareCards()
                        this.flipNonMatches()
                        this.setState({ flips: 0, canFlip: true })

                    }, 1000)

                }
            }
        }

    }
    // This code was taken from Stack Overflow. 
    // [Link]: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    generateSecrets = () => {
        return new Promise((resolve, reject) => {
            let secrets = []
            let id = 0
            for (let i = 0; i < this.state.cardCount / 2; i++) {
                let secret = this.generateRandomLetter()
                let assigned = false
                secrets.push({ id, secret, assigned })
                id++
                secrets.push({ id, secret, assigned })
                id++
            }
            this.shuffleArray(secrets)
            this.setState({ secrets })
            resolve()
        })


    }
    pluckSecret = () => {
        let returnSecret = null
        let secrets = this.state.secrets.map(secret => {
            if (returnSecret === null && !secret.assigned) {
                secret.assigned = true
                returnSecret = secret
                return secret
            } else {
                return secret
            }
        })
        this.setState({ secrets })
        return returnSecret
    }

    generateCards = () => {

        let cards = []
        for (let i = 0; i < this.state.cardCount; i++) {
            cards.push({ id: i, front: i, secret: (this.pluckSecret()).secret, matched: false, flipped: false })
        }
        this.setState({ cards })
    }
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Typography>React Memory Game</Typography>
                </AppBar>

                <Container maxWidth='md' style={{ marginTop: '20px' }}>
                    <Grid container spacing={2}>
                        {this.state.cards !== null ? this.state.cards.map(card => {
                            return (
                                <FlipCard
                                    key={card.id}
                                    id={card.id}
                                    secret={card.secret}
                                    front={card.front}
                                    matched={card.matched}
                                    flipped={card.flipped}
                                    handleFlip={this.handleFlip}
                                />
                            )
                        }) : <Card>No Cards Loaded</Card>}
                    </Grid>
                </Container>
            </div>

        )
    }
}
