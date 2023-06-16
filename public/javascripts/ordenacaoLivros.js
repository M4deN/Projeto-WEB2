const orderAuthorSelect = document.getElementById('order-author');
    const orderYearSelect = document.getElementById('order-year');

    orderAuthorSelect.addEventListener('change', function() {
        const orderAuthor = this.value;
        const orderYear = orderYearSelect.value;
        const url = `/livros?pagina=1&orderAuthor=${orderAuthor}&orderYear=${orderYear}`;
        window.location.href = url;
    });

    orderYearSelect.addEventListener('change', function() {
        const orderAuthor = orderAuthorSelect.value;
        const orderYear = this.value;
        const url = `/livros?pagina=1&orderAuthor=${orderAuthor}&orderYear=${orderYear}`;
        window.location.href = url;
    });

    // Manter a opção selecionada no select de ordenar por ano
        const currentOrderYear = orderYearSelect.value;
        orderYearSelect.addEventListener('change', function() {
        this.value = currentOrderYear;
});
