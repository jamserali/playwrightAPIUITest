import {test,expect, chromium} from 'playwright/test';

test("Login Test", async()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // const page1= await  chromium.launch().newContext().newPage();
    await page.goto("https://ecommerce-playground.lambdatest.io/");

    await page.hover("//a[@data-toggle='dropdown']//span[contains(text(),'My account')]");
    // await page1.locator("//a[@class='icon-left both dropdown-item']//span[contains(text(),'Login')]").click()
    await page.click("'Login'");
    await page.fill("input[name='email']","koushik350@gmail.com")
    await page.fill("input[name='password']","Pass123$")
    await page.click("input[value='Login']")

    await page.waitForTimeout(5000)

})


