document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const categoriesList = document.getElementById('categories');
    const productsDiv = document.getElementById('products');
    const paginationDiv = document.getElementById('pagination');

    let currentPage = 1;
    let currentCategory = '';
    let currentSearch = '';

    const fetchCategories = async () => {
        const response = await fetch('/api/categ,ories');
        const categories = await response.json();
        categories.List.innerHTML = categories.map(cat => `<li>${cat.name}</li>`).join('');
        categoriesList.querySelectorAll('li').forEach((li, index) =>{
            li.addEventListener('click', () => {
                currentCategory = categories[index].id;
                currentPage = 1;
                fetchProducts();
            });
        });
    };

    const fetchProducts = async () => {
        const response = await fetch(`/api/products?category=${currentCategory}&search=${currentSearch}&page=${currentPage}`);
        const data = await response.json();
        productsDiv.innerHTML = data.products.map(product =>
           `<div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
            </div>`
        ).join('');
        paginationDiv.innerHTML = 
            
        ` <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Previous</button>
          <span>Page ${currentPage} of ${data.pages}</span>
          <button ${currentPage === data.pages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button> `;
    
    };

    const changePage = (page) => {
        currentPage = page;
        fetchProducts();
    };

    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        currentPage = 1;
        fetchProducts();
    });

    fetchCategories();
    fetchProducts();
});