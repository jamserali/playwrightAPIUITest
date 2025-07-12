import { Page, Locator } from '@playwright/test';

export default class RegisterPage {
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly continueButton: Locator;
  readonly registerButton: Locator;
  readonly agreeCheckbox: Locator;

  constructor(public page: Page) {
    this.registerButton = this.page.getByText("Register")
    this.firstname = this.page.getByPlaceholder('First Name');
    this.lastname = this.page.getByPlaceholder('Last Name');
    this.email = this.page.getByPlaceholder('E-Mail');
    this.phone = this.page.locator('#input-telephone'); // Corrected locator syntax
    this.password = this.page.locator('#input-password');
    this.confirmPassword = this.page.locator('#input-confirm');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.agreeCheckbox = this.page.locator("id=input-agree");
  }

  async clickRegisterButton(){
    await this.registerButton.click()
  }

  async enterFirstName(firstname: string) {
    await this.firstname.fill(firstname);
  }

  async enterLastName(lastname: string) {
    await this.lastname.fill(lastname);
  }

  async enterEmail(email: string) {
    await this.email.fill(email);
  }

  async enterPhone(phone: string) {
    await this.phone.fill(phone);
  }

  async enterPassword(password: string) {
    await this.password.fill(password);
  }

  async enterConfirmPassword(confirmPassword: string) {
    await this.confirmPassword.fill(confirmPassword);
  }
  async checkAgreeCheckBox(){
    await this.agreeCheckbox.click()
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}




