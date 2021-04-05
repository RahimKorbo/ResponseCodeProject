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
                            
                                <option value="DE-4">DE-4</option>
                                <option value="DE-5">DE-5</option>
                                <option value="DE-6">DE-6</option>
                                <option value="DE-7">DE-7</option>
                                <option value="DE-8">DE-8</option>
                                <option value="DE-9">DE-9</option>
                                <option value="DE-10">DE-10</option>
                                <option value="DE-11">DE-11</option>
                                <option value="DE-12">DE-12</option>
                                <option value="DE-13">DE-13</option>
                                <option value="DE-14">DE-14</option>
                                <option value="DE-15">DE-15</option>
                                <option value="DE-16">DE-16</option>
                                <option value="DE-18">DE-18</option>
                                <option value="DE-19">DE-19</option>
                                <option value="DE-22">DE-22</option>
                                <option value="DE-23">DE-23</option>
                                <option value="DE-25">DE-25</option>
                                <option value="DE-28">DE-28</option>
                                <option value="DE-32">DE-32</option>
                                <option value="DE-33">DE-33</option>
                                <option value="DE-35">DE-35</option>
                                <option value="DE-39">DE-37</option>
                                <option value="DE-39">DE-38</option>
                                <option value="DE-39">DE-39</option>
                                <option value="DE-40">DE-40</option>
                                <option value="DE-41">DE-41</option>
                                <option value="DE-42">DE-42</option>
                                <option value="DE-43">DE-43</option>
                                <option value="DE-44">DE-44</option>
                                <option value="DE-45">DE-45</option>
                                <option value="DE-48">DE-48</option>
                                <option value="DE-49">DE-49</option>
                                <option value="DE-50">DE-50</option>
                                <option value="DE-51">DE-51</option>
                                <option value="DE-52">DE-52</option>
                                <option value="DE-55">DE-55</option>
                                <option value="DE-60">DE-60</option>
                                <option value="DE-61">DE-61</option>
                                <option value="DE-62">DE-62</option>
                                <option value="DE-63">DE-63</option>
                                <option value="DE-70">DE-70</option>
                                <option value="DE-90">DE-90</option>
                                <option value="DE-91">DE-91</option>
                                <option value="DE-95">DE-95</option>
                                <option value="DE-101">DE-101</option>
                                <option value="DE-102">DE-102</option>
                                <option value="DE-103">DE-103</option>
                                <option value="DE-104">DE-104</option>
                                <option value="DE-111">DE-111</option>
                                <option value="DE-119">DE-119</option>
                                <option value="DE-120">DE-120</option>
                                <option value="DE-121">DE-121</option>
                                <option value="DE-122">DE-122</option>
                                <option value="DE-123">DE-123</option>
                                <option value="DE-124">DE-124</option>
                                <option value="DE-125">DE-125</option>
                                <option value="DE-126">DE-126</option>
                                <option value="DE-127">DE-127</option>
                            </select>

                            <input
                                id="responseCode"
                                name="responseCode"
                                type="text"
                                onKeyUp={this.handleChange}
                                required
                                
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
