// script.js
//const apiUrl = 'https://api.guzelsozler.com/'; // Hayali API URL
const apiUrl = 'https://api.ikas.com/tr/blog/ilham-veren-motivasyon-sozleri/'; // Hayali API URL
let quotes = [];
let currentQuote = null;
let likedQuotes = [];
let quoteIndex = 1;

// Ziyaretçi sayısını güncelle ve göster
function updateVisitorCount() {
    let visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        visitorCount = 0;
    }
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitorCount').textContent = `Ziyaretçi Sayısı: ${visitorCount}`;
}

async function fetchQuotes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        quotes = data;
        generateQuote();
    } catch (error) {
        console.error('Error fetching quotes:', error);
        quotes = [
            { text: "Başarı, başarısızlık korkusunun yokluğunda değil, ona rağmen harekete geçmektir.", likes: 0 },
            { text: "Her zaman elinizden gelenin en iyisini yapın. Ektiğinizi biçeceksiniz.", likes: 0 },
            { text: "Düşünceleriniz gerçeğinizdir. Ne düşünürseniz o olursunuz.", likes: 0 },
            { text: "Başarıya giden yolda ilk adım hayal etmektir.", likes: 0 },
            { text: "Küçük adımlar büyük başarılar getirir.", likes: 0 },
            { text: "En büyük zafer düşmemekte değil, her düştüğünde ayağa kalkmaktır.", likes: 0 },
            { text: "Kendinize inanın ve bütün dünya size inanacaktır.", likes: 0 },
            { text: "Zorluklar hayatın bir parçasıdır. Onlar olmadan gelişemezsiniz.", likes: 0 }
        ];
        generateQuote();
    }
}

function generateQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    document.getElementById('quote').textContent = `${quoteIndex}. ${currentQuote.text}`;
    quoteIndex++;
}

function likeQuote() {
    if (!currentQuote) return;

    const existingQuote = likedQuotes.find(q => q.text === currentQuote.text);
    if (existingQuote) {
        existingQuote.likes++;
    } else {
        likedQuotes.push({ ...currentQuote, likes: 1 });
    }

    updateTopQuotes();
}

function updateTopQuotes() {
    const sortedQuotes = likedQuotes.sort((a, b) => b.likes - a.likes);
    const topQuotesContainer = document.getElementById('topQuotes');
    topQuotesContainer.innerHTML = '';
    sortedQuotes.forEach((quote, index) => {
        if (quote.likes > 0) {
            const quoteElement = document.createElement('p');
            quoteElement.textContent = `${index + 1}. ${quote.text} - ${quote.likes} beğeni`;
            topQuotesContainer.appendChild(quoteElement);
        }
    });

    if (topQuotesContainer.innerHTML === '') {
        topQuotesContainer.textContent = 'Henüz beğenilen söz yok...';
    }
}

// Sayfa yüklendiğinde sözleri çekmek ve ziyaretçi sayısını güncellemek için
window.onload = function() {
    fetchQuotes();
    updateVisitorCount();
};
