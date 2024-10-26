import { reverseGeocodeAsync } from 'expo-location';

type IGetAddressLocationProps = {
  latitude: number;
  longitude: number;
};

export async function getAddressLocation({
  latitude,
  longitude,
}: IGetAddressLocationProps): Promise<string | null | undefined> {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addressResponse[0]?.street;
  } catch (err) {
    console.log(err);
  }
}
