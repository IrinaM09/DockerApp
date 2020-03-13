export class WeatherInfo {
    description: string;
    weatherState: string;
    temperature: number;
    maxTemperature: number;
    minTemperature: number;

    public WeatherInfo(temp: number, maxTemp: number, minTemp: number, state: string, description: string) {
        this.description = description;
        this.weatherState = state;
        this.temperature = temp;
        this.maxTemperature = maxTemp;
        this.minTemperature = minTemp;
    }
}
