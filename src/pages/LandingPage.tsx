import ViewListIcon from "@mui/icons-material/ViewList";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://www.stillthristy.in/">
        Rohit Saini
      </Link>{" "}
      ©{" "}
      <Link color="inherit" href="https://github.com/rohitsaini1196">
        GitHub
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" className="appBar">
        <Toolbar>
          <ViewListIcon className="iconMargin" />
          <Typography variant="h6" className="title">
            Velocity Forms
          </Typography>
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Container>
          <Paper className="heroSection">
            <img
              className="hiddenImage"
              src="https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg"
              alt="cover"
            />
            <Box className="overlay" />
            <Grid container>
              {/* <Grid item md={6}> */}
              <Box className="heroText">
                <Typography component="h1" variant="h3" gutterBottom>
                  Velocity Forms
                </Typography>
                <Typography variant="h5" paragraph>
                  Plan your next camping trip, manage event registrations, whip
                  up a quick poll, and more.
                  <br />
                  <br />
                  Fast and easy solution for collecting data, conducting
                  quizzes, and even exams.
                </Typography>
                <div className="heroButtons">
                  <Button
                    variant="contained"
                    className="tealButton"
                    onClick={handleLoginClick}
                  >
                    Signup Now
                  </Button>
                  <Button
                    variant="contained"
                    className="tealButton"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                </div>
              </Box>
              {/* </Grid> */}
            </Grid>
          </Paper>

          <Grid container spacing={4}>
            {/* <Grid item xs={12} md={6}> */}
            <CardActionArea component="a" href="/">
              <Card className="cardFlex">
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Survey with style
                  </Typography>
                  <Typography variant="subtitle1" className="tealText">
                    Style
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Use your photo or logo, and Forms will pick the best colors
                    for a unique form.
                  </Typography>
                </CardContent>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <CardMedia
                    className="cardImage"
                    component="img"
                    image="https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg"
                    alt="Survey Style"
                  />
                </Box>
              </Card>
            </CardActionArea>
            {/* </Grid> */}

            {/* <Grid item xs={12} md={6}> */}
            <CardActionArea component="a" href="/">
              <Card className="cardFlex">
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Organized & analyzed
                  </Typography>
                  <Typography variant="subtitle1" className="tealText">
                    Organize
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Collect responses in real time with charts and export as
                    CSV, JSON, or Sheets.
                  </Typography>
                </CardContent>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <CardMedia
                    className="cardImage"
                    component="img"
                    image="https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg"
                    alt="Organized"
                  />
                </Box>
              </Card>
            </CardActionArea>
          </Grid>
          {/* </Grid> */}
        </Container>
      </main>

      <footer className="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Velocity Forms <small>(An open-source clone of Google Forms)</small>
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          This project is{" "}
          <Link
            color="inherit"
            href="https://github.com/rohitsaini1196/google-forms"
          >
            open source
          </Link>
          . Feel free to use anything helpful.
        </Typography>
        <Copyright />
      </footer>
    </>
  );
}
