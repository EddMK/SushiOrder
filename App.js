import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet,Button, Text, View, Image, ScrollView, TouchableOpacity,Dimensions, TextInput, useWindowDimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');
//const Stack = createNativeStackNavigator();
class App extends Component{
  state = {
    menu: [
       {
          id: 0,
          category: 'Plateaux',
          plats : [
            {
              id: 0,
              name : 'Plateau sakura',
              description : 'Sashimi saumon, saumon concombre, maki saumon, crazy salmon, nigiri saumon (4pc).',
              price : 34.9
            },
            {
              id: 1,
              name : 'Plateau chill',
              description : 'Maki saumon cheese, honey tempura, saumon concombre.',
              price : 18.8
            },
            {
              id: 2,
              name : 'Plateau fuji',
              description : 'Sweety salmon, hot et fresh, honey chicken, saumon concombre.',
              price : 29.5
            },
            {
              id: 3,
              name : 'Plateau paradise (24pc)',
              description : 'SMaki avocat, chicken avocado, honey tempoura, 2 nigiri saumon.',
              price : 22
            }
          ]
       },
       {
          id: 1,
          category: 'Sashimi',
          plats : [
            {
              id: 0,
              name : 'Sashimi saumon',
              description : '5 fines tranches de saumon cru.',
              price : 6.9
            },
            {
              id: 1,
              name : 'Sashimi thon',
              description : '5 fines tranches de thon cru.',
              price : 7.5
            },
            {
              id: 2,
              name : 'Sashimi mixte',
              description : '3 fines tranches de saumon cru et 3 tranches de thon cru..',
              price : 7.9
            }
          ]
       }
    ],
    basket : [],
    displayDish : false,
    toDisplay : null,
    quantity : 1,
    displayBasket : false
 }

 constructor(props){
  super(props);
  this.clickOn = this.clickOn.bind(this);
  this.closeSecondView = this.closeSecondView.bind(this);
  this.decreaseQuantity = this.decreaseQuantity.bind(this);
  this.increaseQuantity = this.increaseQuantity.bind(this);
  this.price = this.price.bind(this);
  this.addToBasket = this.addToBasket.bind(this);
  this.deleteToBasket = this.deleteToBasket.bind(this);
  this.clickOnBasket = this.clickOnBasket.bind(this);
  //console.log(windowDimensions)
  //console.log(screenDimensions)
 }

clickOn = (plat) => {
  this.setState({ displayDish : true, toDisplay : plat})
}

closeSecondView = () => {
  this.setState({ displayDish : false, toDisplay : null})
}

decreaseQuantity = () => {
  this.setState({ quantity : this.state.quantity-1})
}

increaseQuantity = () => {
  this.setState({ quantity : this.state.quantity+1})
}

price = (number) =>{
  let numberToReturn = number.toFixed(2);
  return numberToReturn;
}

addToBasket = () =>{
  var dish = {
    name : this.state.toDisplay.name,
    quantity : this.state.quantity,
    price : this.price(this.state.toDisplay.price*this.state.quantity)
  }
  this.setState({ basket: [...this.state.basket, dish], displayDish : false, toDisplay : null, quantity : 1, })
}

clickOnBasket = () =>{
  //displayBasket
  this.setState({ displayBasket : true})
  console.log("clique");
}
////// ATTENTIOON TROUVER UN MOYEN D AVOIR UN ID
deleteToBasket = (dish) =>{
  this.setState({basket: this.state.basket.filter(item => item.name !== dish.name )
  });
}

render() {
  return (
    <ScrollView style={styles.all} contentContainerStyle={{flexGrow: 1}} >
      { this.state.menu.map((item, index) => (
          <View key = {item.id} >
            <Text key = {item.id} style={styles.titleCategory}  >
            {'\n'}
                {item.category}
                {'\n'}
                <View style={styles.plat}>
                {item.plats.map((plat, index) => (
                  <TouchableOpacity key = {plat.id}  onPress={() => this.clickOn(plat)}>
                    <Dish key = {plat.id} info={plat}/>
                  </TouchableOpacity>
                ))
                }
                </View>
            </Text>
          </View>
       ))    
    }
    {
      this.state.displayDish ?
      <View style={styles.displayDish}>
        <Button  title="X"  onPress={this.closeSecondView} />
        <Image source={require('./images/picture.jpg')} style={{width: '100%', height: '20%'}} />
        <Text  style={styles.displayDishTitle} >{this.state.toDisplay.name}</Text>
        <Text  style={styles.displayDishDescription}>{this.state.toDisplay.description}</Text>
        <View style={styles.quantity}>
          <Button  title="-"  onPress={this.decreaseQuantity}  disabled={this.state.quantity===1} />
          <Text>{this.state.quantity}</Text>
          <Button  title="+"  onPress={this.increaseQuantity} />
        </View> 
        <Button  title={"Total "+ this.price(this.state.toDisplay.price*this.state.quantity)+" €"} onPress={this.addToBasket}   />
      </View> 
      : null
    }
      { this.state.basket.length !== 0 ?
        <Button title="Panier" style={styles.basket}  onPress={() => this.clickOnBasket()} />
       : null}
    {
      this.state.displayBasket ?
      <View style={styles.displayBasket}>
        <Text  style={styles.displayDishTitle}  >Panier</Text>
        { this.state.basket.map((item, index) => (
          <View key = {index} style={{flexDirection: 'row'}} >
            <Text>{item.quantity}x {item.name} {item.price}€</Text>
            <Button title="X" color="red" onPress={() => this.deleteToBasket(item)}  />
          </View> 
        ))}
        <Text>Total : {this.state.basket.reduce((a, c) => { return a + parseFloat(c.price) }, 0)} €</Text>
      </View> 
    : null
    }
    </ScrollView>
    
  );
}
};

