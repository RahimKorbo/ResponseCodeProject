import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { getResponseMsgBreaker } from "../Constants";
import loadingImg from '../assets/loading.gif';

export default class Messagebreaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            // username: "",
            // password: "",
            fields: {},
            errors: {},
            listdata:[],
            backendStatus:'',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    // handleChange = (e) => {
    //   this.setState({
    //     [e.target.name]: e.target.value,
    //   });
    // };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submitForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = this.state.fields;
            
            if (!fields["responseCode"]) {
                fields["responseCode"] = "";

            }
            if (!fields["dE"]) {
                fields["dE"] = "";

            }

            this.setState({ fields: fields });
            //alert("Form submitted");
            this.authenticate();
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //alert("UserName:::"+fields.username);
        //alert("Password:::"+fields.password);
        

        if (!fields["responseCode"]) {
            formIsValid = false;
            alert("Kindly Enter Response Code!");
            //errors["username"] = "*Please enter your username.";
        }
         
        // if (typeof fields["username"] !== "undefined") {
        //   if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        //     formIsValid = false;
        //     errors["username"] = "*Please enter alphabet characters only.";
        //   }
        // }




        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    authenticate = () => {
        const authJson = {
            response: this.state.fields.responseCode
        };

        console.log(authJson)
        Axios.request({
            method: "POST",
            data: authJson,
            url: getResponseMsgBreaker
        })
            .then((response) => {
                this.setState({ navigate: true, loading: true });
                alert("Backend Processing Successful.")
                // localStorage.setItem("username",this.state.fields.username)
                // localStorage.setItem("token",response.data.jwttoken);
                // localStorage.setItem("logintime",response.data.loginTime);
                
                if(response.status === 200) {
                    this.setState({ navigate: true, loading: false });
                    this.setState({ listdata: response.data.response,backendStatus:response.data.status  });
                    console.log("Data---",response.data.response);

                }
                
            })
            .catch((err) => {
                console.log(err);
                alert("Error Occurred. ", err);
            });

    };

    render() {
         const { navigate } = this.state;
         const items = this.state.listdata.map((item) =>
         <li>{item}</li>
       );
        // here is the important part
        // if (navigate) {
        //   return <Redirect to="/dash" push={true} />;
        // }
        const TodoComponent = {
            width: "500px",
            margin: "40px auto",
            padding: "50px auto",
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            minHeight: "200px",
            boxSizing: "border-box"
           }
           const buttonComponent = {
            background: 'linear-gradient(45deg, #FE6B6B 30%, #FF8E46 90%)',
            margin: "10px 0 0px 200px",
            borderRadius: "15px"
           }

           const Header = {
            padding: "10px 20px",
            textAlign: "center",
            color: "white",
            fontSize: "22px"
           }
           const messageBreakerHeader = {
            fontSize: "12px",
            marginLeft: "350px"
           }

           const ErrorMessage = {
            color: "white",
            fontSize: "13px"
           }
        return (
            <div style={TodoComponent}>
               
                <div style={Header}>
                    Response Code Viewer
                </div>
                <div>
                  
                    <div>
                        <div>
                           
                            <label  htmlFor="responseCode">Enter Data: &nbsp;</label>
                            
                            &nbsp;
                            <input
                                id="responseCode"
                                name="responseCode"
                                type="text"
                                onKeyUp={this.handleChange}
                                required
                                
                            />
                        </div>
                    </div>

                </div>
                <div>
                    <div>
                        <div>
                            <button
                                role="button"
                                style={buttonComponent}
                                //onClick={this.authenticate}
                                onClick={this.submitForm}
                            >
                                Submit
                                                </button>
                        </div>
                    </div>
                    <div style={ErrorMessage}>
                        {this.state.loading && <img src={loadingImg} />}
                         <ul>{items}</ul> 
                    </div>
                </div>
                

            </div>
        );
    }
}
