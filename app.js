const recordList = document.querySelector('#record-list');

//create a function to render elements
function renderRecord(doc) {
    //create list and span elements
    let li = document.createElement('li');
    let album = document.createElement('span');
    let artist = document.createElement('span');
    
    //set attributes
    li.setAttribute('data-id', doc.id);
    album.textContent = doc.data().album;
    artist.textContent = doc.data().artist;

    //append data types to each column list
    li.appendChild(album);
    li.appendChild(artist);

    //append master list 
    recordList.appendChild(li);

}


db.collection('records').get().then((snapshot)=> {
   snapshot.docs.forEach(doc => {
       console.log(doc.data());
        renderRecord(doc);
   })
}); // asynchronous request. can't just store in a var, use then function


