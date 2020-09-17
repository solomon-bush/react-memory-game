import React, { Component } from 'react'
import { Grid, Box, Card, CardActionArea, Typography } from '@material-ui/core'
import StarsIcon from '@material-ui/icons/Stars';
export default class FlipCard extends Component {
    handleFlip = () => {
        this.props.handleFlip(this.props.id)
    }
    render() {
        return (

            <Grid item xs={3} >
                <Card>
                    <CardActionArea onClick={this.handleFlip} disabled={this.props.matched}>
                        <Typography>
                            <Box
                                m={3}
                                color={this.props.matched ? 'success.main' : null}
                                textAlign='center'>
                                {!this.props.flipped ?
                                    <Typography variant='h2' > <StarsIcon color='primary' fontSize='inherit' /></Typography>
                                    :
                                    < Typography variant='h2'> {this.props.secret}</Typography>
                                }
                            </Box>

                        </Typography>
                        {/* <p>
                            {'flipped: ' + JSON.stringify(this.props.flipped)}
                            <br />
                            {'matched: ' + JSON.stringify(this.props.matched)}
                        </p> */}
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}
