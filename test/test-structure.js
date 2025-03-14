import { Selector } from 'testcafe';

fixture('Login and Create Project Test')
    .page('https://projex-demo.pioapp.net/projects');

test('Login, Close Popup, Click Create Project, and Select Dropdown Option', async t => {
    // Define selectors using CSS selectors
    const emailInput = Selector('input[placeholder="Enter your email"]');
    const passwordInput = Selector('input[placeholder="Enter your password"]');
    const signInButton = Selector('button[type="submit"]');
    const closeButton = Selector('button[aria-label="Close"]');
    const createProjectButton = Selector('button#create-project');
    const projectNameInput = Selector('input[placeholder="Enter project name"]');
    const dropdownButton = Selector('button.relative.flex.items-center.justify-between.whitespace-nowrap.bg-transparent.px-3.text-sm.shadow-sm.ring-offset-background.focus\\:outline-none.focus\\:ring-1.disabled\\:cursor-not-allowed.disabled\\:opacity-50.\\[\\&\\>span\\]\\:line-clamp-1.h-\\[auto\\].w-full.rounded-lg.border.py-2\\.5.pl-4.pr-4.transition-all.duration-200.placeholder\\:font-light.placeholder\\:text-gray-500.focus\\:border-indigo-500.focus\\:ring-indigo-500.border-gray-300');
    
    // XPath for selecting the dropdown option
    const dropdownOption = Selector('div').withText('Option Text'); // Adjust the 'Option Text' to match the desired option inside the dropdown

    await t
        // Perform login
        .typeText(emailInput, 'qaprojex@gmail.com')
        .typeText(passwordInput, 'password')
        .click(signInButton)
        .wait(5000); // Wait for the page to load

    // Click the Close Button to dismiss the pop-up or dialog
    await t
        .click(closeButton)
        .wait(2000); // Small delay to ensure the pop-up is dismissed

    // Click the Create Project button
    await t
        .click(createProjectButton)
        .wait(3000); // Wait for the project creation modal to open

    // Type the project name into the input field
    await t
        .typeText(projectNameInput, 'My New Project')
        .wait(1000); // Wait for a moment after typing

    // Click the dropdown to open it
    await t
        .click(dropdownButton)
        .wait(1000); // Wait for the dropdown to open

    // Select the dropdown option using XPath
    await t
        .click(dropdownOption) // Click the dropdown option
        .wait(1000); // Wait for the option to be selected
});
