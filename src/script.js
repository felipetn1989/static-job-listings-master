async function displayJobs() {
  const response = await fetch("https://api.npoint.io/8162247b84ab695d6a5e");
  const jobList = await response.json();

  for (let i = 0; i < jobList.length; i++) {
    let boxDecoration = jobList[i].featured ? "block" : "hidden";
    let newLogo = jobList[i].new ? "block" : "hidden";
    let gridGap = jobList[i].new ? "gap-2.5" : "gap-[1.1875rem]";
    let headerGap = jobList[i].new
      ? "space-y-3 lg:space-y-1.5"
      : "space-y-3.5 lg:space-y-2";
    let marginTop = jobList[i].new ? "mt-1" : "mt-[-0.375rem]";
    let headerMt = jobList[i].new ? "" : "mt-[0.3125rem] lg:mt-[0.25rem]";

    let devLanguages = [...jobList[i].languages];
    let langSpan = "";
    let devTools = [...jobList[i].tools];
    let toolsSpan = "";

    let classGroup = "";

    classGroup += `${jobList[i].role} `;
    classGroup += `${jobList[i].level} `;

    for (let j = 0; j < devLanguages.length; j++) {
      langSpan += `<span class="job_language bg-[#eef6f6] p-1.5 w-fit rounded-md hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]">${devLanguages[j]}</span>`;
      classGroup += `${devLanguages[j]} `;
    }

    if (devTools.length !== 0) {
      for (let k = 0; k < devTools.length; k++) {
        toolsSpan += `<span class="job_tool bg-[#eef6f6] p-1.5 w-fit rounded-md hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4]">${devTools[k]}</span>`;
        classGroup += `${devTools[k]} `;
      }
    }

    list.innerHTML += `
      <div
        class="job_listing ${classGroup} grid ${gridGap} relative bg-white text-[#5ba4a4] font-bold py-8 px-6 rounded-md shadow-md lg:flex lg:items-center lg:px-10 lg:gap-6 lg:justify-between"
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
          class="relative flex items-center flex-wrap gap-x-5 gap-y-4 text-[0.8125rem] ${marginTop} mb-[-0.375rem]"
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

  const jobListings = document.querySelectorAll(".job_listing");
  const jobRoles = document.querySelectorAll(".job_role");
  const jobLevels = document.querySelectorAll(".job_level");
  const jobLanguages = document.querySelectorAll(".job_language");
  const jobTools = document.querySelectorAll(".job_tool");

  const arraysToCheck = [jobRoles, jobLevels, jobLanguages, jobTools];

  arraysToCheck.forEach((array) => {
    array.forEach((element) => {
      element.addEventListener("click", addFilter);
    });
  });

  function addFilter(event) {
    filtersContainer.classList.remove("hidden");
    filtersContainer.classList.add("flex");
    let filterTarget = event.target.innerHTML;

    let filterSpan = document.createElement("div");
    filterSpan.setAttribute("class", "filter flex");
    filterSpan.innerHTML = `         
            <span class="span_filter bg-[#eef6f6] text-[#5ba4a4] font-bold pl-1.5 pr-2 py-1.5 text-sm tracking-tighter rounded-l-sm">${filterTarget}</span>
            <img class="close_filter bg-[#5ba4a4] p-[0.5625rem] rounded-r-sm hover:cursor-pointer" src="../images/icon-remove.svg" alt="X icon">`;
    filterBox.appendChild(filterSpan);

    jobListings.forEach((listing) => {
      if (
        listing.classList.contains(filterTarget) &&
        listing.style.display !== "none"
      ) {
        listing.style.display = window.innerWidth > 1024 ? "flex" : "grid";
      } else {
        listing.style.display = "none";
      }
    });

    arraysToCheck.forEach((array) => {
      array.forEach((element) => {
        if (element.innerHTML === filterTarget) {
          element.removeEventListener("click", addFilter);
        }
      });
    });

    const closeFilter = document.querySelectorAll(".close_filter");

    closeFilter.forEach((icon, index) => {
      icon.addEventListener("click", () => removeFilter(index));
      icon.addEventListener("mouseenter", () => {
        icon.style.backgroundColor = "black";
      });
      icon.addEventListener("mouseout", () => {
        icon.style.backgroundColor = "#5ba4a4";
      });
    });

    function removeFilter(i) {
      let filters = document.querySelectorAll(".filter");
      let currentFilter = filters[i].innerHTML;
      console.log(currentFilter);
      let spanFilters = document.querySelectorAll(".span_filter");
      filterBox.removeChild(filters[i]);
      filters = document.querySelectorAll(".filter");
      spanFilters = document.querySelectorAll(".span_filter");

      console.log(filters.length);

      arraysToCheck.forEach((array) => {
        array.forEach((element) => {
          if (element.innerHTML === currentFilter.innerHTML) {
            element.addEventListener("click", addFilter);
          }
        });
      });

      jobListings.forEach((listing) => {
        if (
          !listing.classList.contains(currentFilter.innerHTML) &&
          listing.style.display === "none"
        ) {
          listing.style.display = window.innerWidth > 1024 ? "flex" : "grid";
        }
      });

      if (filterBox.childElementCount == 0) {
        filtersContainer.classList.add("hidden");
        filtersContainer.classList.remove("flex");
        jobListings.forEach((listing) => {
          listing.style.display = window.innerWidth > 1024 ? "flex" : "grid";
        });
      } else {
        console.log(spanFilters);
        spanFilters.forEach((filter) => {
          jobListings.forEach((listing) => {
            if (listing.classList.contains(filter.innerHTML)) {
              listing.style.display =
                window.innerWidth > 1024 ? "flex" : "grid";
            } else {
              listing.style.display = "none";
            }
          });
        });
      }
    }
  }

  const filterBox = document.querySelector("#filterBox");

  clearFilters.addEventListener("click", () => {
    const filters = document.querySelectorAll(".filter");

    filters.forEach((filter) => {
      filterBox.removeChild(filter);
    });

    jobListings.forEach((listing) => {
      listing.style.display = window.innerWidth > 1024 ? "flex" : "grid";
    });

    filtersContainer.classList.remove("flex");
    filtersContainer.classList.add("hidden");

    arraysToCheck.forEach((array) => {
      array.forEach((element) => {
        element.addEventListener("click", addFilter);
      });
    });
  });
}

displayJobs();
