import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./screens/SplashScreen";
import UserSelectionScreen from "./screens/UserSelectionScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainTabs from "./screens/MainTabs";
import CourseScreen from "./screens/CourseScreen"; // <-- NEW: Course screen import
import CalendarScreen from "./screens/CalendarScreen"; // <-- NEW: Tab navigation file
import LecturerDashboardScreen from "./screens/LecturerDashboardScreen";
import LecturerCalendarScreen from "./screens/LecturerCalendarScreen";
import LecturerCoursesScreen from "./screens/LecturerCoursesScreen";
import LecturerMaterialsScreen from "./screens/LecturerMaterialsScreen";
import LecturerSettingsScreen from "./screens/LecturerSetting";
import { CalendarRange } from "lucide-react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#FFFFFF" },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="UserSelection" component={UserSelectionScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Course" component={CourseScreen} />
          <Stack.Screen
            name="LecturerDashboard"
            component={LecturerDashboardScreen}
          />
          <Stack.Screen
            name="LecturerCalendar"
            component={LecturerCalendarScreen}
          />
          <Stack.Screen
            name="LecturerCourses"
            component={LecturerCoursesScreen}
          />
          <Stack.Screen
            name="LecturerMaterials"
            component={LecturerMaterialsScreen}
          />
          <Stack.Screen
            name="LecturerSettings"
            component={LecturerSettingsScreen}
          />
          <Stack.Screen name="Home" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
