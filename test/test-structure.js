import { Selector } from 'testcafe';

fixture('Lyncs Login and Navigation Automation')
    .page('https://app-lyncs.pioapp.net/login');

test('Login, Navigate to Projects, and Create a New Project with Dates', async t => {
    // Define selectors for login
    const emailInput = Selector('input[placeholder="Enter your email"]');
    const passwordInput = Selector('input[placeholder="Enter your password"]');
    const signInButton = Selector('button[type="submit"]');
    
    // Create a selector from the XPath for the Projects option
    const projectsOption = Selector(() => {
        const result = document.evaluate(
            "//div[@class='absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 from-stone-700 to-stone-700']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });

    // Alternative selector using TestCafe's built-in methods
    const projectsOptionAlt = Selector('div')
        .withAttribute('class', 'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 from-stone-700 to-stone-700');

    // Create a selector for the Close button using XPath
    const closeButton = Selector(() => {
        const result = document.evaluate(
            "//button[@aria-label='Close']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });

    // Alternative selector for the Close button using TestCafe's built-in methods
    const closeButtonAlt = Selector('button').withAttribute('aria-label', 'Close');

    // Create a selector for the Create Project button using XPath
    const createProjectButton = Selector(() => {
        const result = document.evaluate(
            "//button[@id='create-project']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });

    // Alternative selector for the Create Project button
    const createProjectButtonAlt = Selector('button').withAttribute('id', 'create-project');

    // Create a selector for the project name input field
    const projectNameInput = Selector(() => {
        const result = document.evaluate(
            "//input[@placeholder='Enter project name']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });
    
    // Alternative selector for the project name input
    const projectNameInputAlt = Selector('input').withAttribute('placeholder', 'Enter project name');

    // Create a selector for the dropdown button
    const dropdownButton = Selector(() => {
        const result = document.evaluate(
            "//button[@class='relative flex items-center justify-between whitespace-nowrap bg-transparent px-3 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-[auto] w-full rounded-lg border py-2.5 pl-4 pr-4 transition-all duration-200 placeholder:font-light placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 border-gray-300']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });

    // Alternative selector for the dropdown button
    const dropdownButtonAlt = Selector('button').withAttribute('class', /relative flex items-center justify-between whitespace-nowrap bg-transparent/);

    // Create a selector for the start date field using XPath
    const startDateField = Selector(() => {
        const result = document.evaluate(
            "//body/div[@id='root']/div[@class='min-h-screen bg-app-primary-background font-halvicta']/main[@class='mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:px-8']/div[@class='container mx-auto md:px-4 md:py-8']/div[@class='mx-auto max-w-5xl']/div[@class='p-0']/div[1]",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });

    // Alternative selector for the start date
    const startDateFieldAlt = Selector('div').withText('Start Date');

    // Create a selector for the end date field using XPath
    const endDateField = Selector(() => {
        const result = document.evaluate(
            "//span[normalize-space()='Pick an end date']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return result.singleNodeValue;
    });

    // Alternative selector for the end date
    const endDateFieldAlt = Selector('span').withText('Pick an end date');

    // Perform login actions
    await t
        // Wait for email input to be visible
        .wait(2000)
        .typeText(emailInput, 'qalyncs@gmail.com')
        .typeText(passwordInput, 'password')
        .click(signInButton)
        .wait(5000); // Wait for login to complete and dashboard to load

    // Find and click on the Projects option
    const projectsOptionExists = await projectsOption.exists;
    const projectsOptionVisible = await projectsOption.visible;
    
    if (projectsOptionExists && projectsOptionVisible) {
        await t
            .hover(projectsOption) // Hover first since it uses group-hover in its class
            .click(projectsOption)
            .wait(3000);
    } 
    // If XPath selector doesn't work, try the alternative
    else {
        const projectsOptionAltExists = await projectsOptionAlt.exists;
        const projectsOptionAltVisible = await projectsOptionAlt.visible;
        
        if (projectsOptionAltExists && projectsOptionAltVisible) {
            await t
                .hover(projectsOptionAlt)
                .click(projectsOptionAlt)
                .wait(3000);
        }
        // If neither selector works, try to debug
        else {
            console.log('Projects option not found. Attempting to debug...');
            
            // Find the parent element that might contain the Projects option
            const sidebar = Selector('nav').withText('Dashboard');
            const sidebarExists = await sidebar.exists;
            
            if (sidebarExists) {
                // Log information about the sidebar for debugging
                const sidebarHTML = await sidebar.innerHTML;
                console.log('Sidebar HTML:', sidebarHTML);
                
                // Try to find any element containing "Projects" text
                const projectsText = Selector('span').withText('Projects');
                const projectsTextExists = await projectsText.exists;
                
                if (projectsTextExists) {
                    await t
                        .hover(projectsText)
                        .click(projectsText)
                        .wait(3000);
                }
            }
            
            // If all else fails, enter debug mode to manually inspect
            await t.debug();
        }
    }
    
    // Verify navigation to projects page
    const projectsPageIndicator = Selector('h1').withText('Projects');
    await t.expect(projectsPageIndicator.exists).ok('Navigation to Projects was successful');
    
    // Close popup if it exists
    const closeButtonExists = await closeButton.exists;
    const closeButtonVisible = await closeButton.visible;
    
    if (closeButtonExists && closeButtonVisible) {
        await t
            .click(closeButton)
            .wait(2000);
        console.log('Successfully clicked the Close button using XPath selector');
    }
    else {
        const closeButtonAltExists = await closeButtonAlt.exists;
        const closeButtonAltVisible = await closeButtonAlt.visible;
        
        if (closeButtonAltExists && closeButtonAltVisible) {
            await t
                .click(closeButtonAlt)
                .wait(2000);
            console.log('Successfully clicked the Close button using alternative selector');
        }
    }
    
    // Now click the Create Project button
    // Try the XPath selector first
    const createProjectButtonExists = await createProjectButton.exists;
    const createProjectButtonVisible = await createProjectButton.visible;
    
    if (createProjectButtonExists && createProjectButtonVisible) {
        await t
            .click(createProjectButton)
            .wait(2000);
        console.log('Successfully clicked the Create Project button using XPath selector');
    }
    // If XPath selector doesn't work, try the alternative
    else {
        const createProjectButtonAltExists = await createProjectButtonAlt.exists;
        const createProjectButtonAltVisible = await createProjectButtonAlt.visible;
        
        if (createProjectButtonAltExists && createProjectButtonAltVisible) {
            await t
                .click(createProjectButtonAlt)
                .wait(2000);
            console.log('Successfully clicked the Create Project button using alternative selector');
        }
        else {
            console.log('Create Project button not found. Attempting to debug...');
            
            // Try to find any button containing "Create Project" or "New Project" text
            const createProjectText = Selector('button').withText(/create project|new project/i);
            const createProjectTextExists = await createProjectText.exists;
            
            if (createProjectTextExists) {
                await t
                    .click(createProjectText)
                    .wait(2000);
                console.log('Clicked a button with Create Project text');
            } else {
                await t.takeScreenshot('create-project-not-found.png');
                await t.debug();
            }
        }
    }
    
    // Enter project name
    // Try the XPath selector first
    const projectNameInputExists = await projectNameInput.exists;
    const projectNameInputVisible = await projectNameInput.visible;
    
    if (projectNameInputExists && projectNameInputVisible) {
        await t
            .typeText(projectNameInput, 'New Project')
            .wait(1000);
        console.log('Successfully entered project name using XPath selector');
    }
    // If XPath selector doesn't work, try the alternative
    else {
        const projectNameInputAltExists = await projectNameInputAlt.exists;
        const projectNameInputAltVisible = await projectNameInputAlt.visible;
        
        if (projectNameInputAltExists && projectNameInputAltVisible) {
            await t
                .typeText(projectNameInputAlt, 'New Project')
                .wait(1000);
            console.log('Successfully entered project name using alternative selector');
        }
        else {
            console.log('Project name input not found. Attempting to debug...');
            
            // Try to find any input that might be for project name
            const anyInput = Selector('input').filter(node => {
                return node.getAttribute('type') !== 'hidden';
            }).nth(0);
            
            const anyInputExists = await anyInput.exists;
            
            if (anyInputExists) {
                await t
                    .typeText(anyInput, 'New Project')
                    .wait(1000);
                console.log('Typed into the first visible input field');
            } else {
                await t.takeScreenshot('project-name-input-not-found.png');
                await t.debug();
            }
        }
    }
    
    // Click the dropdown
    // Try the XPath selector first
    const dropdownButtonExists = await dropdownButton.exists;
    const dropdownButtonVisible = await dropdownButton.visible;
    
    if (dropdownButtonExists && dropdownButtonVisible) {
        await t
            .click(dropdownButton)
            .wait(2000);
        console.log('Successfully clicked the dropdown button using XPath selector');
    }
    // If XPath selector doesn't work, try the alternative
    else {
        const dropdownButtonAltExists = await dropdownButtonAlt.exists;
        const dropdownButtonAltVisible = await dropdownButtonAlt.visible;
        
        if (dropdownButtonAltExists && dropdownButtonAltVisible) {
            await t
                .click(dropdownButtonAlt)
                .wait(2000);
            console.log('Successfully clicked the dropdown button using alternative selector');
        }
        else {
            console.log('Dropdown button not found. Attempting to debug...');
            
            // Try to find any dropdown-like element
            const anyDropdown = Selector('button').withAttribute('class', /dropdown|select/i);
            const anyDropdownExists = await anyDropdown.exists;
            
            if (anyDropdownExists) {
                await t
                    .click(anyDropdown)
                    .wait(2000);
                console.log('Clicked a potential dropdown button');
            } else {
                await t.takeScreenshot('dropdown-not-found.png');
                await t.debug();
            }
        }
    }
    
    // Select option A111 from the dropdown
    const optionA111 = Selector('div').withText('A111');
    
    // Wait for the dropdown options to be visible
    await t.wait(1000);
    
    const optionA111Exists = await optionA111.exists;
    const optionA111Visible = await optionA111.visible;
    
    if (optionA111Exists && optionA111Visible) {
        await t
            .click(optionA111)
            .wait(1000);
        console.log('Successfully selected option A111');
    }
    else {
        console.log('Option A111 not found in dropdown. Attempting to debug...');
        
        // List all visible options to help debug
        const allOptions = Selector('div').filter(() => {
            return true; // Get all divs to check what options are available
        });
        
        const count = await allOptions.count;
        console.log(`Found ${count} potential options`);
        
        for (let i = 0; i < Math.min(count, 10); i++) {
            console.log(`Option ${i} text:`, await allOptions.nth(i).innerText);
        }
        
        // Try clicking the first option as a fallback
        const firstOption = Selector('li').nth(0);
        const firstOptionExists = await firstOption.exists;
        const firstOptionVisible = await firstOption.visible;
        
        if (firstOptionExists && firstOptionVisible) {
            await t
                .click(firstOption)
                .wait(1000);
            console.log('Clicked the first available option as fallback');
        } else {
            await t.takeScreenshot('dropdown-options-not-found.png');
            await t.debug();
        }
    }
    
    // Now scroll down to the date fields section
    await t
        .scroll(0, 300) // Scroll down 300 pixels
        .wait(1000);
        
    // Date Selection Approach 1: Try finding direct date input fields
    const dateInputs = Selector('input[type="date"], input[placeholder*="date"]');
    const dateInputsCount = await dateInputs.count;
    
    if (dateInputsCount > 0) {
        console.log(`Found ${dateInputsCount} date input fields`);
        
        // Type start date (April 1, 2025) in the first date input
        const firstDateInputExists = await dateInputs.nth(0).exists;
        
        if (firstDateInputExists) {
            await t
                .click(dateInputs.nth(0))
                .pressKey('ctrl+a delete') // Clear the field
                .typeText(dateInputs.nth(0), '2025-04-01', { paste: true })
                .pressKey('tab') // Tab out to confirm
                .wait(1000);
            console.log('Entered start date (April 1, 2025) via direct input');
        }
        
        // Type end date (April 30, 2025) in the second date input
        if (dateInputsCount > 1) {
            const secondDateInputExists = await dateInputs.nth(1).exists;
            
            if (secondDateInputExists) {
                await t
                    .click(dateInputs.nth(1))
                    .pressKey('ctrl+a delete') // Clear the field
                    .typeText(dateInputs.nth(1), '2025-04-30', { paste: true })
                    .pressKey('tab') // Tab out to confirm
                    .wait(1000);
                console.log('Entered end date (April 30, 2025) via direct input');
            }
        }
    } 
    else {
        console.log('No direct date input fields found. Trying approach 2...');
        
        // Approach 2: Look for date field elements by text
        const startDateElementExists = await startDateField.exists;
        const startDateElementVisible = await startDateField.visible;
        
        if (startDateElementExists && startDateElementVisible) {
            await t
                .click(startDateField)
                .wait(1000);
            console.log('Clicked on start date field using XPath selector');
            
            // Fixed: Use a different approach instead of .focused()
            // Try to find any input that becomes visible after clicking
            const dateInputAfterClick = Selector('input').filter(node => {
                return node.getAttribute('type') !== 'hidden' && 
                       (node.getAttribute('placeholder')?.includes('date') || 
                        node.getAttribute('type') === 'date');
            }).nth(0);
            
            const dateInputAfterClickExists = await dateInputAfterClick.exists;
            
            if (dateInputAfterClickExists) {
                await t
                    .typeText(dateInputAfterClick, '04/01/2025', { replace: true })
                    .pressKey('tab')
                    .wait(1000);
                console.log('Entered start date after clicking field');
            } else {
                // Try to find a calendar element
                const calendar = Selector('div[role="dialog"], div[role="grid"], div.calendar, div[class*="calendar"], div[class*="datepicker"]');
                const calendarExists = await calendar.exists;
                
                if (calendarExists) {
                    // Try to find and click on day 1
                    const day1 = Selector('button, td, div').withText('1').filter(node => {
                        return node.textContent === '1' || node.textContent === '01';
                    });
                    const day1Exists = await day1.exists;
                    
                    if (day1Exists) {
                        await t
                            .click(day1)
                            .wait(1000);
                        console.log('Selected day 1 from calendar');
                    } else {
                        console.log('Day 1 not found in calendar');
                    }
                } else {
                    console.log('No calendar found after clicking start date field');
                    // Try keyboard input as fallback
                    await t
                        .pressKey('4') // Month
                        .pressKey('1') // Day
                        .pressKey('2') // Year digit 1
                        .pressKey('0') // Year digit 2
                        .pressKey('2') // Year digit 3
                        .pressKey('5') // Year digit 4
                        .wait(1000);
                    console.log('Attempted keyboard input for start date');
                }
            }
        } else {
            // Try alternative selector
            const startDateFieldAltExists = await startDateFieldAlt.exists;
            const startDateFieldAltVisible = await startDateFieldAlt.visible;
            
            if (startDateFieldAltExists && startDateFieldAltVisible) {
                await t
                    .click(startDateFieldAlt)
                    .wait(1000);
                console.log('Clicked on start date field using alternative selector');
                
                // Similar date input handling as above but with the fix for focused()
                const dateInputAfterClick = Selector('input').filter(node => {
                    return node.getAttribute('type') !== 'hidden' && 
                           (node.getAttribute('placeholder')?.includes('date') || 
                            node.getAttribute('type') === 'date');
                }).nth(0);
                
                const dateInputAfterClickExists = await dateInputAfterClick.exists;
                
                if (dateInputAfterClickExists) {
                    await t
                        .typeText(dateInputAfterClick, '04/01/2025', { replace: true })
                        .pressKey('tab')
                        .wait(1000);
                }
            } else {
                console.log('Start date field not found with either selector');
            }
        }
        
        // Now handle end date field similarly
        const endDateFieldExists = await endDateField.exists;
        const endDateFieldVisible = await endDateField.visible;
        
        if (endDateFieldExists && endDateFieldVisible) {
            await t
                .click(endDateField)
                .wait(1000);
            console.log('Clicked on end date field using XPath selector');
            
            // Similar handling for end date with the fix for focused()
            const dateInputAfterClick = Selector('input').filter(node => {
                return node.getAttribute('type') !== 'hidden' && 
                       (node.getAttribute('placeholder')?.includes('date') || 
                        node.getAttribute('type') === 'date');
            }).nth(0);
            
            const dateInputAfterClickExists = await dateInputAfterClick.exists;
            
            if (dateInputAfterClickExists) {
                await t
                    .typeText(dateInputAfterClick, '04/30/2025', { replace: true })
                    .pressKey('tab')
                    .wait(1000);
                console.log('Entered end date after clicking field');
            } else {
                // Try to find a calendar element
                const calendar = Selector('div[role="dialog"], div[role="grid"], div.calendar, div[class*="calendar"], div[class*="datepicker"]');
                const calendarExists = await calendar.exists;
                
                if (calendarExists) {
                    // Try to find and click on day 30
                    const day30 = Selector('button, td, div').withText('30');
                    const day30Exists = await day30.exists;
                    
                    if (day30Exists) {
                        await t
                            .click(day30)
                            .wait(1000);
                        console.log('Selected day 30 from calendar');
                    } else {
                        console.log('Day 30 not found in calendar');
                    }
                } else {
                    console.log('No calendar found after clicking end date field');
                    // Try keyboard input as fallback
                    await t
                        .pressKey('4') // Month
                        .pressKey('3') // Day digit 1
                        .pressKey('0') // Day digit 2
                        .pressKey('2') // Year digit 1
                        .pressKey('0') // Year digit 2
                        .pressKey('2') // Year digit 3
                        .pressKey('5') // Year digit 4
                        .wait(1000);
                    console.log('Attempted keyboard input for end date');
                }
            }
        } else {
            // Try alternative selector
            const endDateFieldAltExists = await endDateFieldAlt.exists;
            const endDateFieldAltVisible = await endDateFieldAlt.visible;
            
            if (endDateFieldAltExists && endDateFieldAltVisible) {
                await t
                    .click(endDateFieldAlt)
                    .wait(1000);
                console.log('Clicked on end date field using alternative selector');
                
                // Similar date input handling as above with the fix for focused()
                const dateInputAfterClick = Selector('input').filter(node => {
                    return node.getAttribute('type') !== 'hidden' && 
                           (node.getAttribute('placeholder')?.includes('date') || 
                            node.getAttribute('type') === 'date');
                }).nth(0);
                
                const dateInputAfterClickExists = await dateInputAfterClick.exists;
                
                if (dateInputAfterClickExists) {
                    await t
                        .typeText(dateInputAfterClick, '04/30/2025', { replace: true })
                        .pressKey('tab')
                        .wait(1000);
                }
            } else {
                console.log('End date field not found with either selector');
            }
        }
    }
    
    // Look for Submit/Create button to finalize project creation
    const submitButton = Selector('button').withText(/submit|create|save|done/i);
    const submitButtonExists = await submitButton.exists;
    
    if (submitButtonExists) {
        await t
            .click(submitButton)
            .wait(3000);
        console.log('Clicked the submit/create button to finalize project creation');
    }
    
    // Take a final screenshot to verify the state
    await t
        .takeScreenshot('after-date-selection.png')
        .wait(2000);
}