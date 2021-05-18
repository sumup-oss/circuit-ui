/**
 * Copyright 2021, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const puppeteer = require('puppeteer');

/**
 * This script is used to check for runtime errors in the starter templates
 * create-sumup-next-app and create-sumup-react-app.
 */
(async () => {
  const expected = 'Welcome to SumUp';

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000');

    const heading = await page.$eval('h1', (e) => e.textContent);
    const assertion = heading.includes(expected);

    if (!assertion) {
      throw new Error(
        [
          `Expected page heading to contain '${expected}',`,
          `instead got '${heading}'.`,
        ].join(' '),
      );
    }

    await browser.close();

    console.log(`Found page heading containing ${expected}.`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
