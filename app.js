module.exports = {
    todo: function() {
        return "TODO: Everything";
    },

    // splits string up by keywords into location,date,time
    separateByKeyword: function(str) {
        var event = {
            date: 0,
            time: 0,
            location: '',
        };
        var dateWords = [];
        var timeWords = [];
        var locationWords = [];
        str = str.split(' ');
        // search for keywords
        for(var i=0;i<str.length;i++){
            if(str[i] == 'on'){
                dateWords.push(str[i+1]);
            } else if (str[i] == 'in'){
                locationWords.push(str[i+1]);
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

        console.log("date words: " + dateWords +"\n");
        console.log("time words: " + timeWords + "\n");
        console.log("locatio nwords: " + locationWords + "\n");
    }
};
