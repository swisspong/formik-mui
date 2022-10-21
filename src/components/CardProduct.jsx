import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ orderItem }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ position: "relative" }}>
      {/* <Button
        //   onClick={handleExpandClick}
        type="button"
        size="small"
        sx={{ position: "absolute", right: "0" }}
        variant="contained"
      >
        detail
      </Button> */}
      {/* <IconButton
        aria-label="delete"
        color="error"
        sx={{ position: "absolute", right: "5px",top:"5px" }}
        
      >
        <DeleteIcon  />
      </IconButton> */}
      <CardMedia
        component="img"
        height="194"
        // sx={{ objectFit: "contain" }}
        image={orderItem.url}
        alt="Paella dish"
      />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {orderItem.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${orderItem.price}
          </Typography>
        </Box>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="body1">
            quantity
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="body1">
            Total
          </Typography>
          <Typography gutterBottom variant="body1">
            ${orderItem.price}
          </Typography>
        </Box> */}

        {/* <Button   onClick={handleExpandClick} sx={{width:"100%",}} variant="contained">Detail</Button> */}
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>&nbsp;{orderItem.quantity}&nbsp;</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></ExpandMore>
        <Button
          onClick={handleExpandClick}
          type="button"
          size="small"
          variant="contained"
          disabled
        >
          detail
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
