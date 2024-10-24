import Sort from "./Sort";
import { useState } from "react";
import styles from "./Input.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Box, Button, Input as InputBox } from "@mui/material";
import Filter from "./Filter";
import { ratingCategories } from "../../src/App";

function Input({
    onSearch,
    onReset,
    onSortByPriceAsc,
    onSortByPriceDesc,
    onSortByRatingAsc,
    onSortByRatingDesc,
    onFilter,
    searchQueryProp,
    setSearchQueryProp,
    ratingProp,
    setRatingProp,
    categoryProp,
    setCategoryProp,
    sortedByProp,
    setSortedByProp,
}) {
    const [filterBy, setFilterBy] = useState({
        category: "",
        rating: "",
    });

    function handleSearch() {
        // When comparing strings, it is important to make
        // both strings either lower case or upper case
        onSearch(searchQueryProp.toLowerCase());
    }

    function handleResetSearch() {
        onReset();
        setSearchQueryProp("");
        setSortedByProp("");
        setFilterBy({
            category: "",
            rating: "",
        });
    }

    return (
        <Box>
            <Box className={styles.inputContainer}>
                <Filter
                    onFilter={onFilter}
                    onReset={onReset}
                    onSearch={onSearch}
                    searchQueryProp={searchQueryProp}
                    setSearchQueryProp={setSearchQueryProp}
                    filterByProp={filterBy}
                    setFilterByProp={setFilterBy}
                    ratingProp={ratingProp}
                    setRatingProp={setRatingProp}
                    categoryProp={categoryProp}
                    setCategoryProp={setCategoryProp}
                    sortedByProp={sortedByProp}
                    setSortedByProp={setSortedByProp}
                />

                <Box className={styles.input}>
                    <InputBox
                        fullWidth
                        onChange={(e) => setSearchQueryProp(e.target.value)}
                        placeholder="Search the creative world at work"
                        style={{ padding: 4 }}
                        value={searchQueryProp}
                    />
                    <Button onClick={handleSearch}>
                        <SearchIcon />
                    </Button>
                    <Button onClick={handleResetSearch}>
                        <ClearAllIcon />
                    </Button>
                </Box>

                <Sort
                    onSortByPriceAsc={onSortByPriceAsc}
                    onSortByPriceDesc={onSortByPriceDesc}
                    onSortByRatingAsc={onSortByRatingAsc}
                    onSortByRatingDesc={onSortByRatingDesc}
                    sortedByProp={sortedByProp}
                    setSortedByProp={setSortedByProp}
                />
            </Box>
        </Box>
    );
}

export default Input;
