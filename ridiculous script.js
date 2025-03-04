// Wait for the DOM to fully load before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const checkboxWrapper = document.getElementById('checkboxWrapper');
    const checkbox = document.getElementById('checkbox');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const waldoImage = document.getElementById('waldoImage');
    const tooltipContainer = document.getElementById('tooltipContainer');
    const verifyButton = document.getElementById('verifyButton');
    const message = document.getElementById('message');
    const goodJobPage = document.getElementById('goodJobPage');

    // Create spinner element
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.display = 'none';
    checkboxWrapper.appendChild(spinner);

    // Define Waldo's position (adjust based on your specific image)
    const waldoPosition = {
        x: 600, 
        y: 400, 
        radius: 20 // Adjust radius based on how precise you want the click to be
    };

    // Variable to track the current click position
    let currentClick = null;

    // STEP 1: Handle checkbox click to start the verification process
    checkboxWrapper.addEventListener('click', function() {
        // Show the loading spinner
        checkbox.style.display = 'none';
        spinner.style.display = 'block';
        
        // After a brief delay, show the Waldo verification modal
        setTimeout(function() {
            spinner.style.display = 'none';
            checkbox.style.display = 'flex';
            
            // STEP 2: Display the modal with Waldo image
            modal.style.display = 'flex';
        }, 1000);
    });

    // Allow closing the modal (resets the process)
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        tooltipContainer.style.display = 'none';
        message.style.display = 'none';
        checkbox.classList.remove('checked');
        currentClick = null;
    });

    // STEP 3: Handle clicking on the Waldo image to place the targeting box
    waldoImage.addEventListener('click', function(e) {
        // Get the precise click coordinates
        const rect = waldoImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        console.log(`Clicked at x: ${x}, y: ${y}`); // For debugging
        
        // Save the click position for verification
        currentClick = { x, y };
        
        // Show the targeting box at the clicked position
        tooltipContainer.style.display = 'block';
        tooltipContainer.style.left = `${x}px`;
        tooltipContainer.style.top = `${y}px`;
    });

    // STEP 4: Verify if the user found Waldo and proceed to success page
    verifyButton.addEventListener('click', function() {
        if (!currentClick) {
            message.textContent = 'Please click on Waldo first!';
            message.classList.add('error');
            message.classList.remove('success');
            message.style.display = 'block';
            return;
        }

        // Calculate distance from correct position
        const distance = Math.sqrt(
            Math.pow(currentClick.x - waldoPosition.x, 2) + 
            Math.pow(currentClick.y - waldoPosition.y, 2)
        );

        console.log(`Distance from Waldo: ${distance}`); // For debugging

        if (distance <= waldoPosition.radius) {
            // STEP 5: Show success message and transition to Good Job page
            message.textContent = 'Verification successful!';
            message.classList.add('success');
            message.classList.remove('error');
            message.style.display = 'block';
            
            // Mark checkbox as verified
            checkbox.classList.add('checked');

            // After a brief delay, show the Good Job page
            setTimeout(function() {
                modal.style.display = 'none'; // Hide the modal
                checkboxWrapper.style.display = 'none'; // Hide the checkbox
                goodJobPage.style.display = 'block'; // Show the Good Job page
            }, 1500);
        } else {
            // Show error message if wrong location clicked
            message.textContent = 'That\'s not Waldo! Try again.';
            message.classList.add('error');
            message.classList.remove('success');
            message.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const verifyAgainButton = document.getElementById('verifyAgainButton');

    if (verifyAgainButton) {
        verifyAgainButton.addEventListener('click', function() {
            window.location.href = 'https://c.tenor.com/PdyldmNnPJMAAAAC/tenor.gif'; // Redirects to the prank page
        });
    }
});
