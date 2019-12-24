let createButton = document.querySelector(".create-element")
let hyperContainer = document.querySelector(".hyper-container")
let nameOfMonth = document.querySelector(".month")
let container = document.querySelector(".container")
let displayInfo = document.querySelector(".display-info")

let alarm = document.querySelector(".alarm")

// STILL EXPERIMENTING. PLANNING ON REFACTORING EVERYTHING WHEN
// I GET THIS TO WORK THE WAY I WANT.

let up = document.querySelector(".up")
let down = document.querySelector(".down")

let selectedDay;

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
"Thursday", "Friday", "Saturday"]

let date = new Date()

let yearMonth = {
  year: date.getFullYear(),
  month: date.getMonth(),
  upDate() {
    this.month++
    if (this.month > 11) {
      this.month = 0
      this.year++
    }

    container.innerHTML = ""
    createElement()

  },
  downDate() {
    this.month--
    if (this.month < 0) {
      this.month = 11
      this.year--
    }
    container.innerHTML = ""
    createElement()

  }
}


up.addEventListener("click", yearMonth.upDate.bind(yearMonth))
down.addEventListener("click", yearMonth.downDate.bind(yearMonth))

let month = 1;

function countDays(year, month) {
  return new Date(year, month, 0).getDate(); // 0 + number of days in a month
}

function open(e) {
  e.stopPropagation()
  this.style.display = "block"
}

function close(e) {
  e.stopPropagation()
  this.style.display = "none"

}

let notifications = {

}

let thisDay;

let activated = false;

function soundAlarm() {
  if (activated) {
    alarm.play()
  } else {
    notifications[thisDay].shift()
  }
}

function selectElement() {
  //this.style.background = "red"
}

let savedEvents = {

}

function createDisplay(eventName, description, time) {
  let div = document.createElement("div")
  div.className = "display-thing"
  let span = document.createElement("span")
  let describe = document.createElement("span")
  let anotherSpan = document.createElement("span")

  span.classList.add("span")
  describe.classList.add("describe")
  anotherSpan.classList.add("anotherSpan")

  span.textContent = eventName
  describe.textContent = description
  anotherSpan.textContent = time

  div.appendChild(span)
  div.appendChild(describe)
  div.appendChild(anotherSpan)
  div.style.background = ""

  return div
}

function showEvents() {}

function selectDay(div) {
  for (let element of div.children) {
    if (element.classList.contains("pepp")) {}
  }
}

let currentDivId;

