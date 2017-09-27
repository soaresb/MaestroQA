/*
  TODOs:
  1. Grab all emails using fetchEmailsFromDatabase
  2. Implement and run the fetched emails through getFilteredEmails

  HINTs:
  1. Read documentation for "fetchEmailsFromDatabase" carefully
  2. Make use of "cursor" and "next" like paging results from APIs
*/

function render() {
  // TODO 1: Your Code Here
  $(document).ready(function(){
      //console.log("hey guys");
      var start = true;
      var temp = 0;
      var emails=[];
      var goNext = function(result){
        if (result.next !== null){
          fetchEmailsFromDatabase(result.next,(result_,next_) => {
            if(result_.result[0] !== null){
              for(var i=0;i<result_.result.length;i++){
              emails.push(result_.result[i]);
            }
            goNext(result_);
          }
          });
        } else{
          getFilteredEmails(emails);
        }
      };
      fetchEmailsFromDatabase(temp,(result,next)=>{
        //console.log("start");
        emails=result.result;
        goNext(result);
      });
  });

}

/*
  Emails are of format { author: String, subject: String, body: String }

  args:
    allEmails: [Email], All emails fetched from fetchEmailsFromDatabase
    searchInputs: [Strings], Inputs to filter allEmails on

  return: [Email]
          All emails that have at least one mapped value
          that has any element of searchInputs as a substring
*/

function getFilteredEmails(allEmails = [], searchInputs = getSearchInputs()) {
  console.log(searchInputs);
  var filteredEmails = [];
  for (var i = 0; i < allEmails.length; i++) {
    if (allEmails[i].author.includes(searchInputs[0]) || allEmails[i].subject.includes(searchInputs[0]) || allEmails[i].body.includes(searchInputs[0]) || 
        allEmails[i].author.includes(searchInputs[1]) || allEmails[i].subject.includes(searchInputs[1]) || allEmails[i].body.includes(searchInputs[1]) ||         
        allEmails[i].author.includes(searchInputs[2]) || allEmails[i].subject.includes(searchInputs[2]) || allEmails[i].body.includes(searchInputs[2])){
      filteredEmails.push(allEmails[i]);
    }
  }
  renderEmails(filteredEmails);
}

render();

//  ------------ Read But Do Not Make Changes Below This Line ------------

/*
  args:
    cursor: Integer, points to emails being fetched. Defaults to the beginning.

    callback: Function with args ({result, next})
      result: emails that were fetched from this call
      next: cursor pointing to the next page of results,
            or null if there are no more results.
*/
function fetchEmailsFromDatabase(cursor = 0, callback) {
  const emails = [
    {
      author: 'Bobby Bob',
      subject: 'Hey Friend!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Bobby Not-Bob',
      subject: 'Hey Friend!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Bobby Obo',
      subject: 'Hey Friendo!',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      author: 'Jenny Jane',
      subject: 'Let me know if you are planning...',
      body: `ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
      author: 'Jenny Janey',
      subject: 'Let Jenny know if you are planning...',
      body: `ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
      author: 'Some Guy',
      subject: 'Please DO NOT buy my product.',
      body: `My product is a scam. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud.`,
    },
    {
      author: 'Some Guy',
      subject: 'Please buy my product.',
      body: `My product is the best. For just $1,000 you could buy my product and make me somewhat richer. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat quis nostrud.`,
    },
  ];

  setTimeout(() => {
    const last = emails.length;
    const next = Math.min(cursor + _.random(1, 3), last);
    const fetchedEmails = _.slice(emails, cursor, next);

    callback({
      result: fetchedEmails,
      next: cursor === last ? null : next,
    });
  }, 100);
}

function renderEmails(emails) {
  const emailListHtml = _.map(emails, ({ author, subject, body }) => {
    return `<li class="email-item">
              <div class="meta-data">
                <span> <b>${author}</b>: ${subject} </span>
                <span> Today <b> 11:07 PM </b> </span>
              </div>
              ${body}
            </li>`;
  });

  $('#js-email-list').empty().append(emailListHtml);
}

function getSearchInputs() {
  return [
    'Bobby Bob',
    'Let me know if you are planning',
    'product is the best',
  ];
}
