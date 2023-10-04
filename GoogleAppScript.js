const TOKEN = "Bearer <token>";
let AppNamesArray = [];
let AppCategoryArray = [];
let AppPointsArray = [];

function main() {
  const appIds = getAppIdColumnValues();
  console.log(appIds);
  for (let i = 0; i < appIds.length; i++) {
    fetchAppIdDetails(appIds[i]);
  }

  fillDataOnColumns("B4:B6", AppNamesArray);
  fillDataOnColumns("C4:C6", AppCategoryArray);
  fillDataOnColumns("D4:D6", AppPointsArray);
}

function getAppIdColumnValues() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("A4:A6");
  var values = range.getValues();

  let appIdsInFlatArray = values.map(function (row) {
    return row[0];
  });

  return appIdsInFlatArray;
}

function fetchAppIdDetails(appId) {
  console.log(appId);
  let options = {
    headers: {
      Authorization: TOKEN,
    },
  };
  let response = UrlFetchApp.fetch(`http://34.230.193.181/api/app/fetchTask/${appId}`, options);
  if (response.getResponseCode() == 200) {
    let content = response.getContentText();
    let parsedContent = JSON.parse(content);

    AppNamesArray.push(parsedContent.name);
    AppCategoryArray.push(parsedContent.category);
    AppPointsArray.push(parsedContent.points);
  } else {
    console.log("Something went wrong");
  }
}

function fillDataOnColumns(columnRange, data) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  let range = sheet.getRange(columnRange);

  let resizedData = [];
  for (let i = 0; i < 3; i++) {
    resizedData.push([data[i]]);
  }
  range.setValues(resizedData);
}
