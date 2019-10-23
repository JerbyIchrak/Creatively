import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import DefaultImg from 'assets/img/default-img.jpg';
import axios from 'axios';


import postBlogStyle from "assets/jss/material-kit-react/views/postBlog.jsx";


const API_URL = "http://localhost:3005";

class postBlog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            multerImage: DefaultImg,
            selectedEnabled: "b",
            title: "",
            blogTxt: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeblogTxt = this.handleChangeblogTxt.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);

    }

    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
      }

    handleChangeTitle(event) {
        this.setState({
            title: event.target.value,
        });
    }

    handleChangeblogTxt(event) {
        this.setState({
            blogTxt: event.target.value,
        });
    }

    handleSubmit(event) {
        this.postBlog(this.state.multerImage, this.state.title, this.state.blogTxt);
        console.log(this.state.imageFormObj);
        event.preventDefault();
    }
    setDefaultImage(uploadType) {
        if (uploadType === "multer") {
            this.setState({
                multerImage: DefaultImg
            });
        }
    }

    uploadImage(e, method) {


        if (method === "multer") {

            let imageFormObj = new FormData();

            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e.target.files[0]);

            // stores a readable instance of 
            // the image being uploaded using multer
            this.setState({
                multerImage: URL.createObjectURL(e.target.files[0])
            });

            axios.post(`${API_URL}/image/uploadmulter`, imageFormObj)
                .then((data) => {
                    if (data.data.success) {
                        alert("Image has been successfully uploaded using multer");
                        this.setDefaultImage("multer");
                    }
                })
                .catch((err) => {
                    alert("Error while uploading image using multer");
                    console.log(err);
                    this.setDefaultImage("multer");
                });
        }
    }

    postBlog(multerImage, title, blogTxt) {
        console.log(title, blogTxt)
        fetch('http://localhost:3005/blog', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: "",
                title: title,
                picture: multerImage,
                text: blogTxt
            })
        }).then(res => res.json())
            .then((data) => {
                // localStorage.setItem("user", JSON.stringify(data.user));
                this.props.history.push('/postBlog-page');
            })
            .catch(console.log)
    }

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
                <Parallax small filter image={require("assets/img/backProfile.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>

                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                    <div className={classes.typo}>
                                        <h1>Post a Blog :</h1>
                                        <div className={classes.title}>
                                            <h3 color="primary">Choose an image </h3>
                                        </div>
                                        <br />
                                        <div className="process">

                                            <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
                                            <img src={this.state.multerImage} alt="" className="process__image" />
                                        </div>
                                        <br /><br /><br />
                                        <div className={classes.title}>
                                            <h3>Blog Title </h3>
                                        </div>
                                        <GridContainer>
                                            <GridItem >
                                                <form className={classes.form} onSubmit={this.handleSubmit}>
                                                    <CustomInput
                                                        value={this.state.title}
                                                        onChange={this.handleChangeTitle.bind(this)}
                                                        id="regular"
                                                        inputProps={{
                                                            placeholder: "Title ..."
                                                        }}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                    <br /><br />
                                                    <div className={classes.title}>
                                                        <h5>Subject of the Blog:</h5>
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.checkboxAndRadio +
                                                            " " +
                                                            classes.checkboxAndRadioHorizontal
                                                        }
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    checked={this.state.selectedEnabled === "a"}
                                                                    onChange={this.handleChangeEnabled}
                                                                    value="a"
                                                                    name="radio button enabled"
                                                                    aria-label="A"
                                                                    icon={
                                                                        <FiberManualRecord
                                                                            className={classes.radioUnchecked}
                                                                        />
                                                                    }
                                                                    checkedIcon={
                                                                        <FiberManualRecord className={classes.radioChecked} />
                                                                    }
                                                                    classes={{
                                                                        checked: classes.radio
                                                                    }}
                                                                />
                                                            }
                                                            classes={{
                                                                label: classes.label
                                                            }}
                                                            label="Graphic Design"
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.checkboxAndRadio +
                                                            " " +
                                                            classes.checkboxAndRadioHorizontal
                                                        }
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    checked={this.state.selectedEnabled === "b"}
                                                                    onChange={this.handleChangeEnabled}
                                                                    value="b"
                                                                    name="radio button enabled"
                                                                    aria-label="B"
                                                                    icon={
                                                                        <FiberManualRecord
                                                                            className={classes.radioUnchecked}
                                                                        />
                                                                    }
                                                                    checkedIcon={
                                                                        <FiberManualRecord className={classes.radioChecked} />
                                                                    }
                                                                    classes={{
                                                                        checked: classes.radio
                                                                    }}
                                                                />
                                                            }
                                                            classes={{
                                                                label: classes.label
                                                            }}
                                                            label="UI/UX Design"
                                                        />
                                                    </div>
                                                    
                                                <br /><br /><br />
                                                <div className={classes.title}>
                                                    <h3>Your Blog :</h3>
                                                </div>
                                                <br /><br /><br />
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="basic-addon">
                                                            <i className="fas fa-pencil-alt prefix"></i>
                                                        </span>
                                                    </div>
                                                    <textarea className="form-control" rows="10"
                                                        value={this.state.blogTxt}
                                                        onChange={this.handleChangeblogTxt.bind(this)}
                                                    ></textarea>
                                                </div>
                                                <br /><br />
                                                {/* onClick={this.postBlog(this.state.multerImage, this.state.title, this.state.blogTxt)} */}
                                                <Button color="rose" round  >
                                                    Post the Blog ...
                                                 </Button>
                                                {/* <input type="submit" value="post the damn blog" onClick={console.log(this.state.multerImage, this.state.title, this.state.blogTxt)}/> */}
                                                </form>
                                            </GridItem>
                                        </GridContainer>
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

export default withStyles(postBlogStyle)(postBlog);
