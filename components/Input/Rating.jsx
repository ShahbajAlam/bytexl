import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ratingCategories } from "../../src/App";

export default function Rating({
    onFilterByRating,
    setFilterByProp,
    ratingProp: rating,
    setRatingProp: setRating,
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rating}
                label="Rating"
                onChange={(e) => setRating(Number(e.target.value))}
            >
                {ratingCategories.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        value={item}
                        onClick={() => {
                            onFilterByRating(item);
                            setFilterByProp((prevState) => ({
                                ...prevState,
                                rating: `Rating more than ${item}`,
                            }));
                        }}
                    >
                        More than {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
