@ -0,0 +1,59 @@
import { Selector } from 'testcafe';

// Function to use XPath Selectors
const XpathSelector = Selector(xpath => {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
});

fixture('Login and Create Project Test')
    .page('https://projex-demo.pioapp.net/projects');

test('Login, Close Popup, and Create Project', async t => {
    // Login Elements
    const emailInput = XpathSelector("//input[@placeholder='Enter your email']");
    const passwordInput = XpathSelector("//input[@placeholder='Enter your password']");
    const signInButton = XpathSelector("//button[@type='submit']");
    
    // Close Button for Dialog
    const closeButton = XpathSelector("//button[@aria-label='Close']");

    // Elements for Creating Project
    const createProjectButton = XpathSelector("//a[contains(text(),'Create Project')]");
    const projectNameInput = XpathSelector("//input[@name='project_name']");
    const dropdownToggle = XpathSelector("//label[text()='Select Option']/following-sibling::div//div[contains(@class, 'dropdown-toggle')]");
    const dropdownOptionSam = XpathSelector("//div[@class='dropdown-menu show']//a[contains(text(),'Sam')]");
    const saveButton = XpathSelector("//button[contains(text(),'Save')]");

    await t
        // Perform login
        .typeText(emailInput, 'qaprojex@gmail.com')
        .typeText(passwordInput, 'password')
        .click(signInButton)
        .wait(5000); // Wait for the page to load

    // Close the popup dialog if it appears
    if (await closeButton.exists && await closeButton.visible) {
        await t.click(closeButton);
    }

    // Navigate to Create Project
    await t
        .click(createProjectButton)
        .wait(2000); // Wait for navigation

    // Fill in Project Name
    await t
        .typeText(projectNameInput, 'Qa test')
        .wait(1000); // Wait for input

    // Select 'Sam' from the dropdown
    await t
        .click(dropdownToggle)
        .click(dropdownOptionSam)
        .wait(1000); // Wait for selection

    // Save the project
    await t
        .click(saveButton)
        .wait(5000); // Wait for the save operation
});