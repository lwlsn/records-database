const recordList = document.querySelector('#record-list');
const form = document.querySelector('#add-record-form');

//create a function to render elements
function renderRecord(doc) {
    //create list and span elements
    let li = document.createElement('li');
    let album = document.createElement('span');
    let artist = document.createElement('span');
    let cross = document.createElement('div');
    let link = document.createElement('span'); //to do- turn these into hrefs.. 
    
    //set attributes
    li.setAttribute('data-id', doc.id);
    album.textContent = doc.data().album;
    artist.textContent = doc.data().artist;
    cross.textContent = 'x';
    link.textContent = doc.data().link;


    //append data types to each column list
    li.appendChild(album);
    li.appendChild(artist);
    li.append(cross);
    li.append(link);

    //append master list 
    recordList.appendChild(li);

    //deleting data 
    cross.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let id = evt.target.parentElement.getAttribute('data-id');
        db.collection('records').doc(id).delete();

    })

}

// get data from firebase
db.collection('records').get().then((snapshot)=> {
   snapshot.docs.forEach(doc => {
       console.log(doc.data());
        renderRecord(doc);
   })
}); 


// only get specific data from firebase
// db.collection('records').where('artist', '==', "Ans M").orderBy('album').get().then((snapshot)=> {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//          renderRecord(doc);
//     })
//  }); 
 


//saving data
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    db.collection('records').add({
        album: form.album.value,
        artist: form.artist.value, 
        link: form.link.value
    });
    form.album.value='';
    form.artist.value='';
    form.link.value= '';
})



//real-time data listener 
db.collection('records').orderBy('artist').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    // console.log(changes);
    changes.forEach(change  => {
        if (change.type == 'added') { // if entry is added, then list in the database
            renderRecord(change.doc);
        }
        else if (change.type == 'removed') { // when id of removed matches that of the database, remove 
            let li = recordList.querySelector('[data-id=' + change.doc.id + ']');
        }
    })
})

