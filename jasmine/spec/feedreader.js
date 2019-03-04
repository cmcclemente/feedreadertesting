/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
        * a related set of tests. This suite is all about the RSS
        * feeds definitions, the allFeeds variable in our application.
        */
  describe("RSS Feeds", function() {
    /* This is our first test - it tests to make sure that the
               * allFeeds variable has been defined and that it is not
               * empty. Experiment with this before you get started on
               * the rest of this project. What happens when you change
               * allFeeds in app.js to be an empty array and refresh the
               * page?
               */
    it("are defined", function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    //Test if url exists and not empty
    it("url defined", function() {
      for (const feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    //Test if name exists and not empty
    it("name defined", function() {
      for (const feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  /*The menu test suite*/
  describe("The menu", function() {
    // Test if menu is hidden by deafault
    it("hide menu", function() {
      const body = document.querySelector("body");
      expect(body.classList.contains("menu-hidden")).toBe(true);
    });

    // Test if menu shows when icon is clicked
    it("show menu", function() {
      const body = document.querySelector("body");
      expect(body.classList.contains("menu-hidden")).toBe(true);

      const icon = document.querySelector(".menu-icon-link"); 
      icon.click();
      expect(body.classList.contains("menu-hidden")).toBe(false);
      icon.click();
      expect(body.classList.contains("menu-hidden")).toBe(true);
    });
  });

  /*Initial Entries test suite*/
  describe("Initial Entries", function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    // Test if feed container is not empty
    it("is not empty", function() {
      const entries = document.querySelectorAll(".feed .entry");
      expect(entries.length).toBeGreaterThan(0)
    });
  });

  //  New test suite
  describe("New Feed Selection", function() {
    const feed = document.querySelector(".feed");
    let firstFeed;
    let newFeed;

    beforeEach(function(done) {
      loadFeed(0, function() {
        firstFeed = feed.innerText;
        loadFeed(1, function() {
          newFeed = document.querySelector(".feed").innerText;
          done();
        });
      });
    });

    // Test if there were changes in feed
    it("content changes", function() {
      expect(newFeed === firstFeed).toBe(false);
    });
  });
});
