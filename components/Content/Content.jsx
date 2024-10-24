import Grid from "@mui/material/Grid2";
import styles from "./Content.module.css";
import { Box, Chip, Rating, Typography } from "@mui/material";

const Content = ({ dataProp }) => {
    return (
        <>
            <Typography textAlign="center" fontWeight="bold">
                {dataProp.length === 0
                    ? "No book found"
                    : `${dataProp.length} books found`}
            </Typography>
            <Grid container spacing={2} padding={2}>
                {dataProp.map((item) => (
                    <Grid
                        gap={5}
                        size={3}
                        key={item.title}
                        style={{
                            position: "relative",
                            zIndex: -1,
                        }}
                    >
                        <Chip
                            color="warning"
                            label={item.category}
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                borderRadius: "8px 0 8px 8px",
                            }}
                        />

                        <img src="/book.webp" style={{ width: "100%" }} />
                        <Box className={styles.container}>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5,
                                }}
                            >
                                <Typography
                                    style={{
                                        fontWeight: "bolder",
                                        lineHeight: 1.2,
                                    }}
                                    variant="h6"
                                >
                                    {item.title}
                                </Typography>
                                <Typography>{item.author}</Typography>
                            </Box>

                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5,
                                }}
                            >
                                <Typography fontWeight="bold" textAlign="right">
                                    &#x24;{item.price}
                                </Typography>
                                <Typography>
                                    <Rating
                                        defaultValue={item.rating}
                                        name="half-rating-read"
                                        precision={0.1}
                                        readOnly
                                        size="small"
                                        style={{ color: "red", zIndex: -1 }}
                                    />
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Content;
