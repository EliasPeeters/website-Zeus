let logger = require('../logger.js')
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const PDFDocument = require('pdfkit');
const fs = require('fs');

app.get('/cv', async function(req,  res){

    let cvContent = await connection.asyncquery('SELECT c.name as heading, c.*, CVCategories.color, CVCategories.type as categoryType  FROM CV c JOIN CVCategories on c.category = CVCategories.name  ORDER BY begin DESC ;');
    let cvContentWithTimeString = createTimeString(cvContent);

    let CVDataByTime = sortCVByTime(cvContentWithTimeString);
    let CVDataByCategory = await sortCVByCategory(cvContentWithTimeString);
    
    let CVDataByTimeKeys = Object.keys(CVDataByTime);
    //let CVDateByTime = cvContentWithTimeString.sort((a, b) => (a.begin > b.begin) ? 1 : -1);
    let cvDataOutput = await getKeys();
    let CVDataKeys = cvDataOutput.cvKeys;
    let cvDataPrintNames = cvDataOutput.printNames;
    res.render('cvNew', {CVDataKeys, CVDataByCategory, CVDataByTime, CVDataByTimeKeys, cvDataPrintNames})
});

app.get('/cv-pdf', async function(req, res) {
    const doc = new PDFDocument();

    let cvContent = await connection.asyncquery('SELECT c.name as heading, c.*, CVCategories.color, CVCategories.type as categoryType  FROM CV c JOIN CVCategories on c.category = CVCategories.name  ORDER BY begin DESC ;');
    let cvContentWithTimeString = createTimeString(cvContent);

    let CVDataByCategory = await sortCVByCategory(cvContentWithTimeString);

    let cvDataOutput = await getKeys();
    let CVDataKeys = cvDataOutput.cvKeys;

    res.render('cvPdf', {CVDataByCategory, CVDataKeys})
})

function createTimeString(data) {
    data.forEach(element => {
        if (element.end == null) {
            element.timeString = `${element.begin}`;
            element.range = false;
        } else if (element.end == -1) {
            element.timeString = `${element.begin} - Present`;
            element.range = true;
        } else {
            element.timeString = `${element.begin} - ${element.end}`;
            element.range = true;
        }
        if (element.length != null) {
            element.timeString += ` (${element.length})`
        }
    });
    return data;
}

async function sortCVByCategory(data) {

    // make array from description and timeString
    for (element in data) {
        data[element].content = [
            {
                time: data[element].timeString,
                description: data[element].description
            }
        ]
    }

    let cvMerge = await connection.asyncquery(`SELECT * From CVMerge`);

    // merge the cv blocks
    for (element in cvMerge) {
        // search for the two objects in the data
        let element1;
        let elementsMerge = cvMerge[element].cvElementMerge.split(',');

        // create ints
        elementsMerge = elementsMerge.map(x => parseInt(x))
        elementsMergeFound = []
        
        for (i in data) {
            if (data[i].id == cvMerge[element].cvElement1ID) {
                element1 = i
                data[i].content[0].heading = data[i].heading
            } else if (data[i].id == cvMerge[element].cvElement2Id) {
                element2 = i
                data[i].content[0].heading = data[i].heading
                break; 
            }
        }

        for (i in elementsMerge) {
            for (p in data) {
                if (data[p].id == elementsMerge[i]) {
                    data[p].content[0].heading = data[p].heading
                    elementsMergeFound.push(parseInt(p))
                    break; 
                }
            }
        } 
        data[element1].heading = cvMerge[element].name

        for (i in elementsMergeFound) {
            data[element1].content.push(...data[elementsMergeFound[i]].content)
        }
        //data[element1].content.push(...data[element2].content)
        
        for (i in elementsMerge) {
            for (p in data) {
                if (data[p].id == elementsMerge[i]) {
                    data.splice(p, 1)        
                }
            }
        }
        // data.splice(parseInt(element2), 1)

    }

    let newDataSortedByCategory = {}
    for (element in data) {
        if (newDataSortedByCategory[data[element].category] == undefined) {
            newDataSortedByCategory[data[element].category] = [data[element]]
        } else {
            newDataSortedByCategory[data[element].category].push(data[element])
        }
    }
    
    return newDataSortedByCategory;
}

function sortCVByTime(data) {
    let newDataSortedByTime = {}
    for (element in data) {
        if (newDataSortedByTime[data[element].begin] == undefined) {
            newDataSortedByTime[data[element].begin] = [data[element]]
        } else {
            newDataSortedByTime[data[element].begin].push(data[element])
        }
    }
    return newDataSortedByTime;
}

async function getKeys() {
    let cvKeysResult = await connection.asyncquery(`SELECT name, printName FROM CVCategories WHERE CVCategories.name != 'Time'  ORDER BY CVCategories.orderNumber;`);
    let cvKeys = [];
    let printNames = [];

    for (element in cvKeysResult)  {
        cvKeys.push(cvKeysResult[element].name)
        printNames.push(cvKeysResult[element].printName)
    }
   return {cvKeys, printNames};
}
