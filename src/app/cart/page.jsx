"use client";

import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
  Divider,
  TextField,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Slide,
  Snackbar,
  Chip,
  Backdrop,
} from "@mui/material";
import { Add, Remove, Delete, Info } from "@mui/icons-material";
import DefaultBanner from "../../components/DefaultBanner/Banner";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
} from "../../../redux/sections/cart/cartSlice";
import MuiAlert from "@mui/material/Alert";
import AnimatedLoader from "../../components/Loader/Loader";
import { Edit } from "@mui/icons-material";
import Image from "next/image";
import cart from "../../../public/assets/emptycart.webp"
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems, discount } = useSelector((state) => state.cart);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const deliveryMethod = "standard";

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOpenModal = () => {
    setSpecialInstructions(specialInstructions); // Set current special instructions in the modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setError(""); // Clear error when closing modal
  };

  const handleSaveInstructions = () => {
    specialInstructions; // Update the formValues with the new instructions
    handleCloseModal(); // Close the modal
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    const orderData = {
      cart: cartItems.map((item) => ({
        _id: item.id,
        name: item.name,
        price: item.price,
        images: [item.image],
        qty: item.quantity,
      })),
      comment: specialInstructions,
      paymentMode: "card",
      deliveryMethod: deliveryMethod,
    };

    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/create`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        window.location.href = data.data.url; // Redirect to the order confirmation page
      } else {
        setLoading(false);
        const error = await response.json();
        setSnackbarMessage(error.message || "Failed to create order");
        setShowSnackbar(true);
      }
    } catch (error) {
      setLoading(false);
      setSnackbarMessage("Error creating order. Please try again.");
      setShowSnackbar(true);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item?.price) || 0) * item.quantity,
    0
  );

  const final = totalPrice + 50;
  const discountedPrice =
    totalPrice - (totalPrice * (parseFloat(discount) || 0)) / 100;

  return (
    <>
      {loading && <AnimatedLoader />}

      <DefaultBanner name=" Shopping Cart" />
      <Container maxWidth="lg">
       

        {loading ? (
          <></>
        ) : cartItems.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Image width="200px" height="100%" src={cart} />

            <Button
              variant="contained"
              component={Link}
              href="/shop"
              sx={{ mt: 2, backgroundColor: "#63A0A2" }}
            >
              Shop Now
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  sx={{ display: "flex", mb: 2, border: "1px solid #63A0A2" }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={item.image || "/path/to/default-image.png"}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">{item.name}</Typography>
                      <IconButton onClick={() => handleRemoveItem(item.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                    <Typography variant="body1">
                      Price: ${parseFloat(item.price || "0").toFixed(2)}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                        type="number"
                        sx={{ width: 60, mx: 2 }}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Math.max(1, parseInt(e.target.value, 10))
                          )
                        }
                      />
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="contained"
                onClick={handleClearCart}
                disabled={cartItems.length === 0}
                sx={{ mt: 2, backgroundColor: "#63A0A2" }}
              >
                Clear Cart
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  p: 3,
                  boxShadow: 4,
                  borderRadius: 2,
                  bgcolor: "linear-gradient(135deg, #e0f7fa 30%, #80deea 90%)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 8,
                  },
                  border: "1px solid #63A0A2",
                }}
              >
                <Typography variant="h5" align="center" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body1" color="text.secondary">
                    Total Items:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    {/* <Tooltip title="Total Items" arrow>
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body1" color="text.secondary">
                    Total Price:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${totalPrice.toFixed(2)}
                    {/* <Tooltip title="Total price" arrow>
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                  </Typography>
                </Box>
                {/* 
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
      <Typography variant="body1" color="text.secondary">Discount:</Typography>
      <Chip label={`-${discount}%`} color="success" size="small" />
    </Box> */}

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body1" color="text.secondary">
                    Shipping Charge:
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" fontWeight="bold">
                      $50
                    </Typography>
                    {/* <Tooltip
                      title="Note: This may vary as per your shipping address"
                      arrow
                    >
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <Info fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h6">Final Price:</Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight="bold"
                  >
                    ${final.toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Link href={"/checkout-details"}>
                  {/* <Link href="#" onClick={handleCreateOrder}> */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mb: 1,
                      bgcolor: "#63A0A2",
                      "&:hover": { bgcolor: "#63A0A2" },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                {!specialInstructions && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenModal}
                    sx={{
                      mb: 1,
                      borderColor: "#63A0A2",
                      color: "#63A0A2",
                      borderRadius: 20,
                      "&:hover": {
                        backgroundColor: "#63A0A2",
                        color: "white",
                        borderColor: "#63A0A2",
                      },
                    }}
                  >
                    Add Special Instructions
                  </Button>
                )}

                {specialInstructions && (
                  <Box
                    sx={{
                      backgroundColor: "#f1f1f1",
                      padding: 2,
                      borderRadius: 2,
                      boxShadow: 2,
                      marginTop: 2,
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        Special Instructions:
                      </Typography>
                      <Tooltip title="Edit Special Instructions">
                        <IconButton
                          onClick={handleOpenModal}
                          sx={{ color: "#63A0A2" }}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {specialInstructions}
                    </Typography>
                  </Box>
                )}

                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Special Instructions Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            padding: 3,
          },
        }}
      >
        <Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
          <div>
            <DialogTitle
              sx={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#333",
                textAlign: "center",
              }}
            >
              Special Instructions
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Special Instructions"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 1.5,
                    backgroundColor: "#f5f5f5",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ddd",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#63A0A2",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSaveInstructions}
                fullWidth
                sx={{
                  backgroundColor: "#63A0A2",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  "&:hover": {
                    backgroundColor: "#63A0A2",
                  },
                }}
              >
                Save Instructions
              </Button>
            </DialogContent>
          </div>
        </Slide>
      </Dialog>

      {/* Snackbar for error messages */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartPage;
