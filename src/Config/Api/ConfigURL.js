// Auth
export const getSessionURL = "/user/getSession";
export const signInURL = "/auth/login";
export const signUpURL = "/auth/register";
export const authCodeURL = "/auth/authenticateCode";

// User
export const updateUserInfoURL = "/user/updateInfo";
export const changePasswordURL = "/user/changePassword";
export const getAppliedJobURL = "/user/getListApplicationHistory";
export const saveCVURL = "/user/uploadCV";
export const applyJobURL = "/user/applyJob";
export const findJobURL = "/job/findJob";
export const deleteCV = "/user/deleteCV"

// Dropdown
export const genderDropdownURL = "/dropdown/gender";
export const industryDropdownURL = "/dropdown/industry";
export const skillDropdownURL = "/dropdown/skill";
export const cityDropdownURL = "/dropdown/city";
export const titleDropdownURL = "/dropdown/title";
export const jobtypeDropdownURL = "/dropdown/jobtype";
export const unitDropdownURL = "/dropdown/unit";
export const experienceDropdownURL = "/dropdown/experience";

// Job
export const getJobInfoURL = "/job/getJobInfo";
export const getNewJobURL = "/job/getListNewJob";
export const getListJobInterestingURL = "/job/getListJobInteresting";
export const saveJobURL = "/user/saveJob";
export const unsavedJobURL = "/user/unSaveJob";
export const getSavedJobURL = "/user/getSavedJob";
export const getAllSavedJobId = "/user/getAllSavedJobId";

// CV
export const getListCVURL = "/cv/getListOwnerCV";

// Upload
export const uploadCVURL = "/user/upload/uploadCV";
export const uploadImageURL = "/user/upload/uploadImage";

//Company
export const getListCompanyURL = "/company/getListCompany";
export const getCompanyInfoURL = "/company/getCompanyInfo";
export const getJobOfCompanyURL = "/company/getAllJobOfCompany";
export const getTopCompanyURL = "/company/getListTopCompanyHome";
export const getCompanyScore = "/company/getCompanyScore";
export const getListComment = "/company/getListComment";
export const addComment = "/company/addComment";

//Message
export const getListMessage = "/chat";
export const chat = "/chat/send";
export const countUnreadMessage = "/chat/count"
export const viewAllMessage = "/chat/view/user"
export const deleteMessage = "/chat/delete"

//Blog
export const getBlogById = "/blog"
export const addBlog = "/blog"
export const blogSearch = "/blog/search"
export const getOwnerBlog = "/blog/getOwnerBlogs"
export const deleteBlog = "/blog/deleteBlog"
export const editBlog = "/blog/edit"

//Notification
export const countNotification = "/notification/user"
export const getLastsNotificationOfUser = "/notification/all/user"
export const viewNotification = "/notification/view"
export const viewNotificationOfUser = "/notification/view/user"