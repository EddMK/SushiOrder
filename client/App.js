import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated,FlatList, PanResponder, Alert,Pressable, Modal, StyleSheet,Button, Text, View, Image, ScrollView, TouchableOpacity,Dimensions, TextInput, useWindowDimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CheckBox, ListItem } from '@rneui/themed';
//import { FlatList } from 'react-native-gesture-handler';

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
       },
       {
        id: 2,
        category: 'Création de Bowl',
        plats : [
          {
            id: 0,
            name : 'Concoctez votre propre bowl',
            description : 'Choisissez les ingrédients à mettre dans votre bowl.',
            price : 10,
            taille : [
              {
                name : "medium",
                price : 10
              },
              {
                name : "large",
                price : 13
              },
            ],
            base : [
              {
                name : "Mixte (riz et salade verte)",
              },
              {
                name : "nachos",
              },
              {
                name : "riz",
              },
              {
                name : "salade de chou",
              },
              {
                name : "salade verte",
              }
            ],
            proteines : [
              {
                name : "Crispy chicken",
              },
              {
                name : "saumon",
              },
              {
                name : "saumon mariné",
              },
              {
                name : "shrimp",
              },
              {
                name : "thon",
              },
              {
                name : "thon piquant",
              },
              {
                name : "tofu japonais",
              }
            ],
            veggie : [
              {
                name : "Tomates cerises",
              },
              {
                name : "Mangue (+0,5€)",
              },
              {
                name : "Oignons rouges",
              },
              {
                name : "Carrottes",
              },
              {
                name : "Salade d'algues",
              },
              {
                name : "Edamame",
              },
              {
                name : "Jalapeños Avocat (+0,5€)",
              },
              {
                name : "Guacamole (+1€)",
              },
              {
                name : "Concombre",
              },
              {
                name : "Ananas",
              },
              {
                name : "Cream cheese",
              },
              {
                name : "Grenade",
              },
              {
                name : "Coriandre",
              },
              {
                name : "Menthe",
              },
              {
                name : "Radis",
              }
            ]
          }
        ]
     },
    ],
    basket : [],
    displayDish : false,
    toDisplay : null,
    quantity : 1,
    displayBasket : false,
    checkTaille : null,
    checkBase : null,
    checkProteine : null,
    checkVeggie : [],
    check : true
 }

 constructor(props){
  super(props);
  this.clickOn = this.clickOn.bind(this);//clickOnFavorite
  this.closeSecondView = this.closeSecondView.bind(this);
  this.decreaseQuantity = this.decreaseQuantity.bind(this);
  this.increaseQuantity = this.increaseQuantity.bind(this);
  this.price = this.price.bind(this);
  this.addToBasket = this.addToBasket.bind(this);
  this.deleteToBasket = this.deleteToBasket.bind(this);
  this.clickOnBasket = this.clickOnBasket.bind(this);
  this.hideBasket = this.hideBasket.bind(this);
  this.checkTaille = this.checkTaille.bind(this);
  this.checkBase = this.checkBase.bind(this);
  this.checkVeggie = this.checkVeggie.bind(this);
  this.checkProteine = this.checkProteine.bind(this);
 }

clickOn = (plat) => {
  Animated.spring(this.pan, {
    toValue: {x: 0, y: 0},
    useNativeDriver: true,
  }).start();
  this.setState({ displayDish : true, toDisplay : plat})
}


closeSecondView = () => {
  Animated.spring(this.pan, {
    toValue: {x: 0, y: 1000},
    useNativeDriver: true,
  }).start();
  this.setState({ displayDish : false,   toDisplay : null})
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
  this.setState({ displayBasket : true})
}
////// ATTENTIOON TROUVER UN MOYEN D AVOIR UN ID
deleteToBasket = (dish) =>{
  this.setState({basket: this.state.basket.filter(item => item.name !== dish.name )
  });
}

hideBasket = () =>{
  this.setState({ displayBasket : false})
}

checkTaille(name){
  this.setState({checkTaille : name})
}

checkBase(name){
  this.setState({checkBase : name})
}

checkProteine(name){
  this.setState({checkProteine : name})
}

checkVeggie(name){
  if(this.state.checkVeggie.includes(name)){
    this.setState({
      checkVeggie: this.state.checkVeggie.filter(element => {
        return element !== name;
      })
    });
  }else{
    this.setState({ checkVeggie : [...this.state.checkVeggie, name]})
  }
}

pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
        Animated.event([null, {
          dx: this.pan.x,
          dy: this.pan.y,
        }],{useNativeDriver: false})(e, gestureState);      
    },
    onPanResponderRelease: (evt, gestureState) => {
      //this.pan.extractOffset();
      if( JSON.parse(JSON.stringify(this.pan.y)) > 200){
        this.closeSecondView();
      }
    },
  });

