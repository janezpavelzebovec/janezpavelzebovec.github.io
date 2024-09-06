var today = new Date();
// Pridobite datum v formatu YYYY-MM-DD
var formattedDate = today.toISOString().split('T')[0];

// create a dataset with items
// we specify the type of the fields `start` and `end` here to be strings
// containing an ISO date. The fields will be outputted as ISO dates
// automatically getting data from the DataSet via items.get().
var items = new vis.DataSet({
  type: { start: "ISODate", end: "ISODate" },
});

// create groups
/*var groups = new vis.DataSet();
groups.add([
  { id: 1, content: "človeška zgodovina" },
  { id: 2, content: "osebnosti" },
  { id: 2, content: "države" },
]);*/

function createBCDate(year, month, day) {
  var date = new Date();
  date.setUTCFullYear(year);
  date.setUTCMonth(month);
  date.setUTCDate(day);
  return date.toISOString().split('T')[0]; // Vrne v formatu "YYYY-MM-DD"
}

/*var date = new Date();
    date.setUTCFullYear(-900);
    date.setUTCMonth(0); // Mesec januar (0 = januar)
    date.setUTCDate(1);  // Prvi dan v mesecu*/

// add items to the DataSet
items.add([
  { id: 4, content: "J. R. R. Tolkien", start: "1892-01-03", end: "1973-09-02", group: "osebnosti",},
  { id: 7, content: "C. S. Lewis", start: "1898-11-29", end: "1963-11-22", group: "osebnosti",},
  { id: 16, content: "Napoleon Bonaparte", start: "1769-08-15", end: "1821-05-05", group: "osebnosti",},
  { id: 17, content: "Jezus Kristus", start: createBCDate(-4, 0, 1), end: createBCDate(30, 0, 1), group: "osebnosti",},
  { id: 18, content: "Mohamed", start: createBCDate(570, 0, 1), end: createBCDate(632, 6, 8), group: "osebnosti",},
  { id: 10, content: "SREDNJI VEK", start: "0476-01-01", end: "1492-10-12", type: "background", group: "človeška zgodovina",},
  { id: 9, content: "odkritje Amerike", start: "1492-10-12", type: "point"},
  { id: 8, content: "NOVI VEK", start: "1492-10-12", end: "1918-11-11", type: "background", className: "negative", group: "človeška zgodovina",},
  { id: 11, content: "ANTIKA", start: createBCDate(-800, 0, 1), end: "0476-01-01", type: "background", className: "negative", group: "človeška zgodovina",},
  { id: 12, content: "BRONASTA DOBA", start: createBCDate(-2300, 0, 1), end: createBCDate(-800, 0, 1), type: "background", group: "človeška zgodovina",},
  { id: 13, content: "SODOBNOST", start: "1918-11-11", end: formattedDate, type: "background", group: "človeška zgodovina",},
  { id: 14, content: "Prva svetovna vojna", start: "1914-07-28", end: "1918-11-11", type: "background",},
  { id: 15, content: "Druga svetovna vojna", start: "1939-09-01", end: "1945-09-02", type: "background", className: "negative",},
  { id: 19, content: "Rimsko cesarstvo", start: createBCDate(-27, 0, 1), end: "1453-01-01", type: "background", className: "negative", group: "države",},
  { id: 20, content: "Rimski mir", start: createBCDate(-27, 0, 1), end: createBCDate(180, 0, 1), type: "background",},
  { id: 21, content: "Ameriška državljanska vojna", start: "1861-04-12", end: "1865-04-09", type: "background",},
  { id: 22, content: "Jugoslavija", start: "1918-10-29", end: "2003-02-04", type: "background", className: "negative", group: "države",},
  { id: 23, content: "Slovenija", start: "1991-06-25", end: formattedDate, type: "background", className: "negative", group: "države",},
  { id: 5, content: "rojstvo", start: "2006-07-25", type: "point" },
]);

// log changes to the console
items.on("*", function (event, properties) {
  console.log(event, properties.items);
});

var container = document.getElementById("visualization");
var options = {
  start: "1800-01-01",
  end: formattedDate,
  height: "90vmin",
  width: '100%',

  // allow selecting multiple items using ctrl+click, shift+click, or hold.
  multiselect: true,

  // allow manipulation of items
  editable: false,

  /* alternatively, enable/disable individual actions:

    editable: {
      add: true,
      updateTime: true,
      updateGroup: true,
      remove: true
    },

    */

  showCurrentTime: true,
};

var timeline = new vis.Timeline(container, items, options);
//var timeline = new vis.Timeline(container, items, groups, options);
