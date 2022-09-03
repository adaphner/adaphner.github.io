//to process and update navigation tabs
document.querySelectorAll('.nav-tab').forEach(nav => nav.addEventListener('click', (e) => {
    const page = e.target.innerText;
    // console.log('Page:', page);
    // console.log('Nav:', nav);
    updatePage(page, nav);
}));

//to display the home page by default
document.getElementById('default').click();

function updatePage(page, nav) {

    //reset all the pages display to 'none'
    document.querySelectorAll('.page-content').forEach((pgs) => pgs.style.display = 'none');

    // reset bg and borders of all the tabs
    document.querySelectorAll('.nav-tab').forEach((navs) => {
        // navs.style.backgroundColor = '#f5f5f5';
        navs.style.borderBottom = '1px solid #f5f5f5';
    });

    //to show the content of the clicked on tab by the page 'id'
    const showPage = document.getElementById(page);
    showPage.style.display = 'flex';
    nav.style.borderBottom = '1px solid #204666';

    // const updateTitle = document.getElementsByTagName('title');
    // updateTitle.textContent = `Webdevio.com | ${page} | Website Development | Web Design`;
}

//Change the social icons on mouse over and mouse leave

document.querySelectorAll('.ft-social-icons').forEach(icon => icon.addEventListener('mouseover', () => {
    switch (icon.id) {
        case 'linkedin-icon':
            icon.setAttribute('src', 'images/linked-in-orange.svg');
            break;
        case 'github-icon':
            icon.setAttribute("src", "images/git-hub-orange.svg");
            break;
        case 'email-icon':
            icon.setAttribute("src", "images/email-orange.svg");
            break;
    }
}));
document.querySelectorAll('.ft-social-icons').forEach(icon => icon.addEventListener('mouseleave', () => {
    switch (icon.id) {
        case 'linkedin-icon':
            icon.setAttribute('src', 'images/linked-in-white.svg');
            break;
        case 'github-icon':
            icon.setAttribute("src", "images/git-hub-white.svg");
            break;
        case 'email-icon':
            icon.setAttribute("src", "images/email-white.svg");
            break;
    }
}));


// When the user scrolls down 150px from the top of the document, resize the navbar's
//padding and the logo's font size
window.onscroll = () => {
    const mainNav = document.getElementById('navigation');
    const subNav = document.getElementById('projects-sub-nav');

    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        // console.log(document.documentElement.scrollTop);
        //to shrink the nav bars on scroll
        //mainNav.style.height = '40px';
        // subNav.style.height = '40px';
        // subNav.style.top = '40px';

        mainNav.style.display = 'none';
        subNav.style.display = 'none';

    } else {
        //to expand the nav bars on scroll
        // mainNav.style.height = '60px';
        // subNav.style.height = '60px';
        // subNav.style.top = '60px';

        mainNav.style.display = 'flex';
        subNav.style.display = 'flex';
    }
}


