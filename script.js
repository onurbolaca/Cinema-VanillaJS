const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    //count.innerText = +count.innerText + 1;
    const selectedSeats 
    = document.querySelectorAll('.row .seat.selected');
    
    count.innerText = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

function updateTotalPrice(){
    total.innerText = +count.innerText * movieSelect.value;
}


document.addEventListener('DOMContentLoaded', function(){

  movieSelectedIndex = JSON.parse(localStorage.getItem('selectedMovie'));

  if(movieSelectedIndex !== null){
      movieSelect.selectedIndex = movieSelectedIndex;
  }

   const savedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

   if(savedSelectedSeats !== null && savedSelectedSeats.length > 0){

    seats.forEach(function(seat, index){
        if(savedSelectedSeats.indexOf(index) > -1){
            seat.classList.add("selected")
        }
    });

   }

   updateSelectedCount();
   updateTotalPrice();
});

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat')
        && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
        updateTotalPrice();
    }
})

movieSelect.addEventListener('change', function(e){
    //updateTotalPrice();
    total.innerText = +count.innerText * e.target.value;

    localStorage.setItem('selectedMovie', JSON.stringify(e.target.selectedIndex));
  
})

