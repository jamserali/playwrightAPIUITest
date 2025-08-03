
import {test, expect} from '@playwright/test';
import { time } from 'console';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import RegisterPage  from '../pages/register.page';



test("Submit Ajax Request",async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground")
    await page.getByRole('link',{name:'Ajax Form Submit'}).click()
    await page.locator("#title").fill("Jamser Ali")
    expect (await page.locator("#title")).toHaveValue("Jamser Ali")
    await page.locator("#description").fill("Description box text")
    expect (await page.locator("#description")).toHaveValue("Description box text")
    await page.getByRole('button', { name: 'submit' }).click()
    expect(await page.getByText('Ajax Request is Processing!')).toHaveText("Ajax Request is Processing!")
})

test("Verify Checkbox in playwright",async({page})=>{

    await page.goto("https://www.lambdatest.com/selenium-playground")
    await page.getByRole('link', { name: 'Checkbox Demo' }).click()
    expect(await page.getByText('Click on check box')).not.toBeChecked()
    await page.getByText('Click on check box').check()
    expect(await page.getByText('Click on check box')).toBeChecked()
    await page.getByText('Click on check box').click()
    expect(await page.getByText('Click on check box')).not.toBeChecked()


})

test("Verify Single dropdown in playwright",async({page})=>{

    await page.goto("https://www.lambdatest.com/selenium-playground")
    await page.getByRole('link', { name: 'Select Dropdown List' }).click()

    // select Single option from dropdown 

    await page.selectOption("#select-demo",{label:'Friday'})
    expect(await page.getByText('Day selected :- Friday')).toBeVisible()


})

test("verify multiple dropdown in playwright", async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground")
    await page.getByRole('link', { name: 'Select Dropdown List' }).click()
    await page.selectOption('#multi-select',[{value:"Texas"},{label:'New York'}])
})


test("Interact with iframes",async({page}) =>{

    await page.goto("https://letcode.in/frame")
    const allFrames = await page.frames();
    console.log("Number of frames :"+allFrames.length)

    const firstFrame =  page.frame("firstFr")
    await firstFrame?.fill("input[name='fname']","JOHN")
    await firstFrame?.fill("input[name='lname']","Elia")


    const text = await firstFrame?.locator("p.has-text-info").textContent()
    expect(text).toContain("You have entered ")
    console.log("Text Displyed :"+text)
})

test("Interact with iframes using frame Locator",async({page}) =>{

    await page.goto("https://letcode.in/frame")
    const allFrames = await page.frames();
    console.log("Number of frames :"+allFrames.length)

    const firstFrame =  page.frameLocator("#firstFr")
    await firstFrame.locator("input[name='fname']").fill("JOHN")
    await firstFrame.locator("input[name='lname']").fill("Elia")


    const text = await firstFrame?.locator("p.has-text-info").textContent()
    expect(text).toContain("You have entered ")
    console.log("Text Displyed :"+text)
})

test("Interact with Nested iframes ",async({page}) =>{

    await page.goto("https://letcode.in/frame")
    const allFrames = await page.frames();
    console.log("Number of frames :"+allFrames.length)

    const frame =  page.frameLocator("#firstFr")
    await frame.locator("input[name='fname']").fill("JOHN")
    await frame.locator("input[name='lname']").fill("Elia")
    await page.waitForTimeout(3000)
    const innerFrame = frame.frameLocator("iframe[src='innerFrame']")
    // console.log(innerFrame)
    await innerFrame.locator("input[name='email']").fill("abcd@gmail.com")
})

