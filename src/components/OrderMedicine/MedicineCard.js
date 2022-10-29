import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Chip, Divider, Rating, Tooltip } from "@mui/material";

export default function MedicineCard({
  medicine,
  handleCartDetails,
  cartDetails,
}) {
  const medicineName = medicine.get("Name");
  const name =
    medicineName.charAt(0).toUpperCase() + medicineName.slice(1).toLowerCase();

  const description = medicine.get("Description");
  const rating = medicine.get("Rating");
  const stock = medicine.get("Stock");
  const image = medicine.get("Image");
  const price = medicine.get("Price");

  return (
    <Card sx={{ maxWidth: 220, p: "10px 10px 0 10px" }}>
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
        <Rating name="read-only" value={rating} readOnly />
        {cartDetails && cartDetails.cartCount ? (
          <>
            <IconButton
              aria-label="add-item"
              disabled={cartDetails.cartCount === stock}
              onClick={(e) => handleCartDetails("add", cartDetails)}
            >
              <AddIcon />
            </IconButton>

            {cartDetails.cartCount}

            <IconButton
              aria-label="remove-item"
              onClick={(e) => handleCartDetails("remove", cartDetails)}
            >
              <RemoveIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            disabled={stock === 0}
            aria-label="add to cart"
            title="add to cart"
            onClick={(e) => handleCartDetails("add", cartDetails)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
