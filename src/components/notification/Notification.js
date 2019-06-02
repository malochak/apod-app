import { Permissions, Notifications } from 'expo';
import {firebase} from '../logon/authentication_logic/'

  export const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();

      firebase
        .database()
        .ref('users/' + this.currentUser.uid + '/push_token')
        .set(token);
    } catch (error) {
      console.log(error);
    }
  }

