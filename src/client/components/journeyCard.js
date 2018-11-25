import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = {
  media: {
    height: 140,
  },
};

function handleClick(url) {
  window.open(
    url,
    '_blank'
  );
}

const JourneyCard = (props) => {
  const {
    title,
    text,
    image,
    duration,
    date,
    time,
    price,
    url
  } = props;
  return (
    <Card className="card-item">
      <CardActionArea>
        <CardMedia
          className="card-media"
          image={image}
          title={title}
          style={styles.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="caption" component="p">
            {text}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={{ fontSize: 14, marginRight: 10 }}>map</Icon>
            {`${duration} minutes`}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={{ fontSize: 14, marginRight: 10 }}>calendar_today</Icon>
            {`${date}`}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={{ fontSize: 14, marginRight: 10 }}>restore</Icon>
            {`${time}`}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={{ fontSize: 14, marginRight: 10 }}>money</Icon>
            {`€ ${price}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={() => handleClick(url)}>
          Go to ticket
        </Button>
      </CardActions>
    </Card>
  );
};

JourneyCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default JourneyCard;
