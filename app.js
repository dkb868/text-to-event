module.exports = {
    todo: function() {
        return "TODO: Everything";
    },

    // splits string up by keywords into location,date,time
    separateByKeyword: function(str) {
        var event = {
            date: 0,
            time: 0,
            location: ''
        };
        var dateWords = [];
        var timeWords = [];
        var locationWords = [];
        var dateKeys = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        //days of the week indexed like javascript 0-6 with Sunday=0
        str = str.split(' ');
        // search for keywords
        for(var i=0;i<str.length;i++){
            //It's better to just include explicit searches for dates since the word indicators are countable
            //finite and there are unforeseen opportunities to miss them e.x. Tomorrow, we meet ...
            // This Thursday ....on the 4th of November
            //There are only 7 days of the week and today/tomorrow
            dateKeys.forEach(function(Kword){
                if(Kword == str[i]) {
                    dateWords.push(str[i]);
                }
            });
            /*TODO: Implement today and tomorrow
            if(str[i] == 'Tomorrow')
                dateWords.push(str[i])
                str[i] == 'Today')
                 */
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

        //dateWords analysis
        var date = new Date();
        var currentDay = date.getDay();//get number from 0(Sunday) to 6(Sat)
        var daysFromNow;
        dateWords.forEach(function(Lword)//for each list word, translate into days from now
        {
            dateKeys.forEach(function(Kword, eventDay){//finds event day in numbers 0-6
                if(Kword == Lword)
                {
                    daysFromNow = eventDay - currentDay;
                    if(daysFromNow<0)
                        daysFromNow +=7; //if negative then its next week
                }
            });
        });
        console.log("Days from Now: " + daysFromNow +"\n");
        //TODO: "This Monday," or "on Wednesday." need to register
        console.log("date words: " + dateWords +"\n");
        console.log("time words: " + timeWords + "\n");
        console.log("location words: " + locationWords + "\n");
    }
};




