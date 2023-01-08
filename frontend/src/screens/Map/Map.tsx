import MapView, {Callout, Marker} from "react-native-maps";
import style from './mapStyle.json'
import {FC, useEffect, useMemo, useRef, useState} from "react";
import * as Location from "expo-location";
import {Text, Image, View} from "react-native";
import {translate} from "../../utils/translations/translate";
import LocationMark from "../../assets/location-mark.png";

interface MapProps {
    route: any;
}

const Map: FC<MapProps> = ({route}) => {
    const mapRef = useRef<MapView>(null);
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
        if (mapRef.current && currentUserLocation) {
            const coordinates = [route.params]

            if (currentUserLocation)
                coordinates.push(currentUserLocation)

            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                animated: false
            })
        }
    }, [currentUserLocation])

    return <MapView ref={mapRef} className='flex-1' customMapStyle={style}>
        <Marker tracksViewChanges={false} coordinate={route.params} title={route.params.name}/>
        {currentUserLocation && <Marker icon={LocationMark} tracksViewChanges={false} coordinate={currentUserLocation}
                                        title={translate('user-location')}/>}
    </MapView>
}

export default Map