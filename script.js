// const popupButton = document.getElementById('popupButton');
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  // function closeForm() {
  //   document.getElementById("myForm").style.display = "none";
  // }



  function validateForm() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    if (name === '' || number === '' || from === '' || to === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return false;
    }

    showsucess();
    return true;
  }

  function showsucess() {
    Swal.fire({
      icon: 'success',
      title: 'Booking Successful!',
      text: 'Thank you for booking with us.',
    });
  }


  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


/*getall*/
function fetchBookings() {
  $.ajax({
    url: 'http://localhost:3000/getall',
    type: 'GET',
    success: function(response) {
      const bookingList = document.getElementById('bookingList');
      bookingList.innerHTML = ''; // Clear previous data

      if (response && response.data && response.data.length > 0) {
        const bookings = response.data;
        const table = document.createElement('table');
        table.setAttribute('border', '1');

        // Create table header
        const headerRow = table.insertRow();
        for (const field in bookings[0]) {
          const headerCell = document.createElement('th');
          headerCell.textContent = field.charAt(0).toUpperCase() + field.slice(1);
          headerRow.appendChild(headerCell);
        }

        // Create table rows and cells
        bookings.forEach((booking) => {
          const row = table.insertRow();
          for (const field in booking) {
            const cell = row.insertCell();
            cell.textContent = booking[field];
          }
        });

        bookingList.appendChild(table);
      } else {
        bookingList.textContent = 'No bookings found.';
      }
    },
    error: function(error) {
      console.error('Error fetching data:', error);
      const bookingList = document.getElementById('bookingList');
      bookingList.textContent = 'Error fetching data. Please try again later.';
    }
  });
}
