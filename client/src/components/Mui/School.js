import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        // color: 'red',
    },
    locationCard: {
        border: '2px solid blue',
        height: 300,
        width: 250,
        minWidth: 250,
    }
})


const School = (props) => {
    return (
        props.geometry ? <SchoolLocation {...props} /> : <SavedSchool {...props} />
    )
}

const SavedSchool = (props) => {
    let { _id, owner, address,
        teaches, website, phone,
        name,
        image } = props;
    // console.log('saved school name', name)
    // console.log('geometry:: ', props.geometry)
    let { onRemove } = props;
    // console.log('store.remove', onRemove);

    return (
        <Grid
            item
            xs={6}
            direction="row"
            alignContent="center"
            alignItems="center"
            wrap="wrap"
        >
            <Card style={{
                boxShadow: '1 1px 5px rgba(0,0,0,0.2)',
                minHeight: 250,
                maxHeight: 250,
                padding: '0px 10px',
                paddingTop: '20px',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                // margin: '10px', padding: '3px'
            }}>
                {image &&
                    <CardMedia
                        image={image}
                        title={name}
                    />
                }
                <Typography gutterBottom variant="headline" component="h2">
                    {name}
                </Typography>
                {teaches &&
                    <Typography component="strong">
                        <p><strong>Teaches:</strong> {teaches.join(", ")}</p></Typography>
                }
                {address &&
                    <Typography component="strong">
                        <p><strong>Address:</strong> {address}</p></Typography>
                }
                <CardActions>
                    <Button size="small" color="primary" href={website} target="_blank">
                        Go To School Website
                </Button>
                    <Button size="small" color="secondary" target="_blank" onClick={() => onRemove(_id)}>Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

//if props have geometry and/or formatted_address, then:
const SchoolLocation = withStyles(styles)((props) => {
    // console.log('school keys: ', Object.keys(props));
    // console.log('school props: ', props)
    // console.log('id:', props.place_id)

    let { formatted_address: address,
        name,
        image,
        photos,
        place_id,
        classes,
    } = props;

    let { onLike, onDislike } = props;

    // console.log('photos: ', photos)

    return (
        <Grid
            item
            xs={6}
            direction="row"
            alignContent="center"
            alignItems="center"
            wrap="wrap"
        >
            <Card style={{
                boxShadow: '1 1px 5px rgba(0,0,0,0.2)',
                minHeight: 250,
                maxHeight: 250,
                padding: '0px 10px',
                paddingTop: '20px',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                // margin: '10px', padding: '3px'
            }}>
                {image &&
                    <CardMedia
                    image={image}
                    title={name} />
                }
                {name &&
                    <Typography gutterBottom variant="headline" component="h2">{name}</Typography>
                }

                {address &&
                    <Typography component="p">{address}</Typography>
                }
                <CardActions>
                    {/* <h4>Interested?</h4> */}
                    <Button size="small" color="primary" target="_blank" onClick={() => onLike(place_id)}>Like</Button>
                    <Button size="small" color="secondary" target="_blank" onClick={() => onDislike(place_id)}>Dislike</Button>
                </CardActions>
            </Card>
        </Grid>
    )
})

export default School