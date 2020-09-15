import React, { Component } from 'react'
import { Grid, Card, CardHeader, CardActionArea } from '@material-ui/core'
export default class FlipCard extends Component {
    handleFlip = () => {
        this.props.handleFlip(this.props.id)
    }
    render() {
        return (

            <Grid item xs={3} >
                <Card>
                    <CardActionArea onClick={this.handleFlip} disabled={this.props.matched}>
                        <CardHeader title={
                            this.props.flipped ? this.props.secret : this.props.front
                        } />
                        <p>
                            {'flipped: ' + JSON.stringify(this.props.flipped)}
                            <br />
                            {'matched: ' + JSON.stringify(this.props.matched)}
                        </p>
                    </CardActionArea>

                </Card>

            </Grid>
        )
    }
}
