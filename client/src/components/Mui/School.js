import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const School = (props) => {
    return (
        props.geometry ? <SchoolLocation {...props}/> : <SavedSchool {...props}/>
    )
}

const SavedSchool = (props) => {
    let {_id, owner, address,
        teaches, website, phone,
        name,
        image} = props;
    console.log('saved school name', name)
    // console.log('geometry:: ', props.geometry)
    return(
        <Card style={{
            boxShadow: '0 3px 6px black, 0 3px 6px #e45656',
            margin: '10px', padding: '3px'}}>
            {image &&
            <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                image={image}
                title={name}
            />}
            <CardContent>

                <Typography gutterBottom variant="headline" component="h2">
                    {name}
                </Typography>

                {teaches &&
                <Typography component="strong">
                    <p><strong>Teaches:</strong> {teaches.join(", ")}</p></Typography>}
                {address &&
                <Typography component="strong">
                    <p><strong>Address:</strong> {address}</p></Typography>}

            </CardContent>
            <CardActions>
                <Button size="small" color="primary" href={website} target="_blank">
                    Go To School Website
                </Button>
            </CardActions>
        </Card>
    )
}

//if props have geometry and/or formatted_address, then:
const SchoolLocation = (props) => {
    // console.log('school keys: ', Object.keys(props));
    // console.log('school props: ', props)
    // console.log('id:', props.place_id)

    let {formatted_address:address,
        name,
        image,
        photos,
        place_id,
    } = props;

    let {onLike, onDislike} = props;
    console.log(!!onDislike);
    console.log('photos: ', props.photos)

    return (
        <Card style={{
            boxShadow: '0 3px 6px #e45656, 0 3px 6px #e45656',
            margin: '10px', padding: '3px'}}>
            {image &&
                <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={image}
                    title={name}/>}
            <CardContent>

                <Typography gutterBottom variant="headline" component="h2">
                    {name}
                </Typography>

                {address &&
                    <Typography component="p">{address}</Typography>}

            </CardContent>
            <CardActions>
                {/* <h4>Interested?</h4> */}
                <Button size="small" color="primary" target="_blank" onClick={()=>onLike(place_id)}>Like</Button>
                <Button size="small" color="secondary" target="_blank" onClick={onDislike}>Dislike</Button>
            </CardActions>
        </Card>
    )}

export default School