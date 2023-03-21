/* https://api.npoint.io/8162247b84ab695d6a5e */

async function displayJobs() {
  const response = await fetch("https://api.npoint.io/8162247b84ab695d6a5e");
  const jobList = await response.json();

  for (let i = 0; i < jobList.length; i++) {
    let boxDecoration = jobList[i].featured ? "block" : "hidden";
    let newLogo = jobList[i].new ? "block" : "hidden";
    let gridGap = jobList[i].new ? "gap-2.5" : "gap-[1.1875rem]";
    let headerGap = jobList[i].new ? "space-y-3 lg:space-y-1.5" : "space-y-3.5 lg:space-y-2";
    let marginTop = jobList[i].new ? "mt-1" : "mt-[-0.375rem]";
    let headerMt = jobList[i].new ? "" : "mt-[0.3125rem] lg:mt-[0.25rem]";

    let devLanguages = [...jobList[i].languages];
    let langSpan = "";
    let devTools = [...jobList[i].tools];
    let toolsSpan = "";

    console.log(devTools);

    for (let j = 0; j < devLanguages.length; j++) {
      langSpan += `<span class="bg-[#eef6f6] p-1.5 w-fit rounded-md">${devLanguages[j]}</span>`;
    }

    if (devTools.length !== 0) {
      for (let k = 0; k < devTools.length; k++) {
        toolsSpan += `<span class="bg-[#eef6f6] p-1.5 w-fit rounded-md">${devTools[k]}</span>`;
      }
    }

    console.log(toolsSpan);

    list.innerHTML += `
      <div
        class="grid ${gridGap} relative bg-white text-[#5ba4a4] font-bold py-8 px-6 rounded-md shadow-md lg:flex lg:items-center lg:px-10 lg:gap-6"
      >
        <div
          class="${boxDecoration} absolute h-full left-0 top-0 w-[0.3125rem] bg-[#5ba4a4] rounded-l-md "
        ></div>
        <!-- Item Start -->
        <img
          class="absolute top-[-1.5rem] left-6 w-12 lg:relative lg:top-[unset] lg:left-[unset] lg:w-[5.5rem]"
          src="${jobList[i].logo}"
          alt="${jobList[i].company} logo"
        />
        <div class="grid ${headerGap} ${headerMt} lg:self-start lg:space-y-1.5">
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
          <h1 class="text-[#2c3a3a] text-xs tracking-tight lg:text-lg lg:tracking-tighter">
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
        <!-- Role -->
        <div
          class="relative flex flex-wrap gap-x-5 gap-y-4 text-[0.8125rem] ${marginTop} mb-[-0.375rem]"
        >
          <span class="bg-[#eef6f6] p-1.5 w-fit rounded-md"
            >${jobList[i].role}</span
          >
          <!--  class="bg-[#eef6f6]"Level -->
          <span class="bg-[#eef6f6] p-1.5 w-fit rounded-md"
            >${jobList[i].level}</span
          >
          <!--  class="bg-[#eef6f6]"Languages -->
          ${langSpan} ${toolsSpan}
        </div>
        <!-- Item End -->
      </div>
        `;
  }
}

displayJobs();
