(function () {
    const body = document.body;
    const page = body.dataset.page || '';

    function $(selector, scope = document) {
        return scope.querySelector(selector);
    }

    function $all(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    }

    function applySavedDarkMode() {
        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark');
        } else {
            body.classList.add('light');
        }
        updateDarkToggleIcons();
    }

    function updateDarkToggleIcons() {
        $all('[data-action="toggle-dark"]').forEach((btn) => {
            btn.innerHTML = body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }

    function toggleDarkMode() {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add('light');
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
        }
        localStorage.setItem('darkMode', body.classList.contains('dark'));
        updateDarkToggleIcons();
    }

    function initGlobalActions() {
        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-action]');
            if (!trigger) return;

            const action = trigger.dataset.action;

            if (action === 'toggle-dark') {
                toggleDarkMode();
            }

            if (action === 'toggle-read-more') {
                const fullDiv = trigger.nextElementSibling;
                if (fullDiv) {
                    fullDiv.classList.toggle('show');
                    trigger.innerHTML = fullDiv.classList.contains('show') ? '📖 اقرأ أقل ↑' : '📖 اقرأ المزيد ↓';
                }
            }
        });
    }

    function initIndexPage() {
        if (page !== 'index') return;

        function getImageUrl(url, fallbackLabel = 'BrewCraft Product') {
            if (!url) {
                return `https://placehold.co/600x450/f4ead7/8b5e3c?text=${encodeURIComponent(fallbackLabel)}`;
            }
            return url;
        }

        const products = [
            { id: 1, name: "ميزان قهوة رقمي دقيق 0.1 جرام مع مؤقت", price: 28, oldPrice: 89, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80", category: "أدوات تحضير", rating: 4.5, material: "بلاستيك ABS + زجاج مقوى", dimensions: "15x12x3 سم", size: "صغير (حجم جيب)", bestSeller: true },
            { id: 2, name: "إبريق ترشيح قهوة زجاجي كيميائي V60", price: 63, oldPrice: 99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", category: "أدوات تحضير", rating: 4.8, material: "زجاج بورسليكات مقاوم للحرارة", dimensions: "قطر 10 سم × ارتفاع 15 سم", size: "سعة 600 مل", bestSeller: true },
            { id: 3, name: "مطحنة قهوة كهربائية 160 واط", price: 42, oldPrice: 120, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80", category: "طحن", rating: 4.9, material: "ستانلس ستيل", dimensions: "10x10x18 سم", size: "سعة 50 جرام", bestSeller: false },
            { id: 4, name: "ملعقة قهوة خشبية يدوية الصنع", price: 19, oldPrice: 35, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80", category: "إكسسوارات", rating: 4.3, material: "خشب الجوز الطبيعي", dimensions: "20x3x1 سم", size: "طول 20 سم", bestSeller: true },
            { id: 5, name: "فلتر ورق للقهوة عضوي - 100 قطعة", price: 35, oldPrice: 45, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80", category: "مستهلكات", rating: 4.6, material: "ورق عضوي غير مبيض", dimensions: "12x12x5 سم", size: "مقاس 02", bestSeller: false },
            { id: 6, name: "ترموس قهوة ستيل مقاوم للصدا 500مل", price: 95, oldPrice: 129, image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=900&q=80", category: "أكواب", rating: 4.7, material: "ستانلس ستيل 304", dimensions: "قطر 7 سم × ارتفاع 22 سم", size: "500 مل", bestSeller: false },
            { id: 7, name: "كوب قهوة سيراميك فاخر", price: 45, oldPrice: 65, image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80", category: "أكواب", rating: 4.4, material: "سيراميك مطفي", dimensions: "قطر 9 سم × ارتفاع 10 سم", size: "300 مل", bestSeller: false },
            { id: 8, name: "ميزان قهوة Ultrean مع شاحن USB", price: 89, oldPrice: 150, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80", category: "أدوات تحضير", rating: 4.8, material: "زجاج مقوى + سيليكون", dimensions: "15x13x2.3 سم", size: "3kg / 0.1g", bestSeller: true },
            { id: 9, name: "جهاز إسبريسو محمول HIBREW H4C", price: 626, oldPrice: 795, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=80", category: "أدوات تحضير", rating: 4.9, material: "بلاستيك + ستيل", dimensions: "7.6x7.6x22.9 سم", size: "بطارية 7500mAh", bestSeller: false },
            { id: 10, name: "كبسولات قهوة متنوعة - 10 حبات", price: 40, oldPrice: 55, image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80", category: "مستهلكات", rating: 4.5, material: "بلاستيك معاد تدويره + قهوة", dimensions: "5x5x10 سم", size: "10 كبسولات", bestSeller: false },
            { id: 11, name: "ساعة تيمر مغناطيسية للقهوة", price: 26, oldPrice: 55, image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=900&q=80", category: "أدوات تحضير", rating: 4.3, material: "بلاستيك ABS + مغناطيس", dimensions: "7x7x2 سم", size: "صغير", bestSeller: false },
            { id: 12, name: "حبوب بن خولان - 250 جرام", price: 48, oldPrice: 65, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80", category: "مستهلكات", rating: 4.8, material: "قهوة عضوية 100%", dimensions: "عبوة 250 جرام", size: "تحميص متوسط", bestSeller: true },
            { id: 13, name: "مخفقة رغوة حليب يدوية", price: 30, oldPrice: 50, image: "https://images.unsplash.com/photo-1572286258217-21541b35d705?auto=format&fit=crop&w=900&q=80", category: "إكسسوارات", rating: 4.2, material: "ستانلس ستيل + بلاستيك", dimensions: "5x5x20 سم", size: "يدوي", bestSeller: false },
            { id: 14, name: "قمع ترشيح قهوة سيراميك", price: 63, oldPrice: 85, image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80", category: "أدوات تحضير", rating: 4.6, material: "سيراميك", dimensions: "قطر 11 سم", size: "مقاس 02", bestSeller: false },
            { id: 15, name: "كوب قياس زجاجي 600مل", price: 28, oldPrice: 40, image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&w=900&q=80", category: "أكواب", rating: 4.4, material: "زجاج بورسليكات", dimensions: "قطر 8 سم × ارتفاع 14 سم", size: "600 مل", bestSeller: false }
        ];

        const processedProducts = products.map((product) => ({
            ...product,
            image: getImageUrl(product.image, product.name)
        }));

        let cart = JSON.parse(localStorage.getItem('brewCart')) || [];
        let currentProducts = [...processedProducts];
        let showingBestSellers = false;

        let userData = JSON.parse(localStorage.getItem('brewUser')) || {
            fullName: "أحمد محمد العتيبي",
            email: "ahmed@example.com",
            phone: "05xxxxxxxx",
            address: "الرياض، حي الملقا، شارع الأمير مقرن",
            joinDate: new Date().toLocaleDateString('ar-SA')
        };

        function saveUser() {
            localStorage.setItem('brewUser', JSON.stringify(userData));
            updateAccountUI();
        }

        function updateAccountUI() {
            const container = $('#accountInfo');
            if (!container) return;

            container.innerHTML = `
                <div style="text-align:center; margin-bottom:20px;">
                    <div style="font-size:60px;">☕</div>
                    <h3>${userData.fullName}</h3>
                </div>
                <div style="background:rgba(0,0,0,0.05); padding:15px; border-radius:20px;">
                    <p><strong>📧 البريد الإلكتروني:</strong> ${userData.email}</p>
                    <p><strong>📱 رقم الجوال:</strong> ${userData.phone}</p>
                    <p><strong>🏠 العنوان:</strong> ${userData.address}</p>
                    <p><strong>📅 تاريخ التسجيل:</strong> ${userData.joinDate}</p>
                    <p><strong>🛍 عدد الطلبات:</strong> ${Math.floor(Math.random() * 20) + 1}</p>
                    <p><strong>⭐ نقاط الولاء:</strong> ${Math.floor(Math.random() * 500)} نقطة</p>
                </div>
            `;
        }

        function editAccount() {
            const newName = prompt("الاسم الكامل:", userData.fullName);
            const newEmail = prompt("البريد الإلكتروني:", userData.email);
            const newPhone = prompt("رقم الجوال:", userData.phone);
            const newAddress = prompt("العنوان:", userData.address);

            if (newName) userData.fullName = newName;
            if (newEmail) userData.email = newEmail;
            if (newPhone) userData.phone = newPhone;
            if (newAddress) userData.address = newAddress;

            saveUser();
            alert("✅ تم تحديث الملف الشخصي بنجاح");
        }

        function saveCart() {
            localStorage.setItem('brewCart', JSON.stringify(cart));
            updateCartUI();
            const cartCount = $('#cart-count');
            if (cartCount) {
                cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
            }
        }

        function showToast() {
            const toast = $('#toast');
            if (!toast) return;
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 1500);
        }

        function addToCart(id, event) {
            if (event) event.stopPropagation();
            const product = currentProducts.find((item) => item.id === id);
            const existing = cart.find((item) => item.id === id);

            if (existing) existing.qty += 1;
            else cart.push({ ...product, qty: 1 });

            saveCart();
            showToast();
        }

        function updateCartUI() {
            const container = $('#cart-items');
            const totalSpan = $('#cart-total');
            if (!container || !totalSpan) return;

            container.innerHTML = '';
            let total = 0;

            cart.forEach((item) => {
                total += item.price * item.qty;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `<span>${item.name} x${item.qty}</span><span>${item.price * item.qty} ريال</span><button type="button" data-remove-id="${item.id}">✖</button>`;
                container.appendChild(div);
            });

            totalSpan.innerText = total;

            const countSpan = $('#cart-count');
            if (countSpan) {
                countSpan.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
            }
        }

        function removeFromCart(id) {
            cart = cart.filter((item) => item.id !== id);
            saveCart();
        }

        function toggleCart() {
            const sidebar = $('#cart-sidebar');
            if (sidebar) sidebar.classList.toggle('open');
        }

        function toggleAccount() {
            const sidebar = $('#account-sidebar');
            if (sidebar) sidebar.classList.toggle('open');
            updateAccountUI();
        }

        function goToCheckout() {
            if (cart.length === 0) {
                alert("أضف منتجات أولاً");
                return;
            }
            window.location.href = "/checkout";
        }

        function filterProducts() {
            const search = ($('#searchInput')?.value || '').toLowerCase();
            const category = $('#categoryFilter')?.value || 'all';

            let filtered = processedProducts.filter((product) => {
                return product.name.toLowerCase().includes(search) && (category === 'all' || product.category === category);
            });

            if (showingBestSellers) filtered = filtered.filter((product) => product.bestSeller);

            const sort = $('#sortFilter')?.value || 'default';
            if (sort === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
            if (sort === 'priceDesc') filtered.sort((a, b) => b.price - a.price);

            currentProducts = filtered;
            renderProducts();
        }

        function showBestSellers() {
            showingBestSellers = true;
            filterProducts();
        }

        function showAllProducts() {
            showingBestSellers = false;
            if ($('#searchInput')) $('#searchInput').value = '';
            if ($('#categoryFilter')) $('#categoryFilter').value = 'all';
            filterProducts();
        }

        function openProductModal(productId) {
            const product = currentProducts.find((item) => item.id === productId);
            const modal = $('#productModal');
            const modalContent = $('#modalContent');
            if (!product || !modal || !modalContent) return;

            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            modalContent.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" style="width:100%; border-radius:20px; margin:15px 0;" onerror="this.src='https://placehold.co/400x300/fef9e6/b45f2b?text=BrewCraft+Product'">
                <p><strong>⭐ التقييم:</strong> ${product.rating} / 5</p>
                <p><strong>💰 السعر:</strong> ${product.price} ريال <span style="text-decoration:line-through; color:gray;">${product.oldPrice} ريال</span> <span style="background:#b45f2b; color:white; padding:2px 8px; border-radius:12px;">-${discount}%</span></p>
                <p><strong>🧱 المادة المصنعة:</strong> ${product.material}</p>
                <p><strong>📏 الأبعاد:</strong> ${product.dimensions}</p>
                <p><strong>📦 الحجم/السعة:</strong> ${product.size}</p>
                <p><strong>📂 الفئة:</strong> ${product.category}</p>
                <button type="button" data-modal-add-id="${product.id}">➕ أضف للسلة</button>
            `;
            modal.style.display = 'flex';
        }

        function closeModal() {
            const modal = $('#productModal');
            if (modal) modal.style.display = 'none';
        }

        function renderProducts() {
            const grid = $('#product-grid');
            if (!grid) return;

            grid.innerHTML = '';
            currentProducts.forEach((product) => {
                const stars = '⭐'.repeat(Math.floor(product.rating)) + (product.rating % 1 ? '½' : '');
                const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    ${product.bestSeller ? '<div class="best-seller-badge">⭐ الأكثر مبيعاً</div>' : ''}
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x300/fef9e6/b45f2b?text=BrewCraft+${encodeURIComponent(product.name)}'">
                    <h3>${product.name}</h3>
                    <div class="rating">${stars} ${product.rating}</div>
                    <div class="price">
                        <span class="old-price">${product.oldPrice} ريال</span>
                        ${product.price} ريال
                        <span style="background:#b45f2b; color:white; padding:2px 6px; border-radius:12px; font-size:12px; margin-right:5px;">-${discount}%</span>
                    </div>
                    <button type="button" data-add-id="${product.id}">➕ أضف للسلة</button>
                `;
                card.addEventListener('click', (event) => {
                    if (event.target.tagName !== 'BUTTON') openProductModal(product.id);
                });
                grid.appendChild(card);
            });
        }

        let timeLeft = 2 * 60 * 60;

        function updateCountdown() {
            const countdownEl = $('#countdown');
            if (!countdownEl) return;

            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;

            countdownEl.innerHTML = `⏳ عرض خاص ينتهي بعد: ${hours}h ${minutes}m ${seconds}s`;
            if (timeLeft > 0) timeLeft -= 1;
        }

        $('#searchInput')?.addEventListener('input', filterProducts);
        $('#categoryFilter')?.addEventListener('change', filterProducts);
        $('#sortFilter')?.addEventListener('change', filterProducts);

        document.addEventListener('click', (event) => {
            const toggleCartTrigger = event.target.closest('[data-action="toggle-cart"]');
            if (toggleCartTrigger) toggleCart();

            const toggleAccountTrigger = event.target.closest('[data-action="toggle-account"]');
            if (toggleAccountTrigger) toggleAccount();

            const bestSellersTrigger = event.target.closest('[data-action="show-best-sellers"]');
            if (bestSellersTrigger) showBestSellers();

            const showAllTrigger = event.target.closest('[data-action="show-all-products"]');
            if (showAllTrigger) showAllProducts();

            const closeModalTrigger = event.target.closest('[data-action="close-modal"]');
            if (closeModalTrigger) closeModal();

            const checkoutTrigger = event.target.closest('[data-action="go-checkout"]');
            if (checkoutTrigger) goToCheckout();

            const editAccountTrigger = event.target.closest('[data-action="edit-account"]');
            if (editAccountTrigger) editAccount();

            const removeBtn = event.target.closest('[data-remove-id]');
            if (removeBtn) removeFromCart(Number(removeBtn.dataset.removeId));

            const addBtn = event.target.closest('[data-add-id]');
            if (addBtn) addToCart(Number(addBtn.dataset.addId), event);

            const modalAddBtn = event.target.closest('[data-modal-add-id]');
            if (modalAddBtn) {
                addToCart(Number(modalAddBtn.dataset.modalAddId), event);
                closeModal();
            }
        });

        window.addEventListener('click', (event) => {
            const modal = $('#productModal');
            if (event.target === modal) closeModal();
        });

        setInterval(updateCountdown, 1000);
        updateCountdown();
        renderProducts();
        updateCartUI();
        updateAccountUI();
    }

    function initCheckoutPage() {
        if (page !== 'checkout') return;

        let cart = JSON.parse(localStorage.getItem('brewCart')) || [];
        let discountPercent = 0;
        let selectedMethod = 'mada';

        const paymentLabels = {
            mada: 'مدى',
            visa: 'فيزا / ماستركارد',
            stcpay: 'stc pay',
            applepay: 'Apple Pay',
            paypal: 'PayPal',
            cod: 'الدفع عند الاستلام'
        };

        const submitLabels = {
            mada: 'ادفع الآن',
            visa: 'ادفع الآن',
            stcpay: 'متابعة إلى stc pay',
            applepay: 'متابعة إلى Apple Pay',
            paypal: 'متابعة إلى PayPal',
            cod: 'تأكيد الطلب'
        };

        function formatCurrency(value) {
            return Number(value).toFixed(2).replace(/\.00$/, '');
        }

        function calculateTotals() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const shipping = subtotal === 0 ? 0 : subtotal > 200 ? 0 : 15;
            const discountValue = subtotal * discountPercent / 100;
            const taxableBase = Math.max(subtotal - discountValue + shipping, 0);
            const vat = taxableBase * 0.15;
            const total = taxableBase + vat;
            return { subtotal, shipping, discountValue, vat, total };
        }

        function displaySummary() {
            const container = $('#summaryItems');
            if (!container) return;

            container.innerHTML = '';

            cart.forEach((item) => {
                const row = document.createElement('div');
                row.className = 'summary-item';
                row.innerHTML = `
                    <div class="summary-item-info">
                        <strong>${item.name}</strong>
                        <small>الكمية: ${item.qty}</small>
                    </div>
                    <div class="summary-item-price">${formatCurrency(item.price * item.qty)} ريال</div>
                `;
                container.appendChild(row);
            });

            const totals = calculateTotals();
            $('#subtotal').innerText = formatCurrency(totals.subtotal);
            $('#discountAmount').innerText = formatCurrency(totals.discountValue);
            $('#shipping').innerText = formatCurrency(totals.shipping);
            $('#vatAmount').innerText = formatCurrency(totals.vat);
            $('#total').innerText = formatCurrency(totals.total);
        }

        function applyCoupon() {
            const code = ($('#couponCode')?.value || '').trim().toUpperCase();
            const couponMsg = $('#couponMsg');
            if (!couponMsg) return;

            if (code === 'BREW10') {
                discountPercent = 10;
                couponMsg.innerHTML = '✅ تم تطبيق خصم 10% على الطلب';
            } else if (code === 'COFFEE20') {
                discountPercent = 20;
                couponMsg.innerHTML = '✅ تم تطبيق خصم 20% على الطلب';
            } else if (code === 'WELCOME15') {
                discountPercent = 15;
                couponMsg.innerHTML = '✅ تم تطبيق خصم 15% على الطلب';
            } else if (!code) {
                discountPercent = 0;
                couponMsg.innerHTML = 'ℹ️ أدخل كود الخصم ثم اضغط تطبيق';
            } else {
                discountPercent = 0;
                couponMsg.innerHTML = '❌ كود الخصم غير صالح';
            }

            displaySummary();
        }

        function renderPaymentPanel() {
            const panel = $('#paymentPanel');
            const currentMethod = $('#paymentCurrentMethod');
            const submitBtn = $('#checkoutSubmitBtn');
            if (!panel) return;

            if (currentMethod) currentMethod.innerText = paymentLabels[selectedMethod] || 'طريقة الدفع';
            if (submitBtn) submitBtn.innerText = submitLabels[selectedMethod] || 'ادفع الآن';

            if (selectedMethod === 'visa' || selectedMethod === 'mada') {
                panel.innerHTML = `
                    <div class="section-heading">
                        <h3>بيانات البطاقة</h3>
                        <p>أدخل بيانات البطاقة لإتمام عملية الدفع بأمان.</p>
                    </div>
                    <div class="payment-panel-grid">
                        <div class="field-group field-span-full">
                            <label for="cardHolder">اسم صاحب البطاقة</label>
                            <input type="text" id="cardHolder" placeholder="أدخل الاسم كما هو على البطاقة">
                        </div>
                        <div class="field-group field-span-full">
                            <label for="cardNumber">رقم البطاقة</label>
                            <input type="text" id="cardNumber" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000">
                        </div>
                        <div class="field-group">
                            <label for="expiryDate">شهر / سنة</label>
                            <input type="text" id="expiryDate" inputmode="numeric" maxlength="5" placeholder="MM/YY">
                        </div>
                        <div class="field-group">
                            <label for="cvv">CVV</label>
                            <input type="password" id="cvv" inputmode="numeric" maxlength="4" placeholder="123">
                        </div>
                    </div>
                `;

                const cardNumber = $('#cardNumber');
                const expiryDate = $('#expiryDate');
                const cvv = $('#cvv');

                cardNumber?.addEventListener('input', (event) => {
                    const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
                    event.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
                });

                expiryDate?.addEventListener('input', (event) => {
                    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
                    event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
                });

                cvv?.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
                });
                return;
            }

            if (selectedMethod === 'applepay') {
                panel.innerHTML = `
                    <div class="payment-note">
                         سيتم تحويلك إلى نافذة <strong>Apple Pay</strong> لإتمام الدفع بشكل سريع وآمن على الأجهزة المدعومة بعد تأكيد الطلب.
                    </div>
                `;
                return;
            }

            if (selectedMethod === 'paypal') {
                panel.innerHTML = `
                    <div class="payment-note">
                        سيتم تحويلك إلى <strong>PayPal</strong> لتسجيل الدخول وإتمام العملية، ثم العودة تلقائياً لتأكيد الطلب.
                    </div>
                `;
                return;
            }

            if (selectedMethod === 'stcpay') {
                panel.innerHTML = `
                    <div class="payment-note">
                        بعد الضغط على متابعة، سيتم تجهيز طلبك وتحويلك إلى <strong>stc pay</strong> لإتمام عملية الدفع من محفظتك الرقمية.
                    </div>
                `;
                return;
            }

            panel.innerHTML = `
                <div class="payment-note">
                    الدفع عند الاستلام متاح داخل السعودية. قد يتم التواصل معك لتأكيد الطلب قبل الشحن، وقد تُطبق رسوم خدمة رمزية حسب المنطقة.
                </div>
            `;
        }

        function validatePaymentDetails() {
            if (selectedMethod !== 'visa' && selectedMethod !== 'mada') return true;

            const holder = ($('#cardHolder')?.value || '').trim();
            const number = ($('#cardNumber')?.value || '').replace(/\s/g, '');
            const expiry = ($('#expiryDate')?.value || '').trim();
            const cvv = ($('#cvv')?.value || '').trim();

            if (!holder || number.length < 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3) {
                alert('❌ الرجاء إدخال بيانات البطاقة بشكل صحيح');
                return false;
            }

            return true;
        }

        function completeOrder() {
            const name = ($('#fullName')?.value || '').trim();
            const email = ($('#email')?.value || '').trim();
            const phone = ($('#phone')?.value || '').trim();
            const address = ($('#address')?.value || '').trim();

            if (!name || !email || !phone || !address) {
                alert('❌ الرجاء إدخال جميع البيانات المطلوبة');
                return;
            }

            if (cart.length === 0) {
                alert('السلة فارغة!');
                return;
            }

            if (!validatePaymentDetails()) return;

            const totals = calculateTotals();
            const notes = $('#notes')?.value || '';

            const order = {
                orderNumber: 'BRW' + Math.floor(Math.random() * 1000000),
                name,
                email,
                phone,
                address,
                notes,
                items: cart,
                subtotal: totals.subtotal,
                discount: totals.discountValue,
                shipping: totals.shipping,
                vat: totals.vat,
                total: totals.total,
                paymentMethod: selectedMethod,
                paymentMethodLabel: paymentLabels[selectedMethod],
                date: new Date().toLocaleString('ar-SA')
            };

            localStorage.setItem('lastOrder', JSON.stringify(order));

            const successMsg = $('#successMsg');
            if (successMsg) {
                successMsg.innerHTML = `
                    🎉 <strong>تم استلام طلبك بنجاح!</strong><br><br>
                    📌 رقم الطلب: ${order.orderNumber}<br>
                    👤 الاسم: ${name}<br>
                    💰 الإجمالي: ${formatCurrency(totals.total)} ريال<br>
                    💳 طريقة الدفع: ${paymentLabels[selectedMethod]}<br>
                    📧 تم إرسال التأكيد إلى: ${email}<br><br>
                    ⏳ سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب.
                `;
                successMsg.style.display = 'block';
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            localStorage.removeItem('brewCart');
            cart = [];
            displaySummary();

            setTimeout(() => {
                window.location.href = '/';
            }, 5000);
        }

        function selectMethod(card) {
            $all('.payment-card-real').forEach((item) => {
                item.classList.remove('selected');
                item.setAttribute('aria-pressed', 'false');
            });
            card.classList.add('selected');
            card.setAttribute('aria-pressed', 'true');
            selectedMethod = card.dataset.method || 'mada';
            renderPaymentPanel();
        }

        $all('.payment-card-real').forEach((card) => {
            card.addEventListener('click', () => selectMethod(card));
        });

        document.addEventListener('click', (event) => {
            const applyCouponTrigger = event.target.closest('[data-action="apply-coupon"]');
            if (applyCouponTrigger) applyCoupon();

            const completeOrderTrigger = event.target.closest('[data-action="complete-order"]');
            if (completeOrderTrigger) completeOrder();
        });

        if (cart.length === 0) {
            const orderSummary = $('#orderSummary');
            if (orderSummary) {
                orderSummary.innerHTML = '<div style="padding: 20px; text-align: center;">🛒 السلة فارغة. الرجاء العودة للمتجر وإضافة منتجات.</div>';
            }
        } else {
            displaySummary();
        }

        const defaultCard = $('.payment-card-real[data-method="mada"]') || $('.payment-card-real');
        if (defaultCard) selectMethod(defaultCard);
    }

    applySavedDarkMode();
    initGlobalActions();
    initIndexPage();
    initCheckoutPage();
})();
