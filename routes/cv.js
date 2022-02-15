let logger = require('../logger.js')

app.get('/cv', async function(req,  res){
    let cvContent = await connection.asyncquery('SELECT c.name as heading, c.*, CVCategories.color, CVCategories.type as categoryType  FROM CV c JOIN CVCategories on c.category = CVCategories.name  ORDER BY begin DESC ;');
    let cvContentWithTimeString = createTimeString(cvContent);
    
    let CVDataByCategory = await sortCVByCategory(cvContentWithTimeString);
    let CVDataByTime = sortCVByTime(cvContentWithTimeString);
    let CVDataByTimeKeys = Object.keys(CVDataByTime);
    //let CVDateByTime = cvContentWithTimeString.sort((a, b) => (a.begin > b.begin) ? 1 : -1);
    let cvDataOutput = await getKeys();
    let CVDataKeys = cvDataOutput.cvKeys;
    let cvDataPrintNames = cvDataOutput.printNames;
    console.log(cvDataPrintNames)
    res.render('cvNew', {CVDataKeys, CVDataByCategory, CVDataByTime, CVDataByTimeKeys, cvDataPrintNames})
});

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
        let element2;

        for (i in data) {
            if (data[i].id == cvMerge[element].cvElement1ID) {
                element1 = i
                data[i].content[0].heading = cvMerge[element].cvElement1Heading
            } else if (data[i].id == cvMerge[element].cvElement2Id) {
                element2 = i
                data[i].content[0].heading = cvMerge[element].cvElement2Heading
            }
        }

        data[element1].content.push(...data[element2].content)
        data[element1].heading = cvMerge[element].name

        data.splice(parseInt(element2), 1)

    }

    let newDataSortedByCategory = {}
    for (element in data) {
        if (newDataSortedByCategory[data[element].category] == undefined) {
            newDataSortedByCategory[data[element].category] = [data[element]]
        } else {
            newDataSortedByCategory[data[element].category].push(data[element])
        }
    }
    
    console.log(cvMerge)
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
