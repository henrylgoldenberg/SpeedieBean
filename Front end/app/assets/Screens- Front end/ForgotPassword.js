import React, { Children } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import navigation from "react-navigation";

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: true,
      dataSource: [],
      loggedIn: false,
    };

    this._handlePress = this._handlePress.bind(this);
    //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  // this.state = {
  //   email: "",
  //   password: "",
  // };

  // pressHandler({ navigation }) {
  //   navigation.push("Next");
  // }

  componentDidMount() {
    // return fetch("http://localhost:7071/api/Login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     this.setState({
    //       isLoading: false,
    //       dataSource: [responseJson],
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.getData();
    //setInterval(this.getData, 30000);
  }

  getData = async () => {
    return await fetch("http://localhost:7071/api/ForgotPassword", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: [responseJson],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _handlePress = async () => {
      if (this.state.password != this.state.confirmPassword){
        alert("Passwords do not match");
      }
      else{
        const result = await this.getData();
    //var li
        var li = this.state.dataSource.map((val, key) => {
        return val.ResetStatus;
    });
        if (li == "invalid email"){
            alert("Invalid email");
        }
        else{
            this.props.navigation.navigate("Login");
        }
      }
    
    // //var li
    // var li = this.state.dataSource.map((val, key) => {
    //   return val.LoggedIn;
    // });

    // var location = this.state.dataSource.map((val, key) => {
    //   return val.Location;
    // });

    // console.log(li[0]);
    // console.log(this.state.email);
    // console.log(this.state.password);

    // if (li[0] == "Yes") {
    //   console.log("hey");
    //   this.setState(
    //     {
    //       loggedIn: true,
    //     },
    //     () => console.log(this.state.loggedIn)
    //   );
    //   if (location == "All") {
    //     this.props.navigation.navigate("AllOrders");
    //   } else if (location == "Miami") {
    //     var userName = this.state.email;
    //     this.props.navigation.navigate("MiaOrders", { user: userName });
    //   } else if (location == "New Orleans") {
    //     this.props.navigation.navigate("NolaOrders");
    //   } else if (location == "Chicago") {
    //     this.props.navigation.navigate("ChiOrders");
    //   }
    // } else {
    //   alert("Invalid username or password");
    // }
  };

  render() {
    // var li = [];
    // li = this.state.dataSource.map((val, key) => {
    //   return val.LoggedIn[0];
    // });
    // if (li) {
    //   this.setState({
    //     loggedIn: true,
    //   });
    // }

    return (
      <View style={styles.container}>
        <Image style = {styles.logo} source={require("../../../SpeediePNG.png")}></Image>
        <View style = {styles.banner}>
        </View>
        <Text style={styles.loginHeader}>Reset Password</Text>
        <View style={styles.EmailInputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>
        <View style={styles.PasswordInputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="New Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>

        <View style={styles.ConfirmPasswordInputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            onSubmitEditing={this._handlePress}
          />
        </View>

        <TouchableOpacity style={styles.resetBtn} onPress={this._handlePress}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  // },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    // justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "30%",
    height: "10%",
    position: "relative",
    alignSelf: "flex-start",
    marginTop: "10%"
  },
  // banner:{
  //   width: "90%",
  //   height: "13%",
  //   //flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   alignSelf: "center",
  //   backgroundColor: "#113B08",

  // },
  // bannerText:{
  //   fontSize: 26,
  //   fontWeight: "bold",
  //   color: "white",
  //   //alignSelf: "center",
  //   //alignItems: "center",
  // },
  loginHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    position: "relative",
    alignSelf: "center",
  },
  EmailInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "5%",
    alignSelf: "center",
    padding: "5%",
  },
  PasswordInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "5%",
    position: "relative",
    alignSelf: "center",
    padding: "5%",
  },
  ConfirmPasswordInputView: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    height: "8%",
    marginTop: "5%",
    position: "relative",
    alignSelf: "center",
    padding: "5%",
  },
  inputText: {
    height: "90%",
    fontSize: 18,
    width: "85%",
    color: "black",
  },
  resetBtn: {
    width: "35%%",
    backgroundColor: "#113B08",
    borderRadius: 10,
    height: "6%",
    alignSelf: "center",
    position: "relative",
    marginTop: "5%",
    marginBottom: "2%",
  },
  resetText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    right: 0,
    top: "30%",
  },
});
