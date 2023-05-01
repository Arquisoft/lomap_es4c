import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    console.log("Iniciando test");
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000")
      .catch(() => {console.log("error");});
  });

  test('The user wants to login', ({given,when,then}) => {
    
    let email:string;
    let username:string;

    given('An unlogged user', () => {

    });

    when('I select the login option', async () => {
      await expect(page).toClick('button', { text: 'Log in' })
      await expect(page).toClick('button', {text: 'Login'})
      
    });

    then('The page for the POD provider will show, asking for credentials', async () => {
      
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

