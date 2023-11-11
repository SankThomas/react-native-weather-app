import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function getWeather() {
      const url =
        "https://weatherapi-com.p.rapidapi.com/current.json?q=nairobi";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCity(result);
      } catch (error) {
        console.error(error);
      }
    }

    getWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {city && (
        <ImageBackground
          source={{
            uri: city.current.is_day
              ? "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              : "https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          style={styles.backgroundImage}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingTop: 52,
              paddingBottom: 100,
              paddingHorizontal: 16,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.heading}>{city.location.name}</Text>
              <Feather
                name="settings"
                size={24}
                color="#333"
                style={{ color: "#fff" }}
              />
            </View>

            <View>
              <View style={styles.temp}>
                <Text style={styles.tempShown}>{city.current.temp_c}</Text>
                <Text style={styles.text}>{city.current.condition.text}</Text>
              </View>

              <View style={styles.more}>
                <Text style={styles.text}>
                  Feels like {city.current.feelslike_c}
                </Text>
                <Text style={styles.text}>
                  <Feather name="wind" size={24} color="#fff" />{" "}
                  {city.current.wind_kph}kph
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 24,
  },
  temp: {
    alignItems: "center",
  },
  tempShown: {
    fontSize: 150,
    fontWeight: "800",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginTop: 32,
  },
});
