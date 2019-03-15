import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const School = (props) => {
    console.log('school props: ', props)
    return (
        props.geometry ? <SchoolLocation {...props}/> : <SavedLocation {...props}/>
    )
}

const SavedLocation = (props) => {
    let {_id, owner, address,
        teaches, website, phone,
        location: schoolName,
        image} = props;

    console.log('geometry:: ', props.geometry)
    return(
        <Card>
            {image &&
            <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                image={image}
                title={schoolName}
            />}
            <CardContent>

                <Typography gutterBottom variant="headline" component="h2">
                    {schoolName}
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

    let {formatted_address:address,
        name: schoolName,
        image} = props;

    return (
        <Card>
            {image &&
                <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={image}
                    title={schoolName}/>}
            <CardContent>

                <Typography gutterBottom variant="headline" component="h2">
                    {schoolName}
                </Typography>

                {address &&
                    <Typography component="p">{address}</Typography>}

            </CardContent>
            {/* <CardActions>
                <Button size="small" color="primary" href={website} target="_blank">
                    Go To School Website
                </Button>
            </CardActions> */}
        </Card>
)}

export default School