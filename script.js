document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const roadmapCards = document.querySelectorAll('.roadmap-card');
        let hasResults = false;
        
        roadmapCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            
            card.style.display = matches ? 'block' : 'none';
            if (matches) hasResults = true;
        });

        // Show "no results" message if needed
        const noResults = document.getElementById('noResults');
        if (!hasResults && searchTerm) {
            if (!noResults) {
                const grid = document.querySelector('.grid');
                const message = document.createElement('p');
                message.id = 'noResults';
                message.className = 'col-span-3 text-center text-gray-500 py-8';
                message.textContent = 'No roadmaps found matching your search';
                grid.appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    // Event listeners
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Category Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            this.classList.add('bg-blue-500', 'text-white');
            this.classList.remove('bg-gray-200', 'hover:bg-gray-300');

            // Filter cards using data attributes
            const category = this.textContent.toLowerCase();
            const roadmapCards = document.querySelectorAll('.roadmap-card');
            
            roadmapCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.dataset.category;
                    card.style.display = cardCategory === category ? 'block' : 'none';
                }
            });

            // Clear any existing no results message
            const noResults = document.getElementById('noResults');
            if (noResults) noResults.remove();
        });
    });
});