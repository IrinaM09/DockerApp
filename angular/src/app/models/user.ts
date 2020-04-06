export class User {
    email: string;
    password: string;
    accessToken: string;
    cities: string;

    public User(email: string, password: string, accessToken: string, cities: string) {
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
        this.cities = cities;
    }
}
