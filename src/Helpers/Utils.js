import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key, value) {

    try {

        await AsyncStorage.setItem(key, value)
    }
    catch (err) {

        console.log(err);
    }
}

export async function getData(key) {

    let retorno = '';

    try {
        
        const value = await AsyncStorage.getItem(key);

        retorno = value;
            
    }
    catch (err) {

        console.log(err);
    }

    return  retorno;
}