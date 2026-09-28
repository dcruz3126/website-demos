document.addEventListener("DOMContentLoaded", () => {

  /*
   * Mobile navigation
   */

  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navigation = document.querySelector('.site-nav');

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      navigation.classList.toggle("is-open");

      document.body.classList.toggle(
        "menu-open",
        !isOpen
      );

    });

  }


  /*
   * Scroll header effect
   */

  const header = document.querySelector(".site-header");

  if (header) {

    const updateHeader = () => {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    };

    updateHeader();

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

  }


  /*
   * Reveal elements as they enter the viewport
   */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /*
   * FAQ icon rotation
   */

  document
    .querySelectorAll(".faq-item")
    .forEach(item => {

      item.addEventListener("toggle", () => {

        item.classList.toggle(
          "is-open",
          item.open
        );

      });

    });


  /*
   * Button click feedback
   */

  document
    .querySelectorAll(".button")
    .forEach(button => {

      button.addEventListener("click", () => {

        button.classList.add("clicked");

        setTimeout(() => {
          button.classList.remove("clicked");
        }, 300);

      });

    });


  /*
   * Contact form
   *
   * The actual Apps Script endpoint will be added later.
   */

  const form =
    document.querySelector("#contact-form");

  if (form) {

    form.addEventListener("submit", event => {

      /*
       * Placeholder for now.
       *
       * We'll replace this with the Apps Script
       * submission logic once your endpoint exists.
       */

      const honeypot =
        document.querySelector("#website");

      if (honeypot && honeypot.value !== "") {

        event.preventDefault();

        return;

      }

    });

  }


  /*
   * Package URL
   *
   * Shared by Get Started, Client Information,
   * and Payment pages.
   */

  const params =
    new URLSearchParams(window.location.search);

  const selectedPackage =
    params.get("package");


  /**
   * GET STARTED PAGE
   */

  const packageOptions =
    document.querySelectorAll(".package-option");

  packageOptions.forEach(option => {

    option.classList.toggle(
      "is-hidden",
      option.dataset.package !== selectedPackage
    );

  });


  if (!selectedPackage) {

    const firstPackage =
      document.querySelector(".package-option");

    packageOptions.forEach(option => {
      option.classList.add("is-hidden");
    });

    if (firstPackage) {
      firstPackage.classList.remove("is-hidden");
    }

  }


  document
    .querySelectorAll(".continue-button")
    .forEach(button => {

      button.addEventListener("click", function(event) {

        const option =
          this.closest(".package-option");

        const checkbox =
          option.querySelector(".package-acknowledge");

        if (!checkbox.checked) {

          event.preventDefault();

          alert(
            "Please acknowledge the information above before continuing."
          );

        }

      });

    });


  /**
   * CLIENT INFORMATION PAGE
   */

  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwHZqXTfoxSQZcn1wPnZxCi6LtZ4R2S3-76rsHOsPms5WV9Ifa1_7o9_VXewf_002tB/exec";

  const packageId =
    selectedPackage;


  const packages = {

    foundation: "Foundation",
    framework: "Framework",
    buildout: "Buildout"

  };


  const packageName =
    packages[packageId];


  const packageNameElement =
    document.getElementById("packageName");


  if (packageNameElement) {

    if (!packageName) {

      packageNameElement.textContent =
        "No package selected";

    } else {

      packageNameElement.textContent =
        packageName;

    }

  }


  const clientInformationForm =
    document.getElementById("clientInformationForm");

  const submitButton =
    document.getElementById("submitButton");

  const formError =
    document.getElementById("formError");


  if (clientInformationForm) {

    clientInformationForm.addEventListener(
      "submit",
      async function(event) {

        event.preventDefault();


        // if (!packageName) {

        //   formError.textContent =
        //     "Please return to the package page and select a package.";

        //   formError.hidden = false;

        //   return;

        // }


        submitButton.disabled = true;
        submitButton.textContent = "Processing...";

        formError.hidden = true;


        const formData =
          new FormData(clientInformationForm);


       const data = {
        name: 'getstarted',
        package: packageId,
        package_name: packageName,
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        street: formData.get("street"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        website: formData.get("website")
      };

        try {

          await fetch(APPS_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
              "Content-Type": "text/plain"
            },

            body: JSON.stringify(data)

          });


        window.location.href =
          "../payment/?package=" + encodeURIComponent(packageId);

        } catch (error) {

          formError.textContent =
            "Something went wrong. Please try again.";

          formError.hidden = false;

          submitButton.disabled = false;

          submitButton.textContent =
            "Continue to Payment";

        }

      }

    );

  }


  /**
   * PAYMENT PAGE
   */

  const paymentPackageOptions =
    document.querySelectorAll(".payment-package");


  paymentPackageOptions.forEach(option => {

    option.classList.toggle(
      "is-hidden",
      option.dataset.package !== selectedPackage
    );

  });


  if (!selectedPackage) {

    paymentPackageOptions.forEach(option => {
      option.classList.add("is-hidden");
    });

    const firstPackage =
      document.querySelector(".payment-package");

    if (firstPackage) {
      firstPackage.classList.remove("is-hidden");
    }

  }


});