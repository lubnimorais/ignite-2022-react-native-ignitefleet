import { LocationObjectCoords, reverseGeocodeAsync } from 'expo-location';

export async function getAddressLocation({
  latitude,
  longitude,
}: LocationObjectCoords): Promise<string | null | undefined> {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addressResponse[0]?.street;
  } catch (err) {
    console.log(err);
  }
}
