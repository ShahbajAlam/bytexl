import { useEffect, useState } from "react";
import Content from "../components/Content/Content";
import Input from "../components/Input/Input";
import Navbar from "../components/navbar/Navbar";
import Divider from "@mui/material/Divider";
import MOCK_DATA from "../data/mock";
import { Box, Typography } from "@mui/material";

export const ratingCategories = [1, 2, 3, 4];

function App() {
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [rating, setRating] = useState(ratingCategories[0]);
    const [sortedBy, setSortedBy] = useState("");

    // It is a good practise to check the incoming data
    // for ensuring it is in the form of data structure
    // we are expecting
    // const [data, setData] = useState(Array.isArray(MOCK_DATA) ? MOCK_DATA : []);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        async function fetchData() {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/books");
            const data = await response.json();
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    function handleSearch(query) {
        if (!query) return;

        setData(
            MOCK_DATA?.filter((item) =>
                // When comparing strings, it is important to make
                // both strings either lower case or upper case
                item?.title?.toLowerCase().includes(query)
            ) || []
        );
    }

    function handleReset() {
        setData(Array.isArray(MOCK_DATA) ? MOCK_DATA : []);
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

    function handleFilterByCategory(category) {
        if (searchQuery && rating) {
            setData(
                MOCK_DATA.filter(
                    (item) =>
                        item?.title?.toLowerCase().includes(searchQuery) &&
                        item?.category?.toLowerCase() ===
                            category?.toLowerCase() &&
                        item?.rating >= rating
                )
            );
            // to do - write using method chaining or multiple ifs
        } else if (searchQuery) {
            setData(
                MOCK_DATA.filter(
                    (item) =>
                        item?.title?.toLowerCase().includes(searchQuery) &&
                        item?.category?.toLowerCase() ===
                            category?.toLowerCase()
                )
            );
        } else if (rating) {
            setData(
                MOCK_DATA?.filter(
                    (item) =>
                        item?.category?.toLowerCase() ===
                            category?.toLowerCase() && item?.rating >= rating
                )
            );
        } else {
            setData(
                MOCK_DATA?.filter(
                    (item) =>
                        item?.category?.toLowerCase() ===
                        category?.toLowerCase()
                )
            );
        }
    }

    function handleFilterByRating(rating) {
        if (searchQuery && category) {
            setData(
                MOCK_DATA.filter(
                    (item) =>
                        item?.rating >= rating &&
                        item?.title?.toLowerCase().includes(searchQuery) &&
                        item?.category.toLowerCase() === category.toLowerCase()
                )
            );
        } else if (searchQuery) {
            setData(
                MOCK_DATA.filter(
                    (item) =>
                        item?.rating >= rating &&
                        item?.title?.toLowerCase().includes(searchQuery)
                )
            );
        } else if (category) {
            setData(
                MOCK_DATA.filter(
                    (item) =>
                        item?.rating >= rating &&
                        item?.category.toLowerCase() === category.toLowerCase()
                )
            );
        } else {
            setData(MOCK_DATA.filter((item) => item?.rating >= rating));
        }
    }

    // function handleFilterByCategory(category) {
    //     setData((prevData) => {
    //         return [...prevData].filter(
    //             (item) =>
    //                 item?.category?.toLowerCase() === category?.toLowerCase()
    //         );
    //     });
    // }

    // function handleFilterByRating() {
    //     setData((prevData) =>
    //         [...prevData].filter((item) => item?.rating >= rating)
    //     );
    // }

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
                    onFilterByCategory={handleFilterByCategory}
                    onFilterByRating={handleFilterByRating}
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