function Dish({info}){
  return (
    <View style={styles.dish}>
      <View style={styles.leftDish}>
        <Text style={styles.titleDish}>{info.name}</Text>
        <Text style={styles.descriptionDish}>{info.description}</Text>
        <Text style={styles.priceDish}>{info.price} €</Text>
      </View>
      <View style={styles.rightDish}>
        <Image source={require('./images/picture.jpg')} style={{width: 40, height: 40}} />
      </View>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
 all:{
  
 },
 dish:{
  paddingVertical:10,
  borderBottomColor:'black',
  borderBottomWidth : 1,
  flexDirection: 'row',
 },
 
 leftDish:{
  width: '70%'
 },
 rightDish:{
  width: '30%'
 },
 plat:{
  flexDirection: 'column',
  backgroundColor:'white',
  paddingLeft:10,
  paddingRight:10
 },
 titleCategory:{
  fontSize:20,
  fontWeight:'bold'
 },
 titleDish:{
  fontWeight:'bold',
 },
 descriptionDish:{
  color:'gray',
  paddingVertical:5,
 },
 priceDish:{
  color:'gray',
 },
 displayDish:{
  backgroundColor: 'white', 
  position: 'absolute', 
  top: 30, 
  left: 0, 
  width : '100%',
  height : '100%',
  zIndex: 1
 },
 quantity:{
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  justifyContent: 'center', 
  alignItems: 'center'
 },
 displayDishTitle:{
  paddingTop : 20,
  paddingBottom : 5,
  fontSize : '25',
  textAlign : 'center',
  fontWeight: "bold"
 },
 displayDishDescription:{
  fontSize : '15',
  color:'midnightblue'
 },
 basket:{
  height : '10%',
  backgroundColor: 'lightblue',
  textAlign: 'center'
 },
 displayBasket : {
  backgroundColor: 'white', 
  position: 'absolute', 
  top: 30, 
  left: 0, 
  width : '100%',
  height : '100%',
  zIndex: 1
 }
});

 
/*

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
};
const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};


<TouchableOpacity
             key = {item.id}
             style = {styles.container}
             onPress = {() => this.alertItemName(item)}>
             <Text style = {styles.text}>
                {item.category}
             </Text>
          </TouchableOpacity>
*/

/*
<NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
*/