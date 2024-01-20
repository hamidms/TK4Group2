import React, {useState, useEffect} from 'react';
import {Alert, View, Text, StyleSheet, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const apiKey = Config.REACT_APP_GOOGLE_MAPS_API_KEY;

function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRegion, setInitialRegion] = useState({
    latitude: -6.17511,
    longitude: 106.82725,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return response === 'granted';
    }

    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return response === 'granted';
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permission === RESULTS.GRANTED) {
        return true;
      }
    } else {
      const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permission === RESULTS.GRANTED) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        Alert.alert(
          'Permission denied',
          'You need to give permission to access location',
        );
        return;
      }

      setIsLoading(true);
      Geolocation.getCurrentPosition(
        position => {
          setInitialRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setIsLoading(false);
        },
        error => Alert.alert('Error', error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    fetchLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        apiKey={apiKey}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={hasLocationPermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
