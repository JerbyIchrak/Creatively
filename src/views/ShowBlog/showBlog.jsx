import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import showBlogPageStyle from "assets/jss/material-kit-react/views/showBlogPageStyle.jsx";

class showBlogPage extends React.Component {
    render() {
        const { classes, ...rest } = this.props;

        return (
            <div>
                <Header
                    color="transparent"
                    brand="Creatively"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "primary"
                    }}
                    {...rest}
                />
                <Parallax small filter image={require("assets/img/design-blog.png")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>

                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                    <br /><br />
                                    <div className={classes.typo}>
                                        <h1 className={classes.title}>The Future in Illustrations</h1>
                                    </div>
                                    <br /><br /><br />
                                    <div className={classes.typo}>
                                        <h6>Author :</h6>
                                        <a href="www.google.com"><h5>Ichrak Jerbi</h5></a>
                                    </div>
                                    <br /><br /><br />
     
                                    <div className={classes.note}>
                                        <p>
                                            I will be the leader of a company that ends up being worth
                                            billions of dollars, because I got the answers. I understand
                                            culture. I am the nucleus. I think that’s a responsibility
                                            that I have, to push possibilities, to show people, this is
                                            the level that things could be at.
                                        </p>
                                    </div>
                                </GridItem>
                            </GridContainer>

                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

export default withStyles(showBlogPageStyle)(showBlogPage);
