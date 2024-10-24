import styles from "./Navbar.module.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {
    return (
        <Box className={styles.navbar} id="navbarContainer">
            <Stack
                id="leftNavbarContainer"
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 16,
                    justifyContent: "flex-start",
                }}
            >
                <Typography variant="h5">Behance</Typography>
                <Typography variant="body1">Explore</Typography>
                <Typography variant="body1">Assets</Typography>
                <Typography variant="body1">Jobs</Typography>
                <Typography variant="body1">
                    Behance <span className={styles.pro}>pro</span>
                </Typography>
                <Typography variant="body1">Hire Freelancers</Typography>
            </Stack>

            <Stack
                id="rightNavbarContainer"
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 16,
                    justifyContent: "flex-start",
                }}
            >
                <NotificationsIcon />
                <Button variant="outlined">Log In</Button>
                <Button variant="contained">Sign Up</Button>
            </Stack>
        </Box>
    );
}
