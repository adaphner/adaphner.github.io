//to process and update navigation tabs
document.querySelectorAll('.nav-tab').forEach(nav => nav.addEventListener('click', (e) => {
    const page = e.target.innerText;
    updatePage(page, nav);
}));

//to display the home page by default
document.getElementById('default').click();

function updatePage(page, nav) {

    //reset pages display and borderbottom
    document.querySelectorAll('.page-content').forEach((pgs) => pgs.style.display = 'none');
    document.querySelectorAll('.nav-tab').forEach((navs) => {
        navs.style.borderBottom = '1px solid #f5f5f5';
    });

    //to show the content of the clicked tab
    const showPage = document.getElementById(page);
    showPage.style.display = 'flex';
    nav.style.borderBottom = '1px solid #204666';
}

window.onscroll = () => {
    const mainNav = document.getElementById('navigation');
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
        //to change nav and subnav display when scrolling pass 450px
        mainNav.style.display = 'none';
    } else {
        mainNav.style.display = 'flex';
    }
}
window.onscroll = () => {
    const subNav = document.getElementById('projects-sub-nav');
    //to change subnav display when scrolling pass 250px
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        subNav.style.display = 'none';

    } else {
        subNav.style.display = 'flex';
    }
}

//Change the social icons on mouseover
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

//Change the social icons on mouseleave
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





