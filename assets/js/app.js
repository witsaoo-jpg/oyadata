document.addEventListener('DOMContentLoaded', () => {
    
    // 1. เริ่มทำงาน Lucide Icons (แปลง tag <i> เป็น svg)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. ระบบโหลดเนื้อหา Markdown (Markdown Loader)
    const contentDiv = document.getElementById('markdown-content');
    
    if (contentDiv) {
        // หา path ปัจจุบัน เช่น /about/index.html
        const path = window.location.pathname;
        
        // แปลง path html เป็น markdown path
        // หลักการ: เปลี่ยน .html เป็น .md และเพิ่มโฟลเดอร์ /content/ นำหน้า
        // ตัวอย่าง: /about/index.html -> /content/about/index.md
        let mdPath = '/content' + path;
        
        // กรณีเปิดไฟล์ index.html ตรงๆ (เช่น /about/)
        if (mdPath.endsWith('/')) {
            mdPath += 'index.md';
        } 
        // กรณีจบด้วย .html ให้เปลี่ยนเป็น .md
        else if (mdPath.endsWith('.html')) {
            mdPath = mdPath.replace('.html', '.md');
        }

        console.log(`Loading Markdown from: ${mdPath}`); // เอาไว้ดูใน Console เพื่อเช็ค path

        // สั่งดึงไฟล์
        fetch(mdPath)
            .then(response => {
                if (!response.ok) throw new Error(`หาไฟล์ไม่เจอ (${response.status})`);
                return response.text();
            })
            .then(markdown => {
                // ตรวจสอบว่ามี library 'marked' หรือไม่
                if (typeof marked !== 'undefined') {
                    // แปลง Markdown เป็น HTML
                    contentDiv.innerHTML = marked.parse(markdown);
                } else {
                    contentDiv.innerHTML = "<p>Error: Marked.js library not loaded.</p>";
                }
            })
            .catch(error => {
                console.error('Error loading markdown:', error);
                contentDiv.innerHTML = `
                    <div style="text-align:center; padding: 3rem; color: #64748B;">
                        <i data-lucide="file-warning" width="48" height="48" style="margin:0 auto 1rem;"></i>
                        <h2>ไม่พบเนื้อหา</h2>
                        <p>ระบบยังไม่พบไฟล์ต้นฉบับ: <code>${mdPath}</code></p>
                        <br>
                        <a href="/" class="btn btn-outline">กลับหน้าหลัก</a>
                    </div>
                `;
                // สั่ง Render icon อีกรอบสำหรับ Error message
                lucide.createIcons();
            });
    }
});