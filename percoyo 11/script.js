const fileInput = document.getElementById('file-input');
        const categorySelect = document.getElementById('category-select');
        const addBtn = document.getElementById('add-btn');
        const gallery = document.getElementById('gallery');
        const filterButtons = document.querySelectorAll('.filter-btn');

        const STORAGE_KEY = 'percoyo_genk_photos_v1';

        function createPhotoElement(imageSrc, category, index) {
            const div = document.createElement('div');
            div.className = `gallery-item ${category}`;
            div.id = `foto-${index}`; 
            
            div.innerHTML = `
                <img src="${imageSrc}" alt="Kenangan Baru">
                <button class="delete-btn" title="Hapus Foto ini">&times;</button>
            `;

            const delBtn = div.querySelector('.delete-btn');
            delBtn.addEventListener('click', () => {
                hapusFotoDariStorage(imageSrc, div.id);
            });

            gallery.appendChild(div);
        }

        function loadSavedPhotos() {
            const savedPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            savedPhotos.forEach((photo, index) => {
                createPhotoElement(photo.src, photo.category, index);
            });
        }
        loadSavedPhotos();

        addBtn.addEventListener('click', () => {
            const file = fileInput.files[0];
            const category = categorySelect.value;

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageSrc = e.target.result;
                    const savedPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
                    
                    createPhotoElement(imageSrc, category, savedPhotos.length);

                    savedPhotos.push({ src: imageSrc, category: category });
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPhotos));

                    fileInput.value = '';
                }
                reader.readAsDataURL(file);
            } else {
                alert('Pilih fotonya dulu bos!');
            }
        });

        function hapusFotoDariStorage(srcHapus, elementId) {
            if(!confirm("Yakin mau hapus foto kenangan ini? Nggak bisa balik lagi lho.")) return;

            const element = document.getElementById(elementId);
            if(element) element.remove();

            let savedPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            savedPhotos = savedPhotos.filter(photo => photo.src !== srcHapus);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPhotos));
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                const allItems = document.querySelectorAll('.gallery-item');
                
                allItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });