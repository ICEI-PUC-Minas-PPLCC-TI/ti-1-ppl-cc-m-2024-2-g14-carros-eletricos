const API_KEY = 'd089ff489cac430ebdd670a1876b41c6';
const newsContainer = document.querySelector('.news-list');
const topNewsContainer = document.querySelector('#top-articles-list');
let allArticles = [];


async function fetchNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=carros elétricos&apiKey=${API_KEY}`);
        if (!response.ok) throw new Error('Erro ao buscar as notícias');

        const data = await response.json();
        allArticles = data.articles;

       
        displayNews(allArticles.slice(10));
    } catch (error) {
        console.error(error);
        newsContainer.innerHTML = '<p>Erro ao carregar as notícias. Tente novamente mais tarde.</p>';
    }
}


async function fetchTopNewsFromJson() {
    try {
        const response = await fetch('http://localhost:3000/topNews');
        if (!response.ok) throw new Error('Erro ao carregar as top notícias');

        const data = await response.json();
        displayTopNews(data); 
    } catch (error) {
        console.error(error);
        topNewsContainer.innerHTML = '<p>Erro ao carregar as top notícias.</p>';
    }
}


function displayNews(articles) {
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        if (article.urlToImage && article.title) {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            const newsImage = document.createElement('img');
            newsImage.src = article.urlToImage;
            newsImage.alt = 'Imagem da notícia';
            newsImage.classList.add('news-image');

            const newsContent = document.createElement('div');
            newsContent.classList.add('news-content');

            const newsTitle = document.createElement('h2');
            newsTitle.classList.add('news-title');
            newsTitle.textContent = article.title;

            const newsSummary = document.createElement('p');
            newsSummary.textContent = article.description || 'Resumo não disponível.';

            const newsMeta = document.createElement('p');
            newsMeta.classList.add('news-meta');
            newsMeta.textContent = `Data: ${new Date(article.publishedAt).toLocaleDateString()} | Autor: ${article.author || 'Desconhecido'}`;

            newsContent.appendChild(newsTitle);
            newsContent.appendChild(newsSummary);
            newsContent.appendChild(newsMeta);
            newsItem.appendChild(newsImage);
            newsItem.appendChild(newsContent);
            newsContainer.appendChild(newsItem);
        }
    });
}


function displayTopNews(articles) {
    topNewsContainer.innerHTML = '';

   
    const topThreeArticles = articles.slice(0, 3);
    
    topThreeArticles.forEach(article => {
        const topNewsItem = document.createElement('li');
        const topNewsLink = document.createElement('a');

        topNewsLink.href = article.url; 
        topNewsLink.target = '_blank';
        topNewsLink.textContent = article.title;
        topNewsLink.classList.add('top-news-link');

        topNewsItem.appendChild(topNewsLink);
        topNewsContainer.appendChild(topNewsItem);
    });
}


fetchNews();
fetchTopNewsFromJson();
