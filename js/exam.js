const elList = document.querySelector('.box__user');
const userTemp = document.querySelector('.userstemp').content

const elListPost = document.querySelector('.box__post');
const postTemp = document.querySelector('.posttemp').content

const elListcomment = document.querySelector('.box__comment');
const commentTemp = document.querySelector('.commenttemp').content

const elButton = document.querySelector(".back")
const token = window.localStorage.getItem("token")

if (!token) {
    window.location.replace("login.html");
}

elButton.addEventListener("click", (evt) => {
    window.localStorage.removeItem("token");
    window.location.replace("login.html");
})

async function renderUsers() {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    elList.innerHTML = '';
    users.forEach(user => {
        const userrender = userTemp.cloneNode(true);
        userrender.querySelector('.users__li--id').textContent = user.id;
        userrender.querySelector('.users__li--name').textContent = user.name;
        userrender.querySelector('.users__li--username').textContent = user.username;
        userrender.querySelector('.users__li--email').textContent = user.email;
        userrender.querySelector('.user__btn').dataset.userId = user.id;
        elList.appendChild(userrender);
    });
}

elList.addEventListener('click', async (evt) => {
    if (evt.target.matches('.user__btn')) {
        const userId = evt.target.dataset.userId;
        await renderPosts(userId);
    }
});


async function renderPosts(userId) {
    const posts = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    elListPost.innerHTML = '';
    posts.forEach(post => {
        const postElement = postTemp.cloneNode(true);
        postElement.querySelector('.post__userid').textContent = post.userId;
        postElement.querySelector('.post__id').textContent = post.id;
        postElement.querySelector('.post__text').textContent = post.title;
        postElement.querySelector('.post__texts').textContent = post.body;
        postElement.querySelector('.post__btn').dataset.postId = post.id;
        elListPost.appendChild(postElement);
    });
}

elListPost.addEventListener('click', async (evt) => {
    if (evt.target.matches('.post__btn')) {
        const postId = evt.target.dataset.postId;
        await renderComments(postId);
    }
});


async function renderComments(postId) {
    const comments = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    elListcomment.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = commentTemp.cloneNode(true);
        commentElement.querySelector('.com__postid').textContent = comment.postId;
        commentElement.querySelector('.com__id').textContent = comment.id;
        commentElement.querySelector('.com__name').textContent = comment.name;
        commentElement.querySelector('.com__email').textContent = comment.email;
        commentElement.querySelector('.com__text').textContent = comment.body;
        elListcomment.appendChild(commentElement);
    });
}

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function error() {
    try {
        await renderUsers();
    } catch (error) {
        console.error('Xatolik yuzaga keldi:', error);
    }
}
error();