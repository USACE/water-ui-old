import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const cardStyles = makeStyles({
  root: {
    maxWidth: 1200,
  },
  media: {
    height: 140,
    width: 250

  },
});

export default ({ title, text, img, imgAlt, href }) => {
  const classes = cardStyles();

  return (
  // <a href={href}>
  //   <div className="max-w-xs rounded overflow-hidden shadow-lg hover:shadow-2xl">
  //     <img className="w-full" src={img} alt={imgAlt} />
  //     <div className="px-6 py-4">
  //       <div className="font-bold text-xl mb-2">{title}</div>
  //       <p className="text-gray-700 text-base">{text}</p>
  //     </div>
  //     <div className="px-6 py-4"></div>
  //   </div>
  // </a>
  <Card className={classes.root}>
    <CardMedia
      className={classes.media}
      image={img}
      title={imgAlt}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {text}
      </Typography>
    </CardContent>
</Card>
)};
