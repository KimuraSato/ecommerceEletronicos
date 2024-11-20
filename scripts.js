document.addEventListener('DOMContentLoaded', function() {
    // Produtos disponíveis na loja
    const products = [
      { id: 1, name: 'Smartphone X10', price: 2499.00, img: 'https://via.placeholder.com/300x200' },
      { id: 2, name: 'Fone de Ouvido Pro', price: 599.00, img: 'https://via.placeholder.com/300x200' },
      { id: 3, name: 'Notebook Gamer G7', price: 5999.00, img: 'https://via.placeholder.com/300x200' }
    ];
  
    let cart = []; // Carrinho de compras
  
    // Função para atualizar o contador de itens no carrinho
    function updateCartCount() {
      const cartCount = document.getElementById('cart-count');
      cartCount.textContent = cart.length;
      updateCartDisplay();
    }
  
    // Função para exibir os itens do carrinho
    function updateCartDisplay() {
      const cartItems = document.getElementById('cart-items');
      const totalPrice = document.getElementById('total-price');
      cartItems.innerHTML = '';  // Limpa os itens do carrinho antes de adicionar novos
      let total = 0;
  
      // Exibe cada item do carrinho
      cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
          <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
          <span>${item.name}</span>
          <span>R$ ${item.price.toFixed(2)}</span>
        `;
        cartItems.appendChild(productElement);
        total += item.price;  // Soma o preço total
      });
  
      totalPrice.textContent = total.toFixed(2);  // Atualiza o total
    }
  
    // Função para adicionar um produto ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = parseInt(button.parentElement.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        cart.push(product);  // Adiciona o produto no carrinho
        updateCartCount();  // Atualiza o contador do carrinho
      });
    });
  
    // Finalizar compra
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
      }
  
      // Aqui simulamos uma requisição para uma API de pagamento (fictícia para este exemplo)
      const orderDetails = {
        products: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0)
      };
  
      // Exemplo de chamada para uma API fictícia de pagamento
      fetch('https://api.mockpayment.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Compra finalizada com sucesso!'); // Sucesso na compra
          cart = []; // Limpa o carrinho após a compra
          updateCartCount(); // Atualiza o contador do carrinho
          updateCartDisplay(); // Limpa a exibição do carrinho
        } else {
          alert('Erro ao processar o pagamento. Tente novamente.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao processar o pagamento.');
      });
    });
  });
  