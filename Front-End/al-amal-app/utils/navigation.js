// Create a navigation file (e.g., navigation.js)

import { CommonActions } from "@react-navigation/native";

let navigationRef;

export function setTopLevelNavigator(ref) {
  navigationRef = ref;
}

export function navigateTo(pageName) {
  if (navigationRef) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: pageName }],
      })
    );
  }
}
