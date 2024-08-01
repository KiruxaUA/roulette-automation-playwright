# CSGO Empire Roulette Game (Automation Tests)

### Prerequisites packages

npm (v. ^7.0)\
node.js (v. ^18.0)

### Installation instructions

Install dependencies of the project using npm package manager script:

`npm install`

### Run tests

To run the Playwright tests in UI mode:

`npm start`

# Test Suite 

## Preconditions

Navigate to [csgoempire.com](https://csgoempire.com/)
- Check the main page is opened, which is actually with the roulette game by default.

## Roulette Page Test Cases

### Section 1. Wheel of Fortune:

- (**Automated**) Check the wheel isn`t spinning at the same time as the timer is visible.
- Check the straightforwardness and authenticity of the roulette wheel spin animation. Assure this animation carry out properly with out lagging.
- Check that once the game starts, the wheel is in a initial state and not using a preceding outcomes highlighted.
- Check the wheel begins spinning after the 15-second timer expires.
- Check the results do not longer display any predictable outcomes over a massive quantity of spins.
- Check the spin is complete within a reasonable time, not exceeding a few seconds.
- Check the coin pictures are alternating one after the alternative and that they don`t repeat themselves.

### Section 2. Timer:

- (**Automated**) Check the timer is hidden as soon as it reaches zero sec.
- Check that the timer is counting down second by second and attain zero exactly at the 15-second mark.
- Check the timer is displayed and countdown started after the winners are announced.

### Section 3. Sound Switch:

- (**Automated**) Check the sound may be switched on and off.
- Check the sound enablement state persists among spins.

### Section 4. Previous Spins:

- Check the preceding rolls displayed correctly mirror the real past spin results.
- Check that the display only shows the last 10 spins, with earlier results removed as new ones are added.
- Check the latest roll displayed last, followed by earlier rolls in a sequence.
- Check the previous spin result was added to the preceeding rolls without delay.

### Section 5. Last 100 Spins:

- (**Automated**) Check that the total number of all winning bets is 100.
- Check the winning number for each betting option corresponds to the rules and logic of the game.
- Check that each number represents the correct winning number in the last 100 spins.
- Check the winning number stays unchanged till the final touch of the one hundredth spin, at which factor they must replace to mirror the brand new results.
- Check that the winning number is consistent across sessions, provided that the 100th spin has not been reached in the interim.

### Section 6. Bet Amount Field:

- (**Automated**) Check that the system accepts the input and reflects the correct amount in the field.
- (**Automated**) Check the “Clear” button resets the entered number to zero.
- (**Automated**) Check the “+0.01” button adds 0.01 to the number entered in the field.
- (**Automated**) Check the “+0.1” button adds 0.1 to the number entered in the field.
- (**Automated**) Check the “+1” button adds 1 to the number entered in the field.
- (**Automated**) Check the “+10” button adds 10 to the number entered in the field.
- (**Automated**) Check the “+100” button adds 100 to the number entered in the field.
- (**Automated**) Check the “1/2” button divides the number entered in the field by two.
- (**Automated**) Check the “x2” button multiplies the number entered in the field by two.
- Check that the system rejects invalid inputs (letters, not allowed characters, negative numbers, numbers that are lower than minimal bet), not allowing them to be entered into the field.
- Check the “Max” button sets the bet to the maximum available amount that the user has on the deposit.

### Section 7. Place Bet:

- (**Automated**) Check the visibility and availability of all three betting options while the wheel is stopped and the betting timer is active.
- (**Automated**) Check if a Sign In modal is displayed when an unauthenticated user tries to place a bet.
- Check whether the wager field is reset to a default value or blank state when a new betting round begins.
- Check that the winning bet table is visually highlighted when the corresponding betting option wins in roulette.
- Check the losing bet table correctly reflects the subtraction of the total bet from the player's balance.
- Check that once the "Place Bet" button is activated, no input will be accepted into the bet field until the next betting round.
- Check for player balance updates immediately after results are announced.
- Check the betting interface prevents bet placement once the betting timer has expired.
- Check the bet amount is cleared from the bet field upon successful placement.
- Check that all three betting options are displayed non-interactively during the roulette spin.
- Check that the total bet display reflects the accurate number and total of a player's bets on each betting option.
- Check that the bet placement is blocked and an "Insufficient Funds" message appears when a player tries to exceed the available funds.
- Check the winning bet table and multiplies the sum of all winning bets by the win multiplier (2x or 14x) specific to the bet option rolled.
- Check that the bet placement is blocked and if a player tries to enter a value less than 0.01, an error message will appear stating "Minimum bet is 0.01".
- Check the "Place Bet" button submits the entered bet amount for the selected betting option.