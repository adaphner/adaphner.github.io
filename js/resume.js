async function getResumeInfo() {
    const request = await fetch("/files/resumeinfo.json");
    try {
        const data = await request.json();
        processResumeData(data);

    } catch (e) {
        return 'Somthing went wrong try again later';
    }
}

//getResumeInfo();
// function processResumeData(data) {
//     let resumeWrapper = document.getElementById('resume-wrapper');
//     let firstName, lastName, title, email;
//     const info = data.info;
//     const experience = data.experience;
//     const education = data.education;
//     const skills = data.skills;
//     info.forEach(el => {
//         firstName = el.firstname;
//         lastName = el.lastname;
//         title = el.title;
//     });
// }