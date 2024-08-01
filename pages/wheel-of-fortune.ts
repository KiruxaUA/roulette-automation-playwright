import { Page, expect } from "@playwright/test";

export class WheelOfFortunePage {
  page: Page;
  timerSelector = "div.font-numeric.text-2xl.font-bold";
  timerVisibleSelector = "div.wheel__item--visible";
  betInputSelector = 'input[placeholder="Enter bet amount..."]';
  // Not ideal. But other options are too strange and long. Test ID locator will be more appropriate.
  soundSwitchSelector =
    '//*[@id="app"]/div[1]/div[2]/div/div/div[1]/div[2]/div/div[1]/button';
  bettingOptionsSelector = "button.bet-btn";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://csgoempire.com/");
    await expect(this.page).toHaveTitle(
      /CSGOEmpire | The most trusted CSGO Skin Gambling Site/i,
    );
  }

  async isWheelSpinning(page: Page): Promise<boolean> {
    return page.evaluate(() => {
      const targetElement = document.querySelector<HTMLElement>("div.wheel");
  
      if (!targetElement) {
        return false;
      }
  
      const style = window.getComputedStyle(targetElement);
      const backgroundPosition = style.backgroundPosition;
      const positionValues = backgroundPosition.split(" ").map(Number);
  
      return positionValues.some((pos) => !isNaN(pos) && pos > 0);
    });
  }

  async verifyWheelIsNotSpinning(): Promise<void> {
    const timerLocator = this.page.locator(this.timerSelector);
    await expect(timerLocator).toBeVisible();
  
    const isSpinning = await this.isWheelSpinning(this.page);
    expect(isSpinning).toBeFalsy();
  }

  async waitForTimerToReachZero() {
    await this.page.waitForFunction((selector: string) => {
      const timer: Element | null = document.querySelector(selector);
      return timer && timer.textContent?.trim() === "0.00";
    }, this.timerSelector);

    await expect(this.page.locator(this.timerVisibleSelector)).toHaveCount(1);
  }

  async switchSound(expectedStates: string[]): Promise<void> {
    for (const expectedState of expectedStates) {
      await this.page.click(this.soundSwitchSelector);
      const soundSwitchLocator = this.page.locator(this.soundSwitchSelector);
      await expect(soundSwitchLocator).toHaveText(expectedState);
    }
  }  

  async verifyTotalWinsEquals100() {
    const selectors = ["coin-ct", "coin-bonus", "coin-t"];
    let totalWins = 0;
    for (const selector of selectors) {
      const text = await this.page.evaluate((className) => {
        const targetElement = document.querySelector(`.${className}.h-16.w-16`);
        const numberElement = targetElement?.nextElementSibling;
        return numberElement ? numberElement.textContent : null;
      }, selector);
      totalWins += parseInt(text || "0", 10);
    }
    expect(totalWins).toBe(100);
  }

  async verifyInputReflection(amount: string) {
    await this.page.fill(this.betInputSelector, amount);
    await expect(this.page.locator(this.betInputSelector)).toHaveValue(amount);
  }

  async verifyButtonFunctionality(
    buttonName: string,
    originalValue: number,
    expectedValue: string
  ): Promise<void> {
    await this.page.fill(this.betInputSelector, originalValue.toString());
    await this.page.getByRole("button", { name: buttonName }).click();
    await expect(this.page.locator(this.betInputSelector)).toHaveValue(expectedValue);
  }  

  async verifyPlusOneButtonFunctionality(
    buttonName: string,
    originalValue: number,
    expectedValue: string
  ): Promise<void> {
    await this.page.fill(this.betInputSelector, originalValue.toString());
    await this.page.getByRole("button", { name: buttonName }).first().click();
    await expect(this.page.locator(this.betInputSelector)).toHaveValue(expectedValue);
  }  

  async verifyBettingOptionsAvailability(): Promise<void> {
    const bettingOptions = this.page.locator(this.bettingOptionsSelector);
    await expect(bettingOptions).toHaveCount(3);
    
    const optionsEnabled = await Promise.all([
      bettingOptions.first().isEnabled(),
      bettingOptions.nth(1).isEnabled(),
      bettingOptions.nth(2).isEnabled()
    ]);
  
    for (const isEnabled of optionsEnabled) {
      expect(isEnabled).toBe(true);
    }
  }

  async verifySignInModalOnBet() {
    await this.page.waitForLoadState("networkidle");

    await this.page.fill(this.betInputSelector, "123");
    const customSelector = `button[disable="false"].bet-btn`;
    await this.page.locator(customSelector).first().click();
    const signInModal = this.page.getByText("Please sign in to start playing!");
    expect(signInModal).toBeVisible();
  }
}