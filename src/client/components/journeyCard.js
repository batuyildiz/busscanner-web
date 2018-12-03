import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Mixpanel from '../utils/mixpanel';

const styles = {
  media: {
    height: 140,
  },
  icons: {
    fontSize: 16,
    marginRight: 10,
    position: 'relative',
    top: '3px',
  }
};

function handleClick(url, order, flixuid) {
  Mixpanel.track('ClickThroughSuccess', { order, flix_uid: flixuid });
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
    url,
    rate,
    isTwoWay,
    order,
    flixuid,
  } = props;
  return (
    <Card className="card-item">
      <CardActionArea>
        <CardHeader
          title={`Save up to ${rate}%`}
          style={{ color: '#471719' }}
        />
        <CardMedia
          className="card-media"
          image={image}
          title={title}
          style={styles.media}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="caption" component="p">
            {text}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={styles.icons}>calendar_today</Icon>
            {date}
            {isTwoWay ? (
              <Icon
                color="inherit"
                style={{
                  fontSize: 16, marginRight: 7, marginLeft: 7, position: 'relative', top: '3px'
                }}
              >
                swap_horiz
              </Icon>
            ) : ''}
            {isTwoWay}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={styles.icons}>map</Icon>
            {`${duration}`}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={styles.icons}>restore</Icon>
            {`${time}`}
          </Typography>
          <Typography component="p">
            <Icon color="primary" style={styles.icons}>money</Icon>
            {`${isTwoWay ? 'from ' : ''}€ ${price}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={() => handleClick(url, order, flixuid)}>
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
  rate: PropTypes.string.isRequired,
  isTwoWay: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  flixuid: PropTypes.string.isRequired,
};

export default JourneyCard;
