import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { Chip, Divider, Rating, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function MedicineCard({
  product,
  handleCartDetails = () => {},
  isRecentProduct = false,
}) {
  const { name, description, rating, stock, image, price, cartCount } = product;

  return (
    <Card sx={{ maxWidth: 240, p: "10px 10px 0 10px" }}>
      <Chip
        color={stock > 0 ? "success" : "error"}
        label={stock > 0 ? "In stock" : "out of stock"}
        sx={{ p: 1 }}
        size="small"
      />
      <Tooltip title={name} arrow>
        <CardHeader subheader={name} />
      </Tooltip>
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Divider>
        <Chip label={`Price - ${price}`} size="medium" />
      </Divider>
      <CardActions disableSpacing>
        <Rating name="read-only" value={rating} precision={0.5} readOnly />
        {cartCount > 0 ? (
          <>
            <IconButton
              aria-label="add-item"
              disabled={cartCount === stock}
              onClick={() => handleCartDetails("add", product)}
            >
              <AddIcon />
            </IconButton>

            {cartCount}

            <IconButton
              aria-label="remove-item"
              onClick={() => handleCartDetails("remove", product)}
            >
              <RemoveIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            disabled={stock === 0}
            aria-label="add to cart"
            title="add to cart"
            onClick={() => handleCartDetails("add", product)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
        {isRecentProduct && (
          <Chip
            color={stock > 0 ? "success" : "error"}
            disabled={!stock}
            label="Refill"
            onClick={() => handleCartDetails("add", product)}
          />
        )}
      </CardActions>
    </Card>
  );
}
