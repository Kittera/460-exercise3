$(document).ready(async () => {
  //populate xkcd tab details with issue count and fetch latest page
  // page # of "latest" is used to set maximum for page selection

  const delay = (millis) => {
    return new Promise((res) => {
      setTimeout(res, millis);
    });
  };

  const xkcdCurrentIssue = await getXKCDIssue("latest");
  $("#xkcdCurrentCountDisp").text(xkcdCurrentIssue.num);
  $("#xkcdIssueNumSelect").val(xkcdCurrentIssue.num);
  $("#xkcdIssueNumSelect").attr("max", xkcdCurrentIssue.num);
  $("#xkcdIssueNumSelect").attr("min", 1);
  await updateDisplay(xkcdCurrentIssue);
  $("#xkcdComicDisplay").addClass("show");

  // setup listeners for xkcd interactivity
  // fetches selected comic page.
  $("#xckdGoBtn").click(async () => {
    await getSelectedPage(xkcdCurrentIssue);
  });
  $("#xkcdIssueNumSelect").keypress(async (event) => {
    let keyCode = event.keyCode || event.which;
    if (keyCode == 13) {
      await getSelectedPage(xkcdCurrentIssue);
    }
  });

  //random page selection listener
  $("#xckdRandBtn").click(async () => {
    randPageBtnHandler(xkcdCurrentIssue);
  });

  $("#jokePanelSinglePartBtn").click(async () => {
    $("#jokePanelSingle").removeClass("show");
    let newJoke = await getRandomJoke(1);
    await delay(300);
    $("#jokePanelSingleCategory").html(`Category:  <b>${newJoke.category}</b>`);
    $("#jokePanelSingleJoke").html(newJoke.joke);
    $("#jokePanelSingle").addClass("show");
  });

  $("#jokePanelTwoPartBtn").click(async () => {
    $("#jokePanelDouble").removeClass("show");
    let newJoke = await getRandomJoke(0);
    await delay(300);
    $("#jokePanelDoubleRevealBtn").text("Reveal Punchline");
    $("#jokePanelDoubleCategory").html(`Category:  <b>${newJoke.category}</b>`);
    $("#jokePanelDoubleSetup").text(newJoke.setup);
    $("#jokePanelDoubleRevealBtn").click(() => {
      $("#jokePanelDoubleRevealBtn").text(newJoke.delivery);
    });
    $("#jokePanelDouble").addClass("show");
  });
});
