import { useEffect, useState } from "react";
import Content from "../components/Content/Content";
import Input from "../components/Input/Input";
import Navbar from "../components/navbar/Navbar";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";

let MOCK_DATA;
export const ratingCategories = [1, 2, 3, 4];

function App() {
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [rating, setRating] = useState(ratingCategories[0]);
    const [sortedBy, setSortedBy] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        async function fetchData() {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/books");
            const data = await response.json();
            MOCK_DATA = data;
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    function handleSearch(
        query,
        categoryLocal = category,
        ratingLocal = rating
    ) {
        if (!query) return;

        let searchedData = MOCK_DATA?.filter((item) =>
            item?.title?.toLowerCase().includes(query)
        );

        if (categoryLocal) {
            searchedData = searchedData.filter(
                (item) =>
                    item?.category?.toLowerCase() === category?.toLowerCase()
            );
        }

        if (ratingLocal) {
            searchedData = searchedData.filter(
                (item) => item?.rating >= ratingLocal
            );
        }

        searchedData = checkSortCondition(searchedData);
        setData(searchedData);
    }

    function handleReset() {
        setData(MOCK_DATA);
    }

    function checkSortCondition(dataArray) {
        switch (sortedBy) {
            case "Price (Low to High)":
                dataArray = dataArray.sort((a, b) => a.price - b.price);
                break;
            case "Price (High to Low)":
                dataArray = dataArray.sort((a, b) => b.price - a.price);
                break;
            case "Rating (Low to High)":
                dataArray = dataArray.sort((a, b) => a.rating - b.rating);
                break;
            case "Rating (High to Low)":
                dataArray = dataArray.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        return dataArray;
    }

    function handleSortByPriceAscending() {
        setData((oldData) => {
            return [...oldData].sort((a, b) => a.price - b.price);
        });
    }

    function handleSortByPriceDescending() {
        setData((oldData) => {
            return [...oldData].sort((a, b) => b.price - a.price);
        });
    }

    function handleSortByRatingAscending() {
        setData((oldData) => {
            return [...oldData].sort((a, b) => a.rating - b.rating);
        });
    }

    function handleSortByRatingDescending() {
        setData((oldData) => {
            return [...oldData].sort((a, b) => b.rating - a.rating);
        });
    }

    function handleFilterByCategoryOrRating(category = "", rating = 0) {
        let filteredData = MOCK_DATA;

        if (searchQuery) {
            filteredData = filteredData.filter((item) =>
                item?.title?.toLowerCase().includes(searchQuery)
            );
        }

        if (category) {
            filteredData = filteredData.filter(
                (item) =>
                    item?.category?.toLowerCase() === category?.toLowerCase()
            );
        }

        if (rating) {
            filteredData = filteredData.filter(
                (item) => item?.rating >= rating
            );
        }

        filteredData = checkSortCondition(filteredData);
        setData(filteredData);
    }

    return (
        <Box id="mainContainer">
            <Box
                id="stickyHeaderContainer"
                style={{
                    backgroundColor: "#fff",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Navbar />
                <Divider />
                <Input
                    dataProp={data}
                    onSearch={handleSearch}
                    onReset={handleReset}
                    onSortByPriceAsc={handleSortByPriceAscending}
                    onSortByPriceDesc={handleSortByPriceDescending}
                    onSortByRatingAsc={handleSortByRatingAscending}
                    onSortByRatingDesc={handleSortByRatingDescending}
                    onFilter={handleFilterByCategoryOrRating}
                    searchQueryProp={searchQuery}
                    setSearchQueryProp={setSearchQuery}
                    ratingProp={rating}
                    setRatingProp={setRating}
                    categoryProp={category}
                    setCategoryProp={setCategory}
                    sortedByProp={sortedBy}
                    setSortedByProp={setSortedBy}
                />
            </Box>

            <Box
                style={{
                    marginTop: "175px",
                }}
            >
                {loading ? (
                    <Typography textAlign="center" variant="h5">
                        Loading...
                    </Typography>
                ) : (
                    <Content dataProp={data} />
                )}
            </Box>
        </Box>
    );
}

export default App;