function createElement() {

  let days = 0;
  // SEARCH HERE
  let innerYear = yearMonth.year
  let innerMonth = yearMonth.month

  let eachDay = document.createElement("div")
  nameOfMonth.textContent = `${monthNames[yearMonth["month"]]} ${yearMonth["year"]}` // THIS HERE!
  hyperContainer.appendChild(eachDay)

  let currentDay = Number(date.toString().split(" ")[2]) - 1

  let firstDay = new Date(innerYear, innerMonth, 1)

  let specifiedDate = countDays(innerYear, innerMonth + 1)

  while (days < specifiedDate || days < 42) {


    /* DIV ELEMENTS */
    let div = document.createElement("div")
    div.classList.add("singleDay")

    div.addEventListener("click", selectElement)

    /* LEGEND ELEMENTS */
    let legend = document.createElement("div")
    legend.classList.add("legend")
    legend.textContent = days + 1

    /* CREATE ELEMENT WITH BUTTON */
    div.setAttribute("data-key", days + 1)
    div.addEventListener("click", function() {
      selectedDay = this
    })

    if (days == currentDay) {
      div.style.background = "orange"
      thisDay = days + 1
    } else if (days < firstDay.getDay()) {
      div.style.background = "#FFF"
      legend.style.background = "#FFF"
    } else if (days < currentDay) {
      div.style.opacity = "0.5"
      div.style["pointer-events"] = "none"
    } else if (days >= specifiedDate) {
      div.style.background = "#FFF"

    }

    let ew = days - firstDay.getDay() + 1
    let daysOfLastMonth = countDays(innerYear, innerMonth)
    let daysHere = days

    if ((days >= firstDay.getDay() && days < specifiedDate) || ew <= specifiedDate && ew > 0) {
      div.style.background = "#F7B658"
      legend.textContent = ew
      div.setAttribute("data-enabled", true)
    } else if (ew <= 0) {

      legend.textContent = daysOfLastMonth - firstDay.getDay() + days + 1
      legend.style.background = "black"
      div.addEventListener("click", yearMonth.downDate.bind(yearMonth))
    } else if (ew >= specifiedDate) {
      legend.textContent = days - firstDay.getDay() - specifiedDate + 1
      legend.style.background = "#FFF"
      legend.style.background = "black"
      div.addEventListener("click", yearMonth.upDate.bind(yearMonth))
    }


    if (days == currentDay) {
      div.style.background = "orange"
      thisDay = days + 1
    }

    div.appendChild(legend)

    /* ANOTHERDIV ELEMENTS */
    let anotherDiv = document.createElement("div")
    anotherDiv.classList.add("day")
    anotherDiv.innerHTML =
      `
    <div class="form">
      <label for="event-title"></label>
      <input class="title" type="text" placeholder="Title" name="event-title" required>

      <label for="description"></label>
      <input class="description" type="text" placeholder="Description" name="description">

      <label for="color-code">Color code: <input type="color" name="color-code" class="color-code" value="#ff0000"></label>
      
      <label for="time-event">Time:</label>
      <input class="time" type="time" id="time-event" name="time-event" min="00:00" max="23:59">
      <button class="add">Add</button>
    </div>
    `
    anotherDiv.addEventListener("click", function(e) {
      e.stopPropagation()
    })

    /* B ELEMENTS */


    /* TEXT CONTAINER ELEMENTS */
    let cont = document.createElement("div")
    cont.classList.add("cont")


    div.appendChild(cont)


    let button = document.createElement("button")
    button.className = "close-window"
    button.textContent = "close"

    createButton.addEventListener("click", function(e) {
      e.stopPropagation()
    })

    //div.addEventListener("click", open.bind(anotherDiv))


    button.addEventListener("click", close.bind(anotherDiv))

    anotherDiv.appendChild(button)
    div.appendChild(anotherDiv)

    createButton.addEventListener("click", function(e) {
      let aaa = selectedDay.querySelector(".day") //anotherDiv

      open.bind(aaa)(e)
    })


    let addThis = anotherDiv.querySelector(".add")

    div.addEventListener("click", function() {
      selectDay(div)
    })

    let cactus;

    addThis.addEventListener("click", close.bind(anotherDiv))

    addThis.addEventListener("click", function() {

      let event = document.createElement("div")
      event.className = "pepp"
      let eventTitle = document.createElement("span")
      eventTitle.classList.add("test1")
      let editEvent = anotherDiv.cloneNode(true)
      editEvent.style.display = "none"
      event.classList.add("event")

      let colorCode = div.querySelector(".color-code")
      event.style.background = colorCode.value

      let input = editEvent.querySelector(".title")
      let outerInput = anotherDiv.querySelector(".title")


      /* DESCRIPTION */
      let description = editEvent.querySelector(".description")
      let outerDescription = anotherDiv.querySelector(".description")

      /* ----------- */
      let temporal = editEvent.querySelector(".close-window")
      event.addEventListener("click", open.bind(editEvent))
      temporal.addEventListener("click", close.bind(editEvent))

      /* TIME */

      let myTime = anotherDiv.querySelector(".time")


      editEvent.addEventListener("click", function(event) {
        event.stopPropagation()
      })

      eventTitle.textContent = input.value
      event.appendChild(eventTitle)
      event.appendChild(editEvent)

      event.addEventListener("click", function(event) {
        event.stopPropagation()
      })

      let innerAddButton = editEvent.querySelector(".add")


      innerAddButton.addEventListener("click", function() {
        eventTitle.textContent = input.value
      })


      div.appendChild(event)

      /* SAVED EVENTS */

      if (!savedEvents[yearMonth.year]) {
        savedEvents[yearMonth.year] = {}
      }

      if (!savedEvents[yearMonth.year][yearMonth.month]) {
        savedEvents[yearMonth.year][yearMonth.month] = {}
      }

      if (!savedEvents[yearMonth.year][yearMonth.month][legend.textContent]) {
        savedEvents[yearMonth.year][yearMonth.month][legend.textContent] = {}
      }

      if (!savedEvents[yearMonth.year][yearMonth.month][legend.textContent][input.value]) {
        savedEvents[yearMonth.year][yearMonth.month][legend.textContent][input.value] = event
      }
      

      console.log(savedEvents)



      /* */

      if (!notifications[legend.textContent]) {

        notifications[legend.textContent] = []
        notifications[legend.textContent].push(myTime.value)
      } else {

        notifications[legend.textContent].push(myTime.value)
      }

      outerInput.value = ""
      outerDescription.value = ""
      colorCode.value = ""

    })


    container.appendChild(div)
    days++

    /***************/
    div.addEventListener("click", function() {

      currentDivId = legend.textContent
      displayInfo.innerHTML = ""
      for (let eve of div.children) {
        if (eve.classList.contains("pepp")) {
          let one = eve.querySelector(".test1")
          let two = eve.querySelector(".time")
          let three = eve.querySelector(".description")
          displayInfo.append(createDisplay(one.textContent, three.value, two.value))
        }
      }
    }.bind(div))

    addThis.addEventListener("click", function() {
      currentDivId = legend.textContent
      displayInfo.innerHTML = ""
      for (let eve of div.children) {
        if (eve.classList.contains("pepp")) {
          let one = eve.querySelector(".test1")
          let two = eve.querySelector(".time")
          let three = eve.querySelector(".description")
          displayInfo.append(createDisplay(one.textContent, three.value, two.value))
        }
      }
    }.bind(div))

    // NOW HERE
    //let associatedDisplay = 
    //console.log(legend.textContent)
    //console.log(notifications[2019])
    //div.appendChild(cactus)

    //console.log(savedEvents[innerYear])
    if (savedEvents[innerYear]) {
      
      if (savedEvents[innerYear][innerMonth]) {
        //console.log(savedEvents[innerYear][innerMonth])
        for (let child of container.children) {
          let leg = child.querySelector(".legend")
          
          if (savedEvents[innerYear][innerMonth][leg.textContent]) {
            /*
            console.log(child)
            console.log(savedEvents[innerYear][innerMonth][leg.textContent])
            child.appendChild(savedEvents[innerYear][innerMonth][leg.textContent])
            */

            for (let ev in savedEvents[innerYear][innerMonth][leg.textContent]) {
              //console.log(ev)
              child.appendChild(savedEvents[innerYear][innerMonth][leg.textContent][ev])
            }

          }
        }
      }
    }


    /******************/


  }

  /******* END OF WHILE LOOP - HER*/
  for (let child of container.children) {
    child.addEventListener("click", function(e) {

      if (this == selectedDay) {
        for (let thing of container.children) {
          if (thing.dataset.enabled) {
            thing.style.background = ""
          }
        }

        this.style.background = "blue"


      }
    })
  }


}

createElement()

function compare() {

  let currentDate = new Date()
  let currentHours = currentDate.getHours().toString().length < 2 ? `0${currentDate.getHours()}` : currentDate.getHours()
  let currentMinutes = currentDate.getMinutes().toString().length < 2 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()

  let seconds = currentDate.getSeconds()

  // IF INCLUDES instead of hours == notifications

  if (`${currentHours}:${currentMinutes}` == notifications[thisDay][0]) {

    if (seconds < 59) {
      activated = true
      soundAlarm()
    } else {
      activated = false
      soundAlarm()
    }


  }

}

//setInterval(compare, 1000)

function addEvent(element) {

  this.textContent = element
}