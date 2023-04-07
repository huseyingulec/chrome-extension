let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) { // checks the localStorage and renders them into the page
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ // ask the infos of active and current windows 
        myLeads.push(tabs[0].url) // adds the url of current tab
        localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // adds the url to the localStorage
        render(myLeads)
    })
})

function render(leads) { // renders item as a list and anchor tag
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <ul>
                <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                </li>
            </ul>
        `
    }
    ulEl.innerHTML = listItems
}


inputBtn.addEventListener("click", function() { // adds inputs to the array
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})



let clicks = 0; 

deleteBtn.addEventListener("click", function() { // counts the clicks and execute different functions
  clicks++;
  setTimeout(function() {
    if (clicks === 1) {
      
      myLeads = leadsFromLocalStorage // gets the items from the myLeads localStorage and turns them as an array
      myLeads.pop() // deletes the latest element from the array
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      render(myLeads)


    } else if (clicks === 2 && window.confirm("Do you really want to delete all?")) { // shows a confirm windows to delete all leads
      
      localStorage.clear()
      myLeads = []
      render(myLeads)
    }
    clicks = 0;
  }, 300); // Delay between clicks
});
