// Uses a CORS-enabled wrapper around the XKCD Webcomic JSON API.
// Accepts an integer or a string since "latest" is a valid argument to the num parameter.
const xkcdWrapperUrlBaseTemplate = "https://getxkcd.vercel.app/api/comic?num=";
const xkcdIssueNumTemplate = "Issue #";
const xkcdNormalPageTemplate = "https://xkcd.com/";

async function getXKCDIssue(issueNum) {
  const xkcdResponse = await fetch(
    `${xkcdWrapperUrlBaseTemplate}${issueNum}`, // completes the url with issue number query param
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  return await xkcdResponse.json();
}

// Refreshes the comic page display card with a bit of animation.
async function updateDisplay(issue) {
  let delay = (millis) => {
    return new Promise((res) => {
      setTimeout(res, millis);
    });
  };
  $("#xkcdComicDisplay").removeClass("show");
  await delay(300);

  $("#xkcdComicPageTitle").text(
    `${xkcdIssueNumTemplate}${issue.num}: ${issue.safe_title}`
  );
  $("#xkcdComicPageImage").attr("src", issue.img);
  $("#xkcdComicPageAltText").text(issue.alt);
  $("#xkcdComicPageDate").text(`${issue.year}-${issue.month}-${issue.day}`);
  if (issue.transcript !== "") {
    $("#xkcdComicPageTranscript").text(issue.transcript);
  } else {
    $("#xkcdComicPageTranscript").text("No Transcript");
  }
  $("#xkcdComicPageDirectLink").attr("href", issue.img);
  $("#xkcdComicPageNormalLink").attr(
    "href",
    `${xkcdNormalPageTemplate}${issue.num}/`
  );
  await delay(500);
  $("#xkcdComicDisplay").addClass("show");
}

async function getSelectedPage(xkcdCurrentIssue) {
  const issueNumSelector = $("#xkcdIssueNumSelect")[0];

  if (issueNumSelector.valueAsNumber < 1) {
    issueNumSelector.value = `1`;
    issueNumSelector.valueAsNumber = 1;
  } else if (issueNumSelector.valueAsNumber > xkcdCurrentIssue.num) {
    issueNumSelector.value = `${xkcdCurrentIssue.num}`;
    issueNumSelector.valueAsNumber = xkcdCurrentIssue.num;
  }
  const selectedPage = await getXKCDIssue(issueNumSelector.valueAsNumber);
  await updateDisplay(selectedPage);
}

async function randPageBtnHandler(xkcdCurrentIssue) {
  const randIssueNum = Math.floor(
    Math.random() * xkcdCurrentIssue.num + 1 // [1, <latest issue num>]
  );
  $("#xkcdIssueNumSelect").val(randIssueNum);
  await getSelectedPage(xkcdCurrentIssue);
}
