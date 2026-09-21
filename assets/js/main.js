document.addEventListener("DOMContentLoaded", () => {

  /*
   * Mobile navigation
   */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");

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

});