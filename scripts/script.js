async function displayJobs() {
  // function to insert the data dinamically and asign the correct functions to the elements on the page
  const response = await fetch("data.json");
  const jobList = await response.json();

  for (let i = 0; i < jobList.length; i++) {
    // since the "new" and "feature badges affect the size of the elements, the code will asign different values to the CSS properties to avoid breaking the design
    let boxDecoration = jobList[i].featured ? "block" : "hidden";
    let newLogo = jobList[i].new ? "block" : "hidden";
    let gridGap = jobList[i].new ? "gap-3" : "gap-[1.1875rem]";
    let headerGap = jobList[i].new
      ? "space-y-3 lg:space-y-1.5"
      : "space-y-3.5 lg:space-y-1.5";
    let marginTop = jobList[i].new ? "mt-1" : "mt-[-0.375rem]";
    let headerMt = jobList[i].new ? "" : "mt-[0.3125rem] lg:mt-[0.25rem]";

    let langSpan = "";
    let toolsSpan = "";
    let classGroup = ""; //the classGroup variable will add classes to the job listing div, so that they can be used later with the filters

    classGroup += `${jobList[i].role} `;
    classGroup += `${jobList[i].level} `;

    for (let j = 0; j < jobList[i].languages.length; j++) {
      langSpan += `<span class="job_language bg-[#eef6f6] p-1.5 w-fit rounded-md hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]">${jobList[i].languages[j]}</span>`; //creating the spans that will function as the filter buttons
      classGroup += `${jobList[i].languages[j]} `;
    }

    if (jobList[i].tools.length !== 0) {
      for (let k = 0; k < jobList[i].tools.length; k++) {
        toolsSpan += `<span class="job_tool bg-[#eef6f6] p-1.5 w-fit rounded-md hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]">${jobList[i].tools[k]}</span>`; //creating the spans that will function as the filter buttons
        classGroup += `${jobList[i].tools[k]} `;
      }
    }

    list.innerHTML +=
      // creating the job listing divs from the json file
      `
      <div
        class="job_listing ${classGroup} grid ${gridGap} relative bg-white text-[#5ba4a4] font-bold py-8 px-6 rounded-md shadow-md lg:grid-cols-2 lg:items-center lg:px-10 lg:gap-6 lg:justify-between"
      >
        <div
          class="${boxDecoration} absolute h-full left-0 top-0 w-[0.3125rem] bg-[#5ba4a4] rounded-l-md "
        ></div>
        <!-- Item Start -->
        <div class="lg:flex lg:gap-6">
          <img
            class="absolute top-[-1.5rem] left-6 w-12 lg:relative lg:top-[unset] lg:left-[unset] lg:w-[5.5rem]"
            src="${jobList[i].logo}"
            alt="${jobList[i].company} logo"
          />
          <div class="grid ${headerGap} ${headerMt} lg:space-y-1.5">
            <div class="flex items-center gap-6 lg:gap-5">
              <span class="text-xs tracking-tight lg:text-sm">${jobList[i].company}</span>
              <div class="flex items-center gap-2">
                <span
                  class="${newLogo} bg-[#5ba4a4] text-white text-xs uppercase py-1 px-2 rounded-full tracking-tighter"
                  >New!</span
                >
                <span
                  class="${boxDecoration} bg-[#2c3a3a] text-white text-xs uppercase py-1 px-2 rounded-full tracking-tighter"
                  >Featured</span
                >
              </div>
            </div>
            <h1 class="text-[#2c3a3a] text-xs tracking-tight lg:text-lg lg:tracking-tighter hover:cursor-pointer hover:text-[#5ba4a4]">
              ${jobList[i].position}
            </h1>
            <div
              class="flex items-center gap-2 text-[#7b8e8e] font-sans font-semibold text-[0.875rem] border-b border-b-[#7b8e8e] pb-5 ${marginTop} lg:border-b-0 lg:text-base lg:gap-[1.125rem] lg:tracking-tight lg:pb-0"
            >
              <span>${jobList[i].postedAt}</span>
              <div class="h-1 w-1 rounded-full bg-[#7b8e8e]"></div>
              <span>${jobList[i].contract}</span>
              <div class="h-1 w-1 rounded-full bg-[#7b8e8e]"></div>
              <span>${jobList[i].location}</span>
            </div>
          </div>
        </div>
        <!-- Role -->
        <div
          class="relative flex items-center flex-wrap gap-x-5 gap-y-4 text-[0.8125rem] ${marginTop} mb-[-0.375rem] lg:justify-end"
        >
          <span class="job_role bg-[#eef6f6] p-1.5 w-fit rounded-md hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
            >${jobList[i].role}</span
          >
          <span class="job_level bg-[#eef6f6] p-1.5 w-fit rounded-md hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]"
            >${jobList[i].level}</span
          >
          <!-- Languages -->
          <div class="languages_tools flex gap-5"> ${langSpan} ${toolsSpan} </div>
        </div>
        <!-- Item End -->
      </div>
        `;
  }

  // creating the variables that select the listings themselves and the filter buttons
  const jobListings = document.querySelectorAll(".job_listing");
  const jobRoles = document.querySelectorAll(".job_role");
  const jobLevels = document.querySelectorAll(".job_level");
  const jobLanguages = document.querySelectorAll(".job_language");
  const jobTools = document.querySelectorAll(".job_tool");

  const arraysToCheck = [jobRoles, jobLevels, jobLanguages, jobTools]; //array containing the filter buttons, where each element is an object containing the buttons

  arraysToCheck.forEach((array) => {
    array.forEach((element) => {
      element.addEventListener("click", addFilter);
    });
  });

  function addFilter(event) { //when invoked, this function will only display the listings that have the features corresponding to the selected filter
    filtersContainer.classList.remove("hidden");
    filtersContainer.classList.add("flex");
    list.classList.remove("py-14");
    list.classList.add("py-28");
    let filterTarget = event.target.innerHTML; // for example, HTML, CSS, FrontEnd, etc...

    let filterSpan = document.createElement("div");
    filterSpan.setAttribute("class", "filter flex");
    filterSpan.innerHTML = `         
            <span class="span_filter bg-[#eef6f6] text-[#5ba4a4] font-bold pl-1.5 pr-2 py-1.5 text-sm tracking-tighter rounded-l-sm">${filterTarget}</span>
            <img class="close_filter bg-[#5ba4a4] p-[0.5625rem] rounded-r-sm hover:cursor-pointer" src="../images/icon-remove.svg" alt="X icon">`;
    filterBox.appendChild(filterSpan);

    jobListings.forEach((listing) => {
      if (
        listing.classList.contains(filterTarget) &&
        listing.style.display !== "none" /* does the listing contains a class with the same name as the filter selected and it is not hidden? If so, keep it displayed. Otherwise, hide it */
      ) {
        listing.style.display = "grid";
      } else {
        listing.style.display = "none";
      }
    });

    arraysToCheck.forEach((array) => { /* go throught each of the tags; if the tag is already present in the containing div, it removes the click event listener. This prevents the user being able to click on a tag indefinitely, adding an unlimited number of identical tags to the filter box above */
      array.forEach((element) => {
        if (element.innerHTML === filterTarget) {
          element.removeEventListener("click", addFilter);
        }
      });
    });

    const closeFilter = document.querySelectorAll(".close_filter");

    closeFilter.forEach((icon) => { // adding the function that will be invoked when clicking on the X icon on the filter box
      icon.addEventListener("click", removeFilter);
      icon.addEventListener("mouseenter", () => { // hover event on the X icon
        icon.style.backgroundColor = "black";
      });
      icon.addEventListener("mouseout", () => {
        icon.style.backgroundColor = "#5ba4a4";
      });
    });
  }

  const filterBox = document.querySelector("#filterBox");

  function removeFilter(event) {
    const closeFilter = document.querySelectorAll(".close_filter");
    const closeIconArr = Object.values(closeFilter); // converting the object closeFilter into an Array, so the function can access the index of each element later
    const buttonIndex = closeIconArr.indexOf(event.target); /* accessing the index of the X button that triggered the function, so that the correct filter div will be removed */
    let filters = document.querySelectorAll(".filter");
    let spanFilters = document.querySelectorAll(".span_filter");

    const currentFilter = spanFilters[buttonIndex].innerHTML;

    filterBox.removeChild(filters[buttonIndex]); // removing the filter tag corresponding to the X icon clicked on by the user

    arraysToCheck.forEach((array) => { /* checking each of the filters on the job listings; if it corresponds to the removed filter tag, the click event listener is reinserted, so that the user can select it again if desired */
      array.forEach((element) => {
        if (element.innerHTML === currentFilter) {
          element.addEventListener("click", addFilter);
        }
      });
    });

    filters = document.querySelectorAll(".filter");
    spanFilters = document.querySelectorAll(".span_filter"); // assigning new values to those variables, to reflect the new state of the DOM

    if (filterBox.childElementCount == 0) {
      clearAll();
    } else { // this else block will go through each of the listings, displaying only those that match all of the leftover filter tags after one of them was removed from the containing box
      let matches;
      jobListings.forEach((listing) => {
        matches = 0;
        spanFilters.forEach((filter) => {
          if (listing.classList.contains(filter.innerHTML)) {
            matches++;
          }
        });
        if (matches == spanFilters.length) {
          listing.style.display = "grid";
        } else {
          listing.style.display = "none";
        }
      });
    }
  }

  clearFilters.addEventListener("click", clearAll);

  function clearAll() { // this function will clear all the filters and display all of the listings
    const filters = document.querySelectorAll(".filter");

    filters.forEach((filter) => {
      filterBox.removeChild(filter);
    });

    jobListings.forEach((listing) => {
      listing.style.display = "grid";
    });

    filtersContainer.classList.remove("flex");
    filtersContainer.classList.add("hidden");
    list.classList.add("py-14");
    list.classList.remove("py-28");

    arraysToCheck.forEach((array) => {
      array.forEach((element) => {
        element.addEventListener("click", addFilter);
      });
    });
  }
}

displayJobs(); // invoking the async function that displays the json data
