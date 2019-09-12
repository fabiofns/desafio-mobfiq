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
	ActivityIndicator
} from 'react-native';
import NavigationBar from 'react-native-navbar';

class App extends Component  {

	state = {
		loading: false,
		showSearch: false,
		data: [],
		busca: '',
		pagina: 0
	}

	componentDidMount() {
		
		console.log('FETCH DE PRODUTOS');
		this.getProdutos(10);
	}

	showSearch() {

		this.setState({showSearch: !this.state.showSearch});
	}

	getProdutos = async() => {

		try {

			let response = await fetch('https://desafio.mobfiq.com.br/Search/Criteria', {
  				method: 'POST',
  				headers: {
    				Accept: 'application/json',
    				'Content-Type': 'application/json',
  				},
  				body: '{\"Query\" : \"' + this.state.busca + '\",\"Offset\": ' + this.state.pagina + ',\"Size\": ' + '10' + '} '
			});

			let responseJson = await response.json();

			console.log(responseJson.Products);

			this.setState({data: responseJson.Products});
		}
		catch(e) {

			console.log(e);
		}
	}

	render() {

    	return (
			<View style={{width: '100%', height: '100%', flexDirection: 'column'}}>

				<View style={styles.container}>
					<NavigationBar					
						style={{
							backgroundColor: '#000000',
							height: 60,
							alignItems: 'center',
							marginTop: Platform.OS === 'ios' ? 15 : 0,
						}}
						leftButton={
							<TouchableOpacity>
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
	}
});

export default Project = App;
