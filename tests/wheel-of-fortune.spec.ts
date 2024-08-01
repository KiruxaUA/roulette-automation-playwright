import { test } from "@playwright/test";
import { WheelOfFortunePage } from "../pages/wheel-of-fortune";

test.describe("Wheel of fortune", () => {
  let wheelOfFortunePage: WheelOfFortunePage;

  test.beforeEach(async ({ page }) => {
    wheelOfFortunePage = new WheelOfFortunePage(page);
    await wheelOfFortunePage.goto();
  });

  test("Check the wheel isn`t spinning at the same time as the timer is visible", async () => {
    await wheelOfFortunePage.verifyWheelIsNotSpinning();
  });

  test("Check the timer is hidden as soon as it reaches zero sec", async () => {
    await wheelOfFortunePage.waitForTimerToReachZero();
  });

  test("Check the sound may be switched on and off", async () => {
    await wheelOfFortunePage.switchSound(["Sound off", "Sound on"]);
  });

  test("Check that the total number of all winning bets is 100", async () => {
    await wheelOfFortunePage.verifyTotalWinsEquals100();
  });

  test("Check that the system accepts the input and reflects the correct amount in the field", async () => {
    await wheelOfFortunePage.verifyInputReflection("100");
  });

  test("Check the “Clear” button resets the entered number to zero", async () => {
    await wheelOfFortunePage.verifyInputReflection("123");
    await wheelOfFortunePage.verifyButtonFunctionality("Clear", 123, "0");
  });

  test("Check button functionality adds the correct amount", async () => {
    const originalValue = 1.11;

    //"Check the “+0.01” button adds 0.01 to the number entered in the field"
    await wheelOfFortunePage.verifyButtonFunctionality(
      "+ 0.01",
      originalValue,
      (originalValue + 0.01).toFixed(2),
    );

    //"Check the “+0.1” button adds 0.1 to the number entered in the field"
    await wheelOfFortunePage.verifyButtonFunctionality(
      "+ 0.1",
      originalValue,
      (originalValue + 0.1).toFixed(2),
    );

    //"Check the “+1” button adds 1 to the number entered in the field"
    await wheelOfFortunePage.verifyPlusOneButtonFunctionality(
      "+ 1",
      originalValue,
      (originalValue + 1).toFixed(2),
    );

    //"Check the “+10” button adds 10 to the number entered in the field"
    await wheelOfFortunePage.verifyPlusOneButtonFunctionality(
      "+ 10",
      originalValue,
      (originalValue + 10).toFixed(2),
    );

    //"Check the “+100” button adds 100 to the number entered in the field"
    await wheelOfFortunePage.verifyButtonFunctionality(
      "+ 100",
      originalValue,
      (originalValue + 100).toFixed(2),
    );

    //"Check the “1/2” button divides the number entered in the field by two"
    await wheelOfFortunePage.verifyButtonFunctionality(
      "1/ 2",
      originalValue,
      (originalValue / 2).toFixed(2),
    );

    //Check the “x2” button multiplies the number entered in the field by two
    await wheelOfFortunePage.verifyButtonFunctionality(
      "x 2",
      originalValue,
      (originalValue * 2).toFixed(2),
    );
  });

  test("Check the visibility and availability of all three betting options while the wheel is stopped and the betting timer is active", async () => {
    await wheelOfFortunePage.verifyBettingOptionsAvailability();
  });

  test("Check if a Sign In modal is displayed when an unauthenticated user tries to place a bet", async () => {
    test.setTimeout(30000);
    await wheelOfFortunePage.verifySignInModalOnBet();
  });
});