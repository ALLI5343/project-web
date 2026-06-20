document.addEventListener("DOMContentLoaded", () => {
    const mainSearch = document.getElementById("mainSearch");
    const filterButtons = document.querySelectorAll(".btn-filter");
    const tableRows = document.querySelectorAll("#mountainTable tbody tr");
    const toast = document.getElementById("toast");
    const actionButtons = document.querySelectorAll(".btn-action");

    // FUNGSI UTAMA: Kombinasi Realtime Search & Filter Tombol Kategori
    function filterSystem() {
        const searchQuery = mainSearch.value.toLowerCase();
        const activeFilter = document.querySelector(".btn-filter.active").getAttribute("data-filter");

        tableRows.forEach(row => {
            const entireRowText = row.textContent.toLowerCase();
            const rowDifficulty = row.getAttribute("data-difficulty");

            const matchesSearch = entireRowText.includes(searchQuery);
            const matchesFilter = (activeFilter === "all" || rowDifficulty === activeFilter);

            if (matchesSearch && matchesFilter) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    // Event Listener 1: Input Kolom Pencarian
    mainSearch.addEventListener("input", filterSystem);

    // Event Listener 2: Klik Tombol Kategori Filter Kesulitan
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".btn-filter.active").classList.remove("active");
            button.classList.add("active");
            filterSystem();
        });
    });

    // Event Listener 3: Interaksi Klik Baris Tabel / Tombol Kompas (Toast)
    tableRows.forEach(row => {
        row.addEventListener("click", (e) => {
            // Hindari tabrakan fungsi jika yang diklik spesifik tombol aksinya saja
            const mountainName = row.querySelector(".mountain-profile strong").innerText;
            
            toast.innerHTML = `<i class="fa-solid fa-compass"></i> Membuka peta jalur pendakian <strong>${mountainName}</strong>...`;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 2500);
        });
    });
});