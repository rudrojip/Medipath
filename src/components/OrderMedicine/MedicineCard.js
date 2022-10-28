import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Chip, Divider, Rating } from "@mui/material";

export default function MedicineCard() {
  return (
    <Card sx={{ maxWidth: 220 }}>
      <CardHeader subheader="Shrimp and Chorizo Paella" />
      <CardMedia
        component="img"
        height="200"
        image="http://dummyimage.com/200x200.png/dddddd/000000"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <Divider>
        <Chip label="Price - $100" size="medium" />
      </Divider>
      <CardActions disableSpacing>
        <Rating
          name="read-only"
          value={Math.floor(Math.random() * 5) + 1}
          readOnly
        />
        <IconButton aria-label="add to cart" title="add to cart">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="share" title="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
