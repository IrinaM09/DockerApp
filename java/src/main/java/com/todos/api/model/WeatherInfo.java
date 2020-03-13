package com.todos.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherInfo {
    int temperature;
    int maxTemperature;
    int minTemperature;
    String weatherState;
    String description;

    public WeatherInfo() {
    }

    public WeatherInfo(int temperature, int maxTemperature, int minTemperature, String weatherState, String description) {
        this.temperature = temperature;
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.weatherState = weatherState;
        this.description = description;
    }

    @Override
    public String toString() {
        return "{" +
                "\"temperature\":" + "\"" + temperature + "\"," +
                "\"maxTemperature\":" + "\"" + maxTemperature + "\"," +
                "\"minTemperature\":" + "\"" + minTemperature + "\"," +
                "\"weatherState\":" + "\"" + weatherState + "\"," +
                "\"description\":" + "\"" + description + "\"" +
                '}';
    }
}
