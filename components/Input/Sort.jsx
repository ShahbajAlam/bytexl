import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

export default function Sort({
    onSortByPriceAsc,
    onSortByPriceDesc,
    onSortByRatingAsc,
    onSortByRatingDesc,
    sortedByProp,
    setSortedByProp,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                    color: "black",
                    paddingInline: 24,
                    borderRadius: 16,
                    border: "1px solid black",
                    display: "block",
                    margin: "0px 0px 4px auto",
                }}
            >
                Sort
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            onSortByPriceAsc();
                            handleClose();
                            setSortedByProp("Price (Low to High)");
                        }}
                        style={{ fontWeight: "bold" }}
                    >
                        <Typography>Price (Low to High)</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSortByPriceDesc();
                            handleClose();
                            setSortedByProp("Price (High to Low)");
                        }}
                        style={{ fontWeight: "bold" }}
                    >
                        <Typography>Price (High to Low)</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSortByRatingAsc();
                            handleClose();
                            setSortedByProp("Rating (Low to High)");
                        }}
                        style={{ fontWeight: "bold" }}
                    >
                        <Typography>Rating (Low to High)</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onSortByRatingDesc();
                            handleClose();
                            setSortedByProp("Rating (High to Low)");
                        }}
                        style={{ fontWeight: "bold" }}
                    >
                        <Typography>Rating (High to Low)</Typography>
                    </MenuItem>
                </Box>
            </Menu>

            {sortedByProp && <Typography>Sorted by {sortedByProp}</Typography>}
        </Box>
    );
}
