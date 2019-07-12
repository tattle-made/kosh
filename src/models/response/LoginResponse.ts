export default class LoginResponse {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public get() {
    return {
      token: this.token
    };
  }
}
