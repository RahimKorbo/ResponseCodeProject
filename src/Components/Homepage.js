import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { getResponseMsg } from "../Constants";
import loadingImg from '../assets/loading.gif';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            // username: "",
            // password: "",
            fields: {},
            errors: {},
            data:[],
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
         if (!fields["dE"]) {
             formIsValid = false;
             alert("Kindly Choose DE!");
             this.state.fields.dE = "DE-39";
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
            responseCode: this.state.fields.responseCode,
            dE:this.state.fields.dE
        };

        console.log(authJson)
        Axios.request({
            method: "POST",
            data: authJson,
            url: getResponseMsg
        })
            .then((response) => {
                this.setState({ navigate: true, loading: true });
                alert("Backend Processing Successful.")
                // localStorage.setItem("username",this.state.fields.username)
                // localStorage.setItem("token",response.data.jwttoken);
                // localStorage.setItem("logintime",response.data.loginTime);
                
                if(response.status == "success") {
                    this.setState({ navigate: true, loading: false });
                    this.setState({ data: response.response  });

                }
                
            })
            .catch((err) => {
                console.log(err);
                alert("Error Occurred. ", err);
            });

    };

    render() {
        const { navigate } = this.state;
        const items = this.state.data.map((item) =>
        <li>{item}</li>
      );
        // here is the important part
        // if (navigate) {
        //   return <Redirect to="/dash" push={true} />;
        // }

        return (
            <div className="prelogin-page">
                <div className="login-heading">
                    <h3>Response Code Viewer</h3>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="ux-component">
                           
                            <label htmlFor="responseCode">Choose DataElements:</label>
                            <select id="dE" name="dE" onChange={this.handleChange}>
                            <option value="--">-Data Element-</option>
                                <option value="DE-39">DE-39</option>
                                <option value="DE-40">DE-40</option>
                                <option value="DE-48">DE-48</option>
                                <option value="DE-61">DE-61</option>
                            </select>

                            <input
                                id="responseCode"
                                name="responseCode"
                                type="text"
                                onKeyUp={this.handleChange}
                                required
                                maxLength="2"
                            />
                        </div>
                        <div
                            style=
                            {{
                                color: "red", textAlign: "left",
                                display: "block",
                                fontSize: "0.8rem"
                            }}

                        >{this.state.errors.username}</div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="form-footer">
                            <button
                                role="button"
                                className="button"
                                //onClick={this.authenticate}
                                onClick={this.submitForm}
                            >
                                Submit
                                                </button>
                        </div>
                    </div>
                    <div>
                        {this.state.loading && <img src={loadingImg} />}
                        <ul>{items}</ul>
                    </div>
                </div>
                <div className="vspacer50"></div>


            </div>
        );
    }
}