render() {
  return (
    <View style={styles.all} >
      <ScrollView contentContainerStyle={{flexGrow: 1, zIndex : 1}} >
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.displayBasket}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({displayBasket: !displayBasket});
            }}>
                <View style={styles.displayBasket}>
                  <Button title="X" onPress={() => this.hideBasket()} />
                  <Text  style={styles.displayDishTitle}  >Panier</Text>
                  {this.state.basket.length === 0 ? <Text>Panier vide</Text> : 
                      this.state.basket.map((item, index) => (
                        <View key = {index} style={{flexDirection: 'row'}} >
                          <Text>{item.quantity}x {item.name} {item.price}€</Text>
                          <Button title="X" color="red" onPress={() => this.deleteToBasket(item)}  />
                        </View> 
                      ))
                  }
                  {this.state.basket.length !== 0 ?
                  <Text>Total : {this.state.basket.reduce((a, c) => { return a + parseFloat(c.price) }, 0)} €</Text>
                  : null}
                </View> 
          </Modal>
      </ScrollView>
      {this.state.displayDish ? 
            <View style={styles.displayDish}>
              <ScrollView contentContainerStyle={{minHeight:'200%', marginBottom:100, paddingBottom:100}}>
              <Button  title="X"  onPress={this.closeSecondView} />
              <Image source={require('./images/picture.jpg')} style={{width: '100%', height: '20%'}} />
              <Text  style={styles.displayDishTitle} >{this.state.toDisplay === null ? "" : this.state.toDisplay.name }</Text>
              <Text  style={styles.displayDishDescription}>{this.state.toDisplay === null ? "" : this.state.toDisplay.description }</Text>
              { !this.state.toDisplay.hasOwnProperty('taille') ? null : 
              <View>
                <Text style={styles.titleDish}>Taille</Text>
                {this.state.toDisplay.taille.map((item, index) => (
                  <ListItem.CheckBox
                  key = {index}
                  title={item.name}
                  checked={this.state.checkTaille === item.name ? true : false}
                  onPress={() => this.checkTaille(item.name)}
                  />
                ))}
              </View>
              }
              { !this.state.toDisplay.hasOwnProperty('base') ? null : 
              <View>
                <Text style={styles.titleDish}>Base</Text>
                {this.state.toDisplay.base.map((item, index) => (
                  <ListItem.CheckBox
                  key = {index}
                  title={item.name}
                  checked={this.state.checkBase === item.name ? true : false}
                  onPress={() => this.checkBase(item.name)}
                  />
                ))}
              </View>
              }
              { !this.state.toDisplay.hasOwnProperty('proteines') ? null : 
              <View>
                <Text style={styles.titleDish}>Protéines (Max 1)</Text>
                {this.state.toDisplay.proteines.map((item, index) => (
                  <ListItem.CheckBox
                  key = {index}
                  title={item.name}
                  checked={this.state.checkProteine === item.name ? true : false}
                  onPress={() => this.checkProteine(item.name)}
                  />
                ))}
              </View>
              }
              { !this.state.toDisplay.hasOwnProperty('veggie') ? null : 
              <View>
                <Text style={styles.titleDish}>Véggie (Max 3)</Text>
                {this.state.toDisplay.veggie.map((item, index) => (
                  <ListItem.CheckBox
                  key = {index}
                  disabled={this.state.checkVeggie.length === 3 && !this.state.checkVeggie.includes(item.name)  ? true: false}
                  title={item.name}
                  checked={this.state.checkVeggie.includes(item.name)? true : false}
                  onPress={() => this.checkVeggie(item.name)}
                  />
                ))}
              </View>
              }
              <View style={styles.quantity}>
                <Button  title="-"  onPress={this.decreaseQuantity}  disabled={this.state.quantity===1} />
                <Text>{this.state.quantity}</Text>
                <Button  title="+"  onPress={this.increaseQuantity} />
              </View> 
              {this.state.toDisplay === null ? "" :
                <Button  title={"Total "+  this.price(this.state.toDisplay.price*this.state.quantity)+" €"} onPress={this.addToBasket}   />
              }
              </ScrollView>
            </View>
          : null}
      { this.state.basket.length !== 0 ?
        <Button title="Panier" style={styles.basket}  onPress={() => this.clickOnBasket()} />
      : null}
    </View>
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
  flex: 1
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
  top: 100, 
  left: 0, 
  width : '100%',
  height : '100%',
  zIndex: 2,
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
  textAlign: 'center',
  paddingBottom : 5,
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

<Animated.View style={{
            transform: [{translateY: this.pan.y}] ,
            backgroundColor: 'white', 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width : '100%',
            height : '100%',
            zIndex: 1,
          }}  {...this.panResponder.panHandlers}>
*/