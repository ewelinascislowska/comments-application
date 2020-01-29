const comments = document.querySelectorAll(".comments");

//adding new html elements
function createArticle(id, title, body) {
    const container = document.querySelector("div.container");
    let newArticle = document.createElement("article");
    let newH1 = document.createElement("h1");
    let newDivBody = document.createElement("div");
    let newP = document.createElement("p");
    let newPShowComments = document.createElement("p");
    let newDivComments = document.createElement("div");
    container.appendChild(newArticle);
    newArticle.appendChild(newH1);
    newArticle.appendChild(newDivBody);
    newDivBody.appendChild(newP);
    newArticle.appendChild(newPShowComments);
    newArticle.appendChild(newDivComments);
    newArticle.className = "article article_" + id;
    newDivBody.className = "body";
    newPShowComments.className = "showComments";
    newPShowComments.innerHTML = 'rozwiń komentarze<i class="fas fa-angle-double-right"></i>';
    newDivComments.className = "comments";
    newH1.textContent = title;
    newP.textContent = body;
}
//create comments
function createComment(postId, name, email, body) {
    let comment = document.createElement("div");
    comment.className = "comment";
    comment.innerHTML = '<p class="name">' + name + '</p><p class="email">' + email + '</p><p class="body">' + body + '</p>';
    document.querySelector("article.article_" + postId + " div.comments").appendChild(comment);
}
//get posts data from file
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(response => {
        response.forEach(function (item) {
            createArticle(item.id, item.title, item.body);
        }); //add class for opening comments
        document.querySelectorAll(".showComments").forEach(function (item) {
            item.addEventListener("click", function () {
                item.nextElementSibling.classList.toggle("commentsOn");
            });
        });
        //add class for rotating arrow in <i>
        document.querySelectorAll(".showComments").forEach(function (item) {
            item.addEventListener("click", function () {
                item.classList.toggle("active");
            });
        });

    }) //get comments data
    .then(function () {
        return fetch("https://jsonplaceholder.typicode.com/comments");
    })
    .then(response => response.json())
    .then(response => {
        response.forEach(function (item) {
            createComment(item.postId, item.name, item.email, item.body);
        }) //search
        const searchInput = document.querySelector("input");
        const articles = [...document.querySelectorAll("body article")];
        const searchContener = document.querySelector("div.container");

        function serachWord(event) {
            const currentWord = event.target.value.toUpperCase();
            let result = articles;
            result = result.filter(articles => articles.querySelector("h1").textContent.toUpperCase().includes(currentWord));
            searchContener.textContent = '';
            result.forEach(name => searchContener.appendChild(name));
        }
        searchInput.addEventListener('input', serachWord);
    });