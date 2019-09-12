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
		height: 100,
		width: 100,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});