test("Validate date picker",async({page})=>{

    await page.goto("https://www.lambdatest.com/selenium-playground")
    await page.getByRole('link', { name: 'Bootstrap Date Picker' }).click()

    await page.waitForTimeout(3000)
    await page.getByRole('textbox', { name: 'Birthday:' }).fill("2024-04-08")

})

   async function SelectStartDate(page,date:number,dateToSelect:string) {
            const startDate =  page.getByRole('textbox', { name: 'Start date' })
            startDate.click();
            const dataPickerSwitch =  page.locator("(//*[@class='datepicker-switch'])[1]")
            const prevButton = page.locator("(//*[@class='prev'])[1]")
            const nextButton =page.locator("(//*[@class='next'])[1]")
    
            const thisMonth = moment(dateToSelect,"MMMM YYYY").isBefore();
    
            while (await dataPickerSwitch.textContent() != dateToSelect ){
              if(thisMonth){
                await prevButton.click();
            }
            else{
                await nextButton.click();
            }}
            await page.locator(`//*[@class='day'][text()='${date}']`).click();
            await page.waitForTimeout(3000)
        }

    test("Validate date picker with multiples",async({page})=>{

        await page.goto("https://www.lambdatest.com/selenium-playground")
        await page.getByRole('link', { name: 'Bootstrap Date Picker' }).click()

        await SelectStartDate(page,9,"November 2024")
        await page.reload()
        await SelectStartDate(page,9,"May 2023")
        await page.reload()
        await SelectStartDate(page,5,"July 2025")
    })

 

test("Validate date picker with multiple", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground");
  await page.getByRole('link', { name: 'Bootstrap Date Picker' }).click();

  const startDate = page.getByRole('textbox', { name: 'Start date' });
  await startDate.click();

  const datePickerSwitch = page.locator("(//*[@class='datepicker-switch'])[1]");
  const prevButton = page.locator("(//*[@class='prev'])[1]");
  const nextButton = page.locator("(//*[@class='next'])[1]");

  const targetMonth = "November 2024";

  // Navigate to the correct month and year
  while (true) {
    const visibleMonth = await datePickerSwitch.textContent();
    if (visibleMonth?.trim() === targetMonth) break;

    const visibleDate = moment(visibleMonth, "MMMM YYYY");
    const targetDate = moment(targetMonth, "MMMM YYYY");

    if (targetDate.isBefore(visibleDate)) {
      await prevButton.click();
    } else {
      await nextButton.click();
    }

    await page.waitForTimeout(300); // Small wait for DOM update
  }

  // Select the day
  await page.locator("//*[@class='day' and text()='9']").click();

  await page.waitForTimeout(3000);
});


test("Download a file",async ({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground")
    await page.getByText("File Download").click()
    await page.waitForTimeout(2000)
    await page.type("id=textbox","This is demo for download a file")
    await page.click("id=create")

    const [download] =await Promise.all([
        page.waitForEvent("download"),
        page.click("id=link-to-download")
    ])
    const fileName =  download.suggestedFilename()
    await download.saveAs(fileName)

})


test("File Upload ",async ({page})=>{
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/")
    await page.setInputFiles("input[type='file']",["files/Figure_1.png","files/Figure_2.png"])
    await page.waitForTimeout(5000)
})

test("Multiple File Upload ",async ({page})=>{
    await page.goto("https://blueimp.github.io/jQuery-File-Upload/")
 
    const [uploadFile] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.click("input[type='file']")
    ])
    const isMultiple = uploadFile.isMultiple()
    console.log(isMultiple)
    await uploadFile.setFiles(["files/Figure_1.png","files/Figure_2.png"])
    await page.waitForTimeout(5000)

})
async function generateMobileNumber(): string {
  const firstDigit = faker.helpers.arrayElement(['7', '8', '9']);
  return firstDigit + faker.phone.number('#########');
}


test('Register new user using Faker Api', async ({ page }) => {
  // Generate random data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({ length: 10 });
  const phone = faker.phone.number()
  console.log("Password: "+password)
//    const registerPage = new RegisterPage(page);
const registerPage = new RegisterPage(page); // 


    // Go to registration page
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.hover("//a[@data-toggle='dropdown']//*[contains(text(),' My account')]")

await registerPage.clickRegisterButton()
await registerPage.enterFirstName(firstName)
await registerPage.enterLastName(lastName)
await registerPage.enterEmail(email)
await registerPage.enterPhone(phone)
await registerPage.enterPassword(password)
await registerPage.enterConfirmPassword(password)
await registerPage.checkAgreeCheckBox()
await registerPage.clickContinueButton()
await expect(page.getByText('Registration successful')).toBeVisible();
});






























































































































































