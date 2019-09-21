/**
 * Componente de Loading Personalizado
 * 
 * @author Fabio Souza (fabiofns@gmail.com)
 * @copyright XHB Soluctions
 */
import React, { Component } from 'react';
import {
    View,
    Modal,
    ActivityIndicator,
    Text,
    StyleSheet
}
from 'react-native';

export default class Loading extends Component {

    render() {

        return (
        
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.visible}
                onRequestClose={() => {console.log('close modal')}}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator animating={this.props.animating} size='large' />
                        <Text>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>
            
        )
    }
}

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040'
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});