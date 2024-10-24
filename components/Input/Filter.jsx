import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Category from "./Category";
import { Box, Typography } from "@mui/material";
import Rating from "./Rating";
import { ratingCategories } from "../../src/App";

export default function Filter({
    onFilter,
    onReset,
    onSearch,
    searchQueryProp,
    filterByProp,
    setFilterByProp,
    ratingProp,
    setRatingProp,
    categoryProp,
    setCategoryProp,
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
                    margin: "0px auto 4px 0px",
                }}
            >
                Filter
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
                <MenuItem>
                    <Category
                        categoryProp={categoryProp}
                        ratingProp={ratingProp}
                        setCategoryProp={setCategoryProp}
                        onFilter={onFilter}
                        setFilterByProp={setFilterByProp}
                    />
                </MenuItem>
                <MenuItem>
                    <Rating
                        onFilter={onFilter}
                        setFilterByProp={setFilterByProp}
                        categoryProp={categoryProp}
                        ratingProp={ratingProp}
                        setRatingProp={setRatingProp}
                    />
                </MenuItem>
                <Button
                    onClick={() => {
                        setFilterByProp({
                            category: "",
                            rating: "",
                        });
                        setRatingProp(ratingCategories[0]);
                        setCategoryProp("");
                        if (searchQueryProp) {
                            onSearch(searchQueryProp, "", 0);
                        } else {
                            onReset();
                        }
                        handleClose();
                    }}
                    style={{ display: "block", marginInline: "auto" }}
                >
                    Clear Filter
                </Button>
                <Button
                    onClick={handleClose}
                    style={{ display: "block", marginInline: "auto" }}
                >
                    Close
                </Button>
            </Menu>

            {filterByProp.category && (
                <Typography>Filtered by {filterByProp.category}</Typography>
            )}

            {filterByProp.rating && (
                <Typography>Filtered by {filterByProp.rating}</Typography>
            )}
        </Box>
    );
}
