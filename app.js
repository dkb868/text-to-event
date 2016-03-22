module.exports = {
    todo: function() {
        return "TODO: Everything";
    },


    // splits string up by keywords into location,date,time
    getEvent: function(str, postDate) {
        var dateWords = [];
        //var timeWords = [];
        //var locationWords = [];
        var dateKeys = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Today', 'Tomorrow'];
        //days of the week indexed like javascript 0-6 with Sunday=0
        function wordInString(s, word){
            return new RegExp( '\\b' + word + '\\b', 'i').test(s);
        }
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        str = str.split(' ');
        // search for keywords
        dateKeys.forEach(function(kWord) {
            if (wordInString(str, kWord))
                dateWords.push(kWord);
        });
        //It's better to just include explicit searches for dates since the word indicators are countable
        //finite and there are unforeseen opportunities to miss them e.x. Tomorrow, we meet ...
        // This Thursday ....on the 4th of November
        //There are only 7 days of the week and today/tomorrow
        /*for(var i=0;i<str.length;i++){
            if (str[i] == 'in'){
                locationWords.push(str[i+1]);
                //ToDo: check for room number of building or two word locations(Rieber Hall)
            }
            else if (str[i] == 'at') {
                // because at can be a location or a time, check to see if there's a number next
                // If there is a number then it's a time, else assume it's a location
                // split the word by : since time us usually 12:00AM which would be one word
                // if the first char is a number then it is surely a time so take the whole word
                if(isNaN(str[i+1].split(":")[0])){
                    // not a number, therefore locaton
                    locationWords.push(str[i+1]);
                } else {
                    // is a number, is a time
                    timeWords.push(str[i+1]); //TODO times are more than one words, 9:00PM
                }
            }
        }
*/
        //dateWords analysis
        var currentDay = postDate.getDay();//get number from 0(Sunday) to 6(Sat)
        var daysFromNow;
        dateWords.forEach(function(Lword)//for each list word, translate into days from now
        {
            if(Lword == 'Today')
                daysFromNow = 0;
            else if(Lword == 'Tomorrow')
                daysFromNow = 1;
            dateKeys.forEach(function(Kword, eventDay){//finds event day in numbers 0-6
                if(Kword == Lword)
                {
                    daysFromNow = eventDay - currentDay;
                    if(daysFromNow<0)
                        daysFromNow +=7; //if negative then its next week
                }
            });
        });
        if(daysFromNow != undefined)
        {
            var eventDate = addDays(postDate, daysFromNow);
            /*console.log("Days from Now: " + daysFromNow +"\n");
            //TODO: "This Monday," or "on Wednesday." need to register
            console.log("Date Words: " + dateWords +"\n");
            console.log("time words: " + timeWords + "\n");
             console.log("location words: " + locationWords + "\n");*/
        }

        return{
            "title": "Event",
            "date": eventDate,
            "time": undefined,
            "location": undefined
        };
    }
};




