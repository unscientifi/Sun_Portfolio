// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch
    let userButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

   
    function parseUserData(work) { 
        let targetDiv = document.querySelector('.lb-content'),
            targetImg = lightbox.querySelector('.projectImg');

        let workContent = `
        <h3>${work.Category}</h3>
        <p></p>
        <h4>${work.Description}</h4>
        <p></p>
        <p>${work.Information}</p>
        <p>${work.Collaborate}</p>
        <video controls src="images/${work.Video}" width="80%"></video>
            `;

        console.log(workContent);

        targetDiv.innerHTML = workContent;
        targetImg.src = work.imgsrc;

        lightbox.classList.add('show-lb');
    }

    function getUserData(event) {
        event.preventDefault(); //kill the default a tag behaviour (don't navigate anythere)

        //find this image closets to the anchor tag and get its src property
        let imgSrc = document.getElementsByClassName('projectImg')[0].getAttribute('src');
        // document.getElementsByClassName('projectImg')[0].getAttribute('src');
        let url = `/users/${this.getAttribute('href')}`;  // /1


        fetch(url) // go get the data
            .then(res => res.json())  // parse the json result into a plain object
            .then (data => {
                console.log("my database result is:", data)

                data[0].imgsrc = imgSrc;

                parseUserData(data[0]);
            })
            .catch((err) => {
                console.log(err)
            });


    }

    
    userButtons.forEach(button => button.addEventListener('click', getUserData));
    lightbox.querySelector('.close').addEventListener('click', function () {
        lightbox.classList.remove('show-lb');
    })
})();