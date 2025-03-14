import { Selector, t } from 'testcafe';

fixture('Dropdown Selection Test')
    .page('https://projex-demo.pioapp.net/projects');  // Replace with the actual URL

test('Select an option from the dropdown', async t => {
    // Dropdown button (click to open the list)
    const dropdownButton = Selector("button").withAttribute("class", "relative flex items-center justify-between whitespace-nowrap bg-transparent px-3 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-[auto] w-full rounded-lg border py-2.5 pl-4 pr-4 transition-all duration-200 placeholder:font-light placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 border-gray-300");

    // Dropdown container (ensures it's open before selecting an option)
    const dropdownOptionsContainer = Selector("div").withAttribute("class", "flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6");

    // Specific dropdown option (SAM)
    const samOption = dropdownOptionsContainer.find("div").withText("SAM");

    // Step 1: Click dropdown to open options
    await t
        .click(dropdownButton)
        .wait(2000);  // Give time for dropdown options to appear

    // Step 2: Debugging: Print available options in the dropdown
    const dropdownText = await dropdownOptionsContainer.innerText;
    console.log("Dropdown Options Available:", dropdownText);

    // Step 3: Wait explicitly until "SAM" appears in the list
    await t
        .expect(samOption.exists)
        .ok('SAM option not found in the dropdown', { timeout: 5000 });

    // Step 4: Scroll into view if the option is hidden
    await t
        .scrollIntoView(samOption)
        .wait(1000);

    // Step 5: Click the "SAM" option
    await t
        .click(samOption)
        .wait(2000); // Wait to confirm selection
});
