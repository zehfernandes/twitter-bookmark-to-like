let interval;

function run() {
  const listItem = document.querySelector('nav [href*="/lists"]');
  if (listItem === null) {
    return;
  }
  clearInterval(interval);

  // Profile
  const profileName = /twitter.com\/(\w*)\/\w*/g.exec(listItem.href)[1];

  // Added
  const likeSVG =
    '<g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g>';
  const bookmark = document.querySelector('nav [href="/i/bookmarks"]');

  console.log(`${profileName}/likes`);
  bookmark.href = `https://twitter.com/${profileName}/likes`;
  console.log(bookmark.href);
  bookmark.querySelector("svg").innerHTML = likeSVG;
  let textNode = bookmark.querySelector("span");
  if (textNode.textContent == "Bookmarks") {
    textNode.textContent = "Likes";
  }

  let clone = bookmark.cloneNode(true);
  clone.classList.add("custom-like");
  bookmark.remove();
  document.querySelector("nav").insertBefore(clone, listItem);

  // ---------------------
  // States Styles
  // ---------------------
  //let state = window.location.href.includes("likes") ? "" : ":hover";

  // Get Color
  const button = document.querySelector('a[href*="/compose/tweet"]');
  const color = window.getComputedStyle(button).backgroundColor;

  // Add Style
  var css = `
.custom-like:hover > div{background-color:${color.replace(")", ",0.1)")}}
.custom-like:hover span { color: ${color} }
.custom-like:hover svg { fill: ${color} }
`;
  var style = document.createElement("style");

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName("head")[0].appendChild(style);
  console.log("Bookmark replaced by Likes 🎯!");
}

window.addEventListener("DOMContentLoaded", async (event) => {
  interval = setInterval(() => {
    run();
  }, 800);
});
