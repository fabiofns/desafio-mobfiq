/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,  
	View,
	Text,
	TouchableOpacity,
    Image,
    TextInput,
	ActivityIndicator,
	Modal
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Loading from './src/Loading';

class App extends Component  {

    state = {
		loading: false,
		textLoading: '',
        showSearch: false,	
        showCategorias: false,	
        data: [],
        dataCategorias: [],
        busca: '',
        pagina: 0
    }

    componentDidMount() {
        
        this.getCategorias();
        this.getProdutos();
    }

    showSearch() {

        this.setState({showSearch: !this.state.showSearch});
	}
	
	getProdutos = async () => {

		try {

			this.setState({loading: true});
			this.setState({textLoading: 'Carregando Produtos'});

			return await fetch('https://desafio.mobfiq.com.br/Search/Criteria', {
				method: 'POST',
				headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: '{\"Query\" : \"' + this.state.busca + '\",\"Offset\": ' + this.state.pagina + ',\"Size\": ' + '10' + '} '
			})
			.then(function (response) {
	
				return response.json();
			})
			.then((result) => {
	
				this.setState({data: result.Products});
				this.setState({loading: false});
				this.setState({showSearch: false});
			})
			.catch((result) => {
	
				console.log(result);
			}); 			
		}
		catch(e) {
			console.log(e);
		}
	}

    getCategorias = async() => {

        try {

            this.setState({loading: true});
			this.setState({textLoading: 'Carregando Dados'});

			return await fetch('https://desafio.mobfiq.com.br/Search/Criteria', {
				method: 'GET',
				headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
			})
			.then(function (response) {
	
				return response.json();
			})
			.then((result) => {
	
				this.setState({dataCategorias: result.Categories});
				this.setState({loading: false});
			})
			.catch((result) => {
	
				console.log(result);
			});             
        }
        catch(e) {

            console.log(e);
        }
    }

    render() {

        return (
			<View style={{width: '100%', height: '100%', flexDirection: 'column'}}>
			
				<Loading 
					visible={this.state.loading} 
					animating={this.state.loading} 
					text={this.state.textLoading} 
                />
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showCategorias}
                >
                    <ScrollView style={{width: '100%', height: '100%'}}>

                        <NavigationBar					
                            style={{
                                backgroundColor: '#000000',
                                height: 60,
                                alignItems: 'center',
                                marginTop: Platform.OS === 'ios' ? 15 : 0,
                            }}
                            leftButton={
                                <TouchableOpacity onPress={() => this.setState({showCategorias: false})}>
                                    <Image source={require('./assets/back.png')} style={{ width: 34, height: 34, marginLeft: '4%' }} />
                                </TouchableOpacity>
                            }  
                            title={
                                <Text 
                                    style={{
                                        color: '#ffffff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    CATEGORIAS
                                </Text>
                            }                          
                        />   

                    </ScrollView>

                </Modal>

                <View style={styles.container}>
                    <NavigationBar					
                        style={{
                            backgroundColor: '#000000',
                            height: 60,
                            alignItems: 'center',
                            marginTop: Platform.OS === 'ios' ? 15 : 0,
                        }}
                        leftButton={
                            <TouchableOpacity onPress={() => this.setState({showCategorias: true})}>
                                <Image source={require('./assets/menu.png')} style={{ width: 34, height: 34, marginLeft: '4%' }} />
                            </TouchableOpacity>
                        }
                        rightButton={

                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <TouchableOpacity onPress={() => this.showSearch()}>
                                    <Image source={require('./assets/procurar.png')} style={{ width: 25, height: 25, marginRight: 30 }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => alert('Tela do carrinho')}>
                                    <Image source={require('./assets/carrinho.png')} style={{ width: 25, height: 25, marginRight: 20 }} />
                                </TouchableOpacity>

                            </View>
                        }
                    />					

                </View>   

                <View 
                    style={{
                        flexDirection: 'column', 
                        marginTop: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    {this.state.showSearch && (

                        <View 
                            style={{
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderColor: '#dedede',
                                borderRadius: 10,
                                height: 50,
                                width: '92%'                                
                            }}
                        >

                            <TextInput
                                style={{
                                    marginLeft: 5,
                                    width: '60%',
                                }}
                                placeholder='Digite sua busca aqui'
                                onChangeText={(text) => this.setState({busca: text})}
                                returnKeyLabel='Busca'
                                onSubmitEditing={() => {
                                    this.getProdutos();
								}}
								autoCorrect={false}
                            />	
                            
                        </View>
                    )}
    
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item.Id}
                        renderItem={({ item }) => {
                            return (
                            
                                <View style={styles.item}>

                                    <View style={{flexDirection: 'row-reverse', marginTop: 10}}>
                                        <TouchableOpacity>
                                            <Image source={require('./assets/coracao.png')} style={{ width: 25, height: 25, marginRight: 20 }} />
                                        </TouchableOpacity>
                                    </View>							

                                    <View style={{alignItems: 'center'}}>
                                        <TouchableOpacity>
                                            <Image source={{uri: item.Skus[0].Images[0].ImageUrl}} style={{ width: 150, height: 150, marginRight: 20 }} />
                                        </TouchableOpacity>
                                    </View>

                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 15,
                                            padding: 5,
                                            textAlign: 'center'
                                        }}
                                    >
                                        {item.Skus[0].Name}
                                    </Text>

                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            marginTop: 15,
                                            padding: 5,
                                            textAlign: 'center',
                                            color: '#FF4000'
                                        }}
                                    >
                                        R$ {item.Skus[0].Sellers[0].Price}

                                    </Text>
                                </View>
                            );
                        }}					
                        numColumns={2} 					
                    />
                </View>

              </View>
        );
      }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
      scrollView: {
        backgroundColor: '#ffffff',
    },
    item: {
        flexDirection: 'column',
        flexGrow: 1,
        margin: 4,
        width: '45%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dedede',
    },
    text: {
        color: "#333333"
	},
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040'
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
		height: 100,
		width: 100,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});

export default Project = App;
