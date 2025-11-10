// 保留原有的密码验证逻辑（不修改）
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'taocrypt') {
        sessionStorage.setItem('authenticated', 'true');
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        document.getElementById('errorMessage').textContent = '密码错误，请重试';
    }
}

// 新增加密函数（用于URL加密）
function encryptUrl(url) {
    // 步骤1: URI编码（处理特殊字符）
    const uriEncoded = encodeURIComponent(url);
    // 步骤2: Base64加密（隐藏原始URL）
    return btoa(uriEncoded);
}

// 替换原有的build_url函数（核心修改）
function build_url() {
    const urlInput = document.querySelector('#url');
    const url = urlInput.value.trim();
    
    // 保留原有的URL验证逻辑
    if (!url || !url.startsWith('http')) {
        document.getElementById('result').innerHTML = '<span class="error">请输入有效的URL（需包含http/https）</span>';
        return;
    }

    // 新增加密处理
    const encrypted = encryptUrl(url);
    
    // 生成最终链接（兼容原仓库的路径结构）
    const baseUrl = window.location.origin + window.location.pathname + 'api/';
    const finalUrl = baseUrl + '?code=' + encrypted;
    
    // 保留原有的结果展示逻辑
    document.getElementById('result').innerHTML = `
        <p>生成成功！可直接复制链接或点击访问：</p>
        <div class="link-container">
            <a href="${finalUrl}" target="_blank" class="generated-link">${finalUrl}</a>
        </div>
        <button onclick="copyToClipboard('${finalUrl}')" class="copy-btn">复制链接</button>
    `;
}

// 保留原有的复制功能
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('链接已复制到剪贴板！');
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 保留原有的页面初始化逻辑
window.onload = function() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        document.getElementById('passwordModal').style.display = 'flex';
    }
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
};
