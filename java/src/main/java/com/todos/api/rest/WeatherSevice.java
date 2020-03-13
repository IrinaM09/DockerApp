package com.todos.api.rest;

import com.todos.api.model.WeatherInfo;
import net.aksingh.owmjapis.core.OWM;
import net.aksingh.owmjapis.model.CurrentWeather;
import net.aksingh.owmjapis.model.param.Main;
import net.aksingh.owmjapis.model.param.Weather;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/")
public class WeatherSevice {

    @Path("getWeatherInfo")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getCityWeather(@DefaultValue("Bucharest") @QueryParam("cityName") String cityName) {
        try {
            System.out.println("Find weather information for: " + cityName);

            OWM openWeatherAPI = new OWM("cbe1e66bf214d7181952ab1f3ddbfe58");

            WeatherInfo weatherInfo;

            CurrentWeather currentWeather = openWeatherAPI.currentWeatherByCityName(cityName);

            Main mainData = currentWeather.getMainData();
            List<Weather> weatherList = currentWeather.getWeatherList();
            assert mainData != null;
            assert weatherList != null;

            String description = weatherList.get(0).getMoreInfo();
            assert  description != null;

            int currentTemperature = kelvin2Celsius(mainData.getTemp());
            int maxTemperature = kelvin2Celsius(mainData.getTempMax());
            int minTemperature = kelvin2Celsius(mainData.getTempMin());
            String weatherState = mapWeatherState(description, currentTemperature);

            weatherInfo = new WeatherInfo(currentTemperature, maxTemperature, minTemperature, weatherState, description);

            return weatherInfo.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private int kelvin2Celsius(Double number) {
        return (int) (number - 273.15);
    }

    private String mapWeatherState(String state, int temperature) {
        System.out.println("Current state is: " + state);

        if (temperature < -10) {
            return "snow";
        }
        if (temperature > -10 && temperature <= 0) {
            return "cold";
        }

        if (state.contains("thunderstorm") ||
                state.contains("drizzle") ||
                state.contains(("rain")) ||
                state.contains(("storm")) ||
                state.contains(("hail"))) {
            return "rain";
        }
        if (state.contains("mist") ||
                state.contains("smoke") ||
                state.contains(("haze")) ||
                state.contains(("fog")) ||
                state.contains(("ash")) ||
                state.contains(("sand")) ||
                state.contains(("dust")) ||
                state.contains(("squalls")) ||
                state.contains(("tornado")) ||
                state.contains(("hurricane"))) {
            return "fog";
        }
        if (state.contains("clouds") ||
                state.contains("hot") ||
                state.contains(("calm"))) {
            return "sun";
        }
        if (state.contains("gale") ||
                state.contains("windy") ||
                state.contains(("breeze"))) {
            return "wind";
        }
        if (state.contains("snow")) {
            return "snow";
        }
        if (state.contains("sleet")) {
            return "sleet";
        }
        if (state.contains("cold")) {
            return "cold";
        }
        return "sun";
    }
}
