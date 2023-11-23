$(document).ready(function () {

  // Function to create aand append time block
  function appendTimeBlock(hour) {
    const timeBlock = $('#time-block-template').clone().contents();
    timeBlock.removeAttr('id').removeAttr('style');
    timeBlock.find('.hour').text(formatHour(hour));
    timeBlock.attr('id', `hour-${hour}`);
    timeBlock.find('.description').attr('data-hour', hour);
    $('.container-fluid').append(timeBlock);
    console.log(timeBlock);
  }

  // Function to format the hour for display
  function formatHour(hour) {
    return hour <= 12 ? `${hour}AM` : `${hour - 12}PM`;
  }

  // Load initial time blocks
  const startHour = 1;
  const endHour = 24;
  for (let hour = startHour; hour <= endHour; hour++) {
    appendTimeBlock(hour);
    console.log(hour);
  }

$('.container-fluid').on('scroll', function() {
  const maxScroll = this.scrollHeight - this.clientHeight;
  const currentScroll = this.scrollTop;
  const scrollExtension = 100; // The additional scroll amount before resetting

  if (currentScroll >= maxScroll - scrollExtension) {
    // Delay resetting the scroll to top
    setTimeout(() => {
      $(this).scrollTop(0);
    }, 2500); // Delay in milliseconds
  }
});
function createInfiniteScroll() {
  var container = $('.container-fluid');
  var originalContent = container.html();
  container.append(originalContent); // Duplicate the content

  container.on('scroll', function() {
    var scrollHeight = this.scrollHeight / 2; // Since content is duplicated
    var scrollTop = $(this).scrollTop();

    if (scrollTop >= scrollHeight) {
      $(this).scrollTop(1); // Reset to the start of duplicated content
    }
  });
}

createInfiniteScroll();



  function updateBlockClasses() {
  var currentHour = dayjs().hour(); // Using dayjs to get the current hour in 24-hour format
  console.log(currentHour);

  // Loop over each time block
  $('.time-block:not(#hour-template)').each(function () {
    console.log("Processing block with ID:", $(this).attr('id'));

    const currentHour = dayjs().hour(); // Correctly getting the current hour

 
    var blockId = $(this).attr('id');
    console.log("Block ID: ", blockId);

    var blockHour = parseInt(blockId.split('-')[1]);
    console.log("Parsed Block Hour: ", blockHour);

    // Remove any existing time-related classes
    $(this).removeClass('past present future');

    // Compare block hour with current hour and update classes accordingly
    if (blockHour < currentHour) {
      $(this).addClass('past'); // Add 'past' class for hours before the current hour
    } else if (blockHour === currentHour) {
      $(this).addClass('present'); // Add 'present' class for the current hour
    } else {
      $(this).addClass('future'); // Add 'future' class for hours after the current hour
    }
    console.log(blockHour);
  });
  
}

function scrollToCurrentHour() {
  var currentHour = dayjs().hour();
  var currentBlock = $('#hour-' + currentHour);
  var container = $('.container-fluid');

  if (currentBlock.length) {
    var blockPosition = currentBlock.position().top;
    var containerHeight = container.height();
    container.scrollTop(blockPosition - containerHeight / 2);
  }
}

// Call this function after blocks have been created
scrollToCurrentHour();



// Initial call to update the classes according to the current time
updateBlockClasses();


  // Load saved tasks
  $('[data-hour]').each(function () {
    var hour = $(this).data('hour');
    var savedTask = localStorage.getItem(`task-${hour}`);
    if (savedTask) {
      $(this).val(savedTask);
    }
  });

  // Save task
  $(".saveBtn").on("click", function () {
    var description = $(this).siblings('.description');
    var hour = description.data('hour');
    var userInput = description.val();
    localStorage.setItem(`task-${hour}`, userInput);
  });

  // Highlighting current hour
  updateBlockClasses(); // Call this function to update classes initially

  // Display current date
  var currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Update classes every minute
  setInterval(updateBlockClasses, 60000); // 60,000 milliseconds = 1 minute
});
$(document).ready(function() {
  var container = $('.container-fluid');
  var rows = container.find('.row');
  var maxRotation = 10;

  function updateRowRotation() {
    var scrollPercentage = container.scrollTop() / (container.prop('scrollHeight') - container.height());
    var totalDegrees = maxRotation * 2; // Total degrees to rotate from top to bottom
    

    rows.each(function(index) {
      var rowRotation = totalDegrees * scrollPercentage - maxRotation; // Calculate rotation for each row
      var transformStyle = 'rotateX(' + rowRotation + 'deg)';
      $(this).css('transform', transformStyle);
    });
  }

  // Update rotation on scroll
  container.on('scroll', updateRowRotation);

  // Initial call to set rotation
  updateRowRotation();
});

// Create a function to update the appearance of the rows creating parallex effect (for fun)

$(document).ready(function() {
  var container = $('.container-fluid');
  var rows = container.find('.row');
  var maxRotation = 8; // Slightly reduced for a smoother effect
  var maxScale = 1; // Scale at the center
  var minScale = 0.85; // Slightly reduced scale at the top and bottom
  var maxMargin = 10; // Reduced maximum margin

  function updateRowAppearance() {
    var containerHeight = container.height();

    rows.each(function() {
      var rowTop = $(this).position().top;
      var rowCenter = rowTop + $(this).outerHeight() / 2;
      var normalizedPosition = (rowCenter / containerHeight) - 0.5;

      var rotation = maxRotation * normalizedPosition * -2;
      var scale = maxScale - Math.abs(normalizedPosition) * (maxScale - minScale);
      var margin = Math.min(maxMargin, maxMargin * Math.abs(normalizedPosition));

      var transformStyle = 'rotateX(' + rotation + 'deg) scale(' + scale + ')';
      $(this).css({
        'transform': transformStyle,
        'margin-top': margin + 'px',
        'margin-bottom': margin + 'px'
      });
    });
  }

  container.on('scroll resize', updateRowAppearance);
  updateRowAppearance();
});

