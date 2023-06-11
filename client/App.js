import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, PanResponder, Alert,Pressable, Modal, StyleSheet,Button, Text, View, Image, ScrollView, TouchableOpacity,Dimensions, TextInput, useWindowDimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
    displayDishFavorite : false,
    toDisplay : null,
    quantity : 1,
    displayBasket : false,
 }

 constructor(props){
  super(props);
  this.clickOn = this.clickOn.bind(this);//clickOnFavorite
  this.clickOnFavorite = this.clickOnFavorite.bind(this);//clickOnFavorite
  this.closeSecondView = this.closeSecondView.bind(this);
  this.decreaseQuantity = this.decreaseQuantity.bind(this);
  this.increaseQuantity = this.increaseQuantity.bind(this);
  this.price = this.price.bind(this);
  this.addToBasket = this.addToBasket.bind(this);
  this.deleteToBasket = this.deleteToBasket.bind(this);
  this.clickOnBasket = this.clickOnBasket.bind(this);
  this.hideBasket = this.hideBasket.bind(this);
 }

clickOn = (plat) => {
  Animated.spring(this.pan, {
    toValue: {x: 0, y: 0},
    useNativeDriver: true,
  }).start();
  this.setState({ displayDish : true, toDisplay : plat})
}

clickOnFavorite = () => {
  Animated.spring(this.pan, {
    toValue: {x: 0, y: 0},
    useNativeDriver: true,
  }).start();
  this.setState({ displayDishFavorite : true})
}

closeSecondView = () => {
  Animated.spring(this.pan, {
    toValue: {x: 0, y: 1000},
    useNativeDriver: true,
  }).start();
  this.setState({ displayDish : false, displayDishFavorite : false,  toDisplay : null})
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
      <ScrollView contentContainerStyle={{flexGrow: 1}} >
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
        <View>
              <Text style={styles.titleCategory}  >
              {'\n'}
                  {"Création de Bowl"}
                  {'\n'}
                  <View style={styles.plat}>
                    <TouchableOpacity   onPress={() => this.clickOnFavorite()}>
                      <View style={styles.dish}>
                        <View style={styles.leftDish}>
                          <Text style={styles.titleDish}>Concoctez votre propre bowl</Text>
                          <Text style={styles.descriptionDish}>Choisissez les ingrédients à mettre dans votre bowl</Text>
                          <Text style={styles.priceDish}>11,50€ - 13,50€</Text>
                        </View>
                        <View style={styles.rightDish}>
                          <Image source={require('./images/picture.jpg')} style={{width: 40, height: 40}} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
              </Text>
            </View>
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
          <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
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
            
              <Button  title="X"  onPress={this.closeSecondView} />
              <Image source={require('./images/picture.jpg')} style={{width: '100%', height: '20%'}} />
              <Text  style={styles.displayDishTitle} >{this.state.toDisplay === null ? "" : this.state.toDisplay.name }</Text>
              <Text  style={styles.displayDishDescription}>{this.state.toDisplay === null ? "" : this.state.toDisplay.description }</Text>
              <View style={styles.quantity}>
                <Button  title="-"  onPress={this.decreaseQuantity}  disabled={this.state.quantity===1} />
                <Text>{this.state.quantity}</Text>
                <Button  title="+"  onPress={this.increaseQuantity} />
              </View> 
              {this.state.toDisplay === null ? "" :
                <Button  title={"Total "+  this.price(this.state.toDisplay.price*this.state.quantity)+" €"} onPress={this.addToBasket}   />
              }
            </Animated.View>
          </View>
          : null}
        {this.state.displayDishFavorite ? 
          <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
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
            
              <Button  title="X"  onPress={this.closeSecondView} />
              <Image source={require('./images/picture.jpg')} style={{width: '100%', height: '20%'}} />
              <Text  style={styles.displayDishTitle} >Création de Bowl</Text>
              <Text  style={styles.displayDishDescription}>Choisissez vos ingrédients</Text>
              <View style={styles.quantity}>
                <Button  title="-"  onPress={this.decreaseQuantity}  disabled={this.state.quantity===1} />
                <Text>{this.state.quantity}</Text>
                <Button  title="+"  onPress={this.increaseQuantity} />
              </View> 
              <Button  title={"Total 10 €"} onPress={this.addToBasket}   />
            </Animated.View>
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
  zIndex: 1,
  
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


*/