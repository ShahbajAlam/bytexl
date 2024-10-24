import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MOCK_DATA from "../../data/mock";

const categories = [...new Set(MOCK_DATA.map((item) => item.category))];

export default function Category({
    onFilter,
    setFilterByProp,
    ratingProp,
    categoryProp: category,
    setCategoryProp: setCategory,
}) {
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
            >
                {categories.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        value={item}
                        onClick={() => {
                            onFilter(item.toLowerCase(), ratingProp);
                            setFilterByProp((prevState) => ({
                                ...prevState,
                                category: `Category - ${item}`,
                            }));
                        }}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
