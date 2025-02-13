const countriesAPI = "https://restcountries.com/v2/all";

const startBtn = document.querySelector(".starting-btn");
const searchBtn = document.querySelector(".search");
let activefilter = null;

const fetchCountries = async () => {
  try {
    const response = await fetch(countriesAPI);
    const countries = await response.json();

    const startWithBtn = () => {
      const searchInput = document
        .querySelector("input")
        .value.toLowerCase();
      const filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().startsWith(searchInput);
      });
      countryResult(filteredCountries);

      const countLetters = () => {
        const letterCountDisplay = document.querySelector(".display-total");
        const searchInput = document.querySelector("input").value;
        const letterCount = countries.reduce((acc, country) => {
          const firstLetter = country.name[0];
          acc[firstLetter] = (acc[firstLetter] || 0) + 1;
          return acc;
        }, {});

        Object.entries(letterCount).map(([letter, count]) => {
          if (searchInput === letter.toLowerCase()) {
            letterCountDisplay.textContent = `Eniola said countries that start with ${letter} are ${count}`;
            letterCountDisplay.style.color = "#fff";
          }
        });
      };
      countLetters();
    };

    const searchAnyBtn = () => {
      const searchInput = document
        .querySelector("input")
        .value.toLowerCase();
      const filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().includes(searchInput);
      });

      countryResult(filteredCountries);
    };

    const countryResult = (filteredCountries) => {
      const resultContainer = document.querySelector(".resultContainer");
      resultContainer.innerHTML = "";
      if (filteredCountries.length > 0) {
        for (const country of filteredCountries) {
          const countryBox = document.createElement("div");
          countryBox.className = "countryBox";
          countryBox.textContent = country.name;
          resultContainer.appendChild(countryBox);
        }
      } else {
        resultContainer.innerHTML = "";
      }
    };

    startBtn.addEventListener("click", () => {
      //   const resultContainer = document.querySelector(".resultContainer");
      const letterCountDisplay = document.querySelector(".display-total");
      letterCountDisplay.textContent = "";
      // resultContainer.innerHTML = "";
      activefilter = startWithBtn;
      document.querySelector("input").value = "";
      countryResult([]);
    });

    searchBtn.addEventListener("click", () => {
      //   const resultContainer = document.querySelector(".resultContainer");
      const letterCountDisplay = document.querySelector(".display-total");
      letterCountDisplay.textContent = "";
      //   resultContainer.innerHTML = "";
      activefilter = searchAnyBtn;
      document.querySelector("input").value = "";
      countryResult([]);
    });

    document.querySelector("input").addEventListener("input", () => {
      const letterCountDisplay = document.querySelector(".display-total");
      const searchInput = document.querySelector("input").value;
      if (searchInput === "") {
        letterCountDisplay.textContent = "";
        countryResult([]);
      } else if (activefilter) {
        activefilter();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

fetchCountries();