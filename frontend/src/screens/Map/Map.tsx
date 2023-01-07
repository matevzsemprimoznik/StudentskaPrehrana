import MapView, {Callout, Marker} from "react-native-maps";
import style from './mapStyle.json'
import {FC, useEffect, useMemo, useRef, useState} from "react";
import * as Location from "expo-location";
import {Text, Image, View} from "react-native";
import {translate} from "../../utils/translations/translate";
import LocationMark from "../../assets/location-mark.png";
import MapboxGL from '@rnmapbox/maps';
import {CameraRef} from "@rnmapbox/maps/lib/typescript/components/Camera";

MapboxGL.setAccessToken('pk.eyJ1IjoibWF0ZXZ6IiwiYSI6ImNsY2dmb3l4czA5YjkzbmxjMTAyank0aHMifQ.CyFCzwJ9_VfYh-CQ1Od79g');

interface MapProps {
    route: any;
}

const Map: FC<MapProps> = ({route}) => {
    const camera = useRef<CameraRef>(null);
    const [currentUserLocation, setCurrentUserLocation] = useState<{ longitude: number, latitude: number } | null>();

    const getUserLocation = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            return;
        }
        const location = await Location.getCurrentPositionAsync();
        setCurrentUserLocation({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        })

    }

    useEffect(() => {
        getUserLocation()
    }, [])

    useEffect(() => {
        if (camera.current && currentUserLocation) {
            camera.current.fitBounds([currentUserLocation.longitude, route.params.latitude], [route.params.longitude, currentUserLocation.latitude], 50, 1000)
        }
    }, [currentUserLocation])

    return <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.Camera
            ref={camera}
            zoomLevel={12}
            followUserLocation
            centerCoordinate={[route.params.longitude, route.params.latitude]}
        />
        <MapboxGL.PointAnnotation id='restaurant_location' key='restaurant_location' coordinate={[route.params.longitude, route.params.latitude]} />
        {currentUserLocation && <MapboxGL.PointAnnotation
            key="user_location"
            id="user_location"
            coordinate={[currentUserLocation.longitude, currentUserLocation.latitude]}
        >
            <View
                style={{
                    height: 20,
                    width: 20,
                    backgroundColor: "#1d8ef5",
                    borderRadius: 50,
                    borderColor: "#ffffff",
                    borderWidth: 3,
                }}
            />
        </MapboxGL.PointAnnotation>}
    </MapboxGL.MapView>
}

export default Map