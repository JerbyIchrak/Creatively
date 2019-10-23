import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import GraphicDesignBlogsStyle from "assets/jss/material-kit-react/views/GraphicDesignBlogs.jsx";
import Paginations from "components/Pagination/Pagination.jsx";


class GraphicDesignBlogs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedEnabled: "b",
      checkedA: true,
      checkedB: false,
      blogs: []
    };
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    fetch('http://localhost:3005/blog')
      .then(res => res.json())
      .then((data) => {
        this.setState({ blogs: data })
      })
      .catch(console.log)
  }
  render() {
    const { classes, ...rest } = this.props;
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);


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
        <Parallax small image={require("assets/img/GraphicDesignShadow.jpg")}>
          <div className={classes.container} >
            <GridContainer>
              <GridItem >
                <h1 className={classes.title}>Graphic Design Blogs.</h1>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>

            <div className={classes.container}>
              <div id="navbar" className={classes.navbar}>
                <Header
                  color="white"
                  leftLinks={
                    <div>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.checkedA}
                            onChange={this.handleChange("checkedA")}
                            value="checkedA"
                            classes={{
                              switchBase: classes.switchBase,
                              checked: classes.switchChecked,
                              icon: classes.switchIcon,
                              iconChecked: classes.switchIconChecked,
                              bar: classes.switchBar
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Recent Blogs"
                      />
                    </div>

                  }
                  rightLinks={
                    <div>
                      <CustomInput
                        black
                        inputRootCustomClasses={classes.inputRootCustomClasses}
                        formControlProps={{
                          className: classes.formControl
                        }}
                        inputProps={{
                          placeholder: "Search",
                          inputProps: {
                            "aria-label": "Search",
                            className: classes.searchInput
                          }
                        }}
                      />
                      <Button justIcon round color="primary">
                        <Search className={classes.searchIcon} />
                      </Button>
                    </div>
                  }
                />
              </div>
            </div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={1} sm={1} md={5}>
                  {this.state.blogs.map((blog) => (
                    <div className={classes.container}>
                      <img
                        alt="..."
                        src={blog.picture}
                        className={navImageClasses}
                      />
                      <h3>{blog.title}</h3>
                      <br /><br /><br /><br />
                    </div>
                    ))}
                </GridItem>
                <Paginations
                  pages={[
                    { text: "PREV" },
                    { text: 1 },
                    { text: 2 },
                    { active: true, text: 3 },
                    { text: 4 },
                    { text: 5 },
                    { text: "NEXT" }
                  ]}
                  color="primary"
                />
              </GridContainer>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(GraphicDesignBlogsStyle)(GraphicDesignBlogs);
