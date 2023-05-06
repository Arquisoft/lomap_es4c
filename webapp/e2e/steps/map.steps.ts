import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/map.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50});
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000")
      .catch(() => {});
  });

  test('The user loads the map', ({given,when,then}) => {

    given('A logged user', async () => {
      await expect(page).toClick('button', { text: 'Log in' })
      await expect(page).toClick('button', {text: 'Login'})
      await page.waitForNavigation();
      await page.type('#username', "Raul-Alv");
      await page.type('#password', "Lwvvid17__");
      await expect(page).toClick('button', { text: 'Log In' });
      await page.waitForNavigation(); 
      await page.waitForTimeout(7000);
    });

    when('I select to see the map', async () => {
      await expect(page).toClick('button', { text: 'Mapa' })
      await delay(1000);
      
    });

    then('The map will be loaded', async () => {
      const text = await page.evaluate(() => document.body.textContent);
    });
  })

  test('Add a point', ({given,when,and,then}) => {
    given('A user in the map', async () => {
      expect(page.url()).toContain("/map");
    });
    when('I select the button to add a marker', async () => {
        await page.$('a[id="edit"]').then((el) => el?.click());
        await delay(1000);
    });
    and('I click on the map', async () => {
        await expect(page).toClick('div[class="map-container mapboxgl-map"]');
        await delay(1000);
    });
    then('A marker will be added to the map', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        const name = await page.$('input[id="name"]');
        await name?.type("Punto de prueba");

        const desc = await page.$('input[id="desc"]');
        await desc?.type("Descripción de prueba");

        await expect(page).toClick('button[class="guar"]');
        //TODO expect
        
    });
  })

    test('Remove a marker', ({given,when,and,then}) => {
        given('A user in the map', async () => {
          expect(page.url()).toContain("/map");
        });
        when('I click on a marker', async () => {
            expect(page).toClick('div[class="mapboxgl-marker mapboxgl-marker-anchor-center"]');
            await delay(1000);
        });
        then('I click to delete the marker', async () => {
            await expect(page).toClick('a[class="del"]');
            await delay(1000);
        });
    });

  afterAll(async ()=>{
    browser.close()
  })

});


function delay(arg0: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, arg0);
  });
}
