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

export default class WelcomeScreen extends React.Component {
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
    this.ordersPress = this.ordersPress.bind(this);
    this.changePasswordPress = this.changePasswordPress.bind(this);
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
    return await fetch("http://localhost:7071/api/AccountInfo", {
      method: "POST",
      body: JSON.stringify({
        email: this.props.navigation.state.params.user
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

  ordersPress(){
    this.props.navigation.navigate("MiaOrders")
  }
  changePasswordPress(){
    this.props.navigation.navigate("ForgotPassword")
  }

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
    var ordersTaken = this.state.dataSource.map((val, key) => {
         return val.OrdersTaken;
       });
    var bottlesReturned = this.state.dataSource.map((val, key) => {
        return val.BottlesReturned;
      });

    
    var location = this.state.dataSource.map((val, key) => {
        return val.Location;
      });

    return (
      <View style={styles.container}>
        <View style = {styles.banner}>
          <Text style={styles.bannerText}>Account information</Text>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.viewHeader}>Login</Text>
        <View style={styles.emailView}>
            <Text style={styles.textStyle}>Email address: {this.props.navigation.state.params.user}</Text>
        </View>
        <View style={styles.PasswordView}>
            <Text style={styles.textStyle}>Password: *</Text>
        </View>
        <View style={styles.BottlesView}>
            <TouchableOpacity style={styles.changePasswordBtn}>
                <Text style={{fontSize: 15, color: "blue"}} onPress={this.changePasswordPress}>Change Password?</Text>
            </TouchableOpacity>
            
        </View>
        </View>
        <View style={styles.performanceView}>
          <Text style = {styles.viewHeader}>Employee Info</Text>
        <View style={styles.BottlesView}>
            <Text style={styles.textStyle}>Location: {this.props.navigation.state.params.location}</Text>
        </View>
        <View style={styles.BottlesView}>
            <Text style={styles.textStyle}>Role: {this.props.navigation.state.params.role}</Text>
        </View>
        </View>
        <View style={styles.performanceView}>
        <Text style = {styles.viewHeader}>Performance</Text>
        <View style={styles.BottlesView}>
            <Text style={styles.textStyle}>Number of deliveries: {ordersTaken}</Text>
        </View>
        <View style={styles.BottlesView}>
            <Text style={styles.textStyle}>Bottles Returned: {bottlesReturned}</Text>
        </View>
        </View>
        <View style={styles.menuView}>
            <TouchableOpacity style={styles.leftButton} onPress={this.ordersPress}>
              <Text style={styles.menuText} >Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleButton} >
            <Text style={styles.menuText} >Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton}>
            <Text style={styles.menuText}>Account</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  banner:{
    width: "100%",
    //height: "17%",
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#113B08",

  },
  bannerText:{
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    //alignSelf: "center",
    //alignItems: "center",
  },

  viewHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#113B08"
    
  },
  
  emailView: {
    flex: 1,
    width: "100%",
    //height: "10%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
  },
  PasswordView: {
    flex: 1,
    width: "100%",
    //height: "10%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  
  accountInfo : {
    marginTop: "4%",
    flex: 3,
    width: "90%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center"
    
  },

  performanceView : {
    marginTop: "4%",
    flex: 2,
    width: "90%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center"
  },

  changePasswordBtn : {
      width: "40%",
      //backgroundColor: "yellow"
  },
  BottlesView: {
    flex: 1,
    width: "100%",
    //height: "10%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textStyle: {
      fontSize: 15,
  },
  inputText: {
    height: "90%",
    fontSize: 18,
    width: "85%",
    color: "black",
  },
  forgotText: {
    color: "blue",
    fontSize: 17,
    alignSelf: "center",
  },
  touchableText: {
    backgroundColor: "white",
    height: 50,
    width: "10%",
    right: 190,
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,

  },
  loginBtn: {
    width: "35%%",
    backgroundColor: "#113B08",
    borderRadius: 10,
    height: 50,
    right: 160,
    //alignItems: "center",
    //justifyContent: "center",
    alignSelf: "flex-start",
    left: 20,
    position: "relative",
    marginTop: 50,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    right: 0,
    top: 15,
  },
  menuView: {
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "3%",
    //height: "18%",
    flex: 1.5,
    width: "100%",
    backgroundColor: "#093b15"
  },
  leftButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent:"center",
    //backgroundColor: "yellow",
    flex: 1,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: "white",
    //width: "20%",
    //height: "100%", 
  },
  middleButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "white",
    //backgroundColor: "yellow",
    //width: "20%",
    //height: "100%", 
    flex: 1,
    height: "100%",
  },
  rightButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "yellow",
    //width: "20%",
    //height: "100%", 
    flex: 1,
    height: "100%",

  },
  menuText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  }
});
