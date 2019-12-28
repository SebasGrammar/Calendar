let createButton = document.querySelector(".create-element")
let hyperContainer = document.querySelector(".hyper-container")
let nameOfMonth = document.querySelector(".month")
let container = document.querySelector(".container")
let displayInfo = document.querySelector(".display-info")

let alarm = document.querySelector(".alarm")

let up = document.querySelector(".up")
let down = document.querySelector(".down")

let selectedDay;

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let date = new Date()

let yearMonth = {
  year: date.getFullYear(),
  month: date.getMonth(),
  status: "",
  test() {

    this.status == "up" ? this.month++ : this.month--

    if (this.month > 11) {
      this.month = 0
      this.year++
    } else if (this.month < 0) {
      this.month = 11
      this.year--
    }

    container.innerHTML = ""
    createElement()

  }
}

up.addEventListener("click", function() {
  yearMonth.status = "up"
  yearMonth.test.call(yearMonth)
  //yearMonth.test.bind(yearMonth)()
})

down.addEventListener("click", function() {
  yearMonth.status = "down"
  yearMonth.test.call(yearMonth)
  //yearMonth.test.bind(yearMonth)()
})

let month = 1;

function countDays(year, month) {
  return new Date(year, month, 0).getDate();
}

function open(e) {
  this.style.display = "block"
}

function close(e) {
  this.style.display = "none"
}

let notifications = {

}

let thisDay;

let activated = false;

function doThis(container) {
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

function soundAlarm() {
  if (activated) {
    alarm.play()
  } else {
    notifications[thisDay].shift()
  }
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

let currentDivId;

/* ANOTHER TEST HERE */

function linkEventListener(element, div) {
  currentDivId = element.textContent
  displayInfo.innerHTML = ""
  for (let eve of div.children) {
    if (eve.classList.contains("pepp")) {
      let one = eve.querySelector(".test1")
      let two = eve.querySelector(".time")
      let three = eve.querySelector(".description")
      displayInfo.append(createDisplay(one.textContent, three.value, two.value))
    }
  }
}

/**/

function createAnotherDiv() {
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
  return anotherDiv
}

/****/

function setEverything() {

  let innerYear = yearMonth.year
  let innerMonth = yearMonth.month

  return {
    innerYear,
    innerMonth,
    currentDay: Number(date.toString().split(" ")[2]) - 1,
    firstDay: new Date(innerYear, innerMonth, 1),
    specifiedDate: countDays(innerYear, innerMonth + 1)

  }

}

function resetEverything(...args) {
  //outerInput.value = ""
  //outerDescription.value = ""
  //colorCode.value = ""

  args.forEach(element => element.value = "")
}

function createObject(key, value = {}) {
  return {
    [key]: value
  }
}

function createElement() {

  let days = 0;


  let allHere = setEverything()

  nameOfMonth.textContent = `${monthNames[yearMonth["month"]]} ${yearMonth["year"]}` // THIS HERE!

  while (days < allHere.specifiedDate || days < 42) {


    /* DIV ELEMENTS */
    let div = document.createElement("div")
    div.classList.add("singleDay")

    /* LEGEND ELEMENTS */
    let legend = document.createElement("div")
    legend.classList.add("legend")
    legend.textContent = days + 1


    /* CREATE ELEMENT WITH BUTTON */
    div.setAttribute("data-key", days + 1)
    div.addEventListener("click", function() {
      selectedDay = this
    })

    if (days == allHere.currentDay) {
      div.style.background = "orange"
      thisDay = days + 1
    } else if (days < allHere.firstDay.getDay()) {
      div.style.background = "#FFF"
      legend.style.background = "#FFF"
    } else if (days < allHere.currentDay) {
      div.style.opacity = "0.5"
      div.style["pointer-events"] = "none"
    } else if (days >= allHere.specifiedDate) {
      div.style.background = "#FFF"

    }

    let ew = days - allHere.firstDay.getDay() + 1
    let daysOfLastMonth = countDays(allHere.innerYear, allHere.innerMonth)
    let daysHere = days

    if ((days >= allHere.firstDay.getDay() && days < allHere.specifiedDate) || ew <= allHere.specifiedDate && ew > 0) {
      div.style.background = "#F7B658"
      legend.textContent = ew
      div.setAttribute("data-enabled", true)
    } else if (ew <= 0) {

      legend.textContent = daysOfLastMonth - allHere.firstDay.getDay() + days + 1
      div.addEventListener("click", yearMonth.test.bind(yearMonth))
    } else if (ew >= allHere.specifiedDate) {
      legend.textContent = days - allHere.firstDay.getDay() - allHere.specifiedDate + 1
      legend.style.background = "#FFF"
      div.addEventListener("click", yearMonth.test.bind(yearMonth))
    }

    if (days == allHere.currentDay) {
      div.style.background = "orange"
      thisDay = days + 1
    }

    div.appendChild(legend)

    /* ANOTHERDIV ELEMENTS */
    let anotherDiv = createAnotherDiv()
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

    button.addEventListener("click", close.bind(anotherDiv))

    anotherDiv.appendChild(button)
    div.appendChild(anotherDiv)

    createButton.addEventListener("click", function(e) {
      let aaa = selectedDay.querySelector(".day") //anotherDiv

      open.bind(aaa)(e)
    })


    let addThis = anotherDiv.querySelector(".add")

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

      let dayNumber = legend.textContent
      let userInput = input.value

      let keys = [yearMonth.year, yearMonth.month, dayNumber, userInput]
      let lastKey = keys[keys.length - 1]

      keys.reduce((object, key) => {
        console.log(object, key)
        return key !== lastKey ? object[key] = {} : object[key] = event
      }, savedEvents)
      console.log(savedEvents)


      if (notifications[dayNumber]) {
        notifications[dayNumber].push(myTime.value)
      } else {
        notifications[dayNumber] = []
        notifications[dayNumber].push(myTime.value)
      }

      resetEverything(outerInput, outerDescription, colorCode)

    })


    container.appendChild(div)
    days++

    /***************/

    div.addEventListener("click", function() {
      linkEventListener.bind(div)(legend, div)
    })

    addThis.addEventListener("click", function() {
      linkEventListener.bind(div)(legend, div)
    })

    if (savedEvents[allHere.innerYear]) {

      if (savedEvents[allHere.innerYear][allHere.innerMonth]) {
        for (let child of container.children) {
          let leg = child.querySelector(".legend")

          if (savedEvents[allHere.innerYear][allHere.innerMonth][leg.textContent]) {

            for (let ev in savedEvents[allHere.innerYear][allHere.innerMonth][leg.textContent]) {
              child.appendChild(savedEvents[allHere.innerYear][allHere.innerMonth][leg.textContent][ev])
            }

          }
        }
      }
    }


    /******************/


  }

  doThis(container)

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

setInterval(compare, 1000)

function addEvent(element) {

  this.textContent = element
